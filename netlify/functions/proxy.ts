import Redis from 'ioredis';

if (!process.env.UPSTASH_REDIS_URL) {
  throw new Error('Missing required UPSTASH_REDIS_URL env var. Aborting.');
}

const redis = new Redis(process.env.UPSTASH_REDIS_URL);
const CACHE_KEY = 'cnb_exchange_rates';

/**
 * Calculate the next expiration time: next working day at 17:00.
 */
const getNextExpirationTime = (): { expirationDate: Date; secondsUntilExpiration: number } => {
  const now = new Date();
  let nextDay = new Date(now);

  if (now.getDay() === 5) {
    nextDay.setDate(now.getDate() + 3); // Friday -> Monday
  } else if (now.getDay() === 6) {
    nextDay.setDate(now.getDate() + 2); // Saturday -> Monday
  } else if (now.getDay() === 0) {
    nextDay.setDate(now.getDate() + 1); // Sunday -> Monday
  } else {
    nextDay.setDate(now.getDate() + 1); // Normal next day
  }

  nextDay.setHours(17, 0, 0, 0);
  return { expirationDate: nextDay, secondsUntilExpiration: Math.ceil((nextDay.getTime() - now.getTime()) / 1000) };
};

const parseCNBResponse = (rawData: string) => {
  const lines = rawData.trim().split('\n');
  const data = lines.slice(2).map((line) => {
    const [country, currency, amount, code, rate] = line.split('|');
    const ratePer100CZK = (100 / (parseFloat(rate) / parseInt(amount, 10))).toFixed(2);
    return {
      country,
      currency,
      amount: parseInt(amount, 10),
      code,
      rate: parseFloat(rate),
      ratePer100CZK: parseFloat(ratePer100CZK),
    };
  });
  return data;
};

export const handler = async () => {
  if (!process.env.UPSTREAM_API) {
    throw new Error('Missing required UPSTREAM_API env var. Aborting.');
  }
  const { expirationDate, secondsUntilExpiration } = getNextExpirationTime();

  // uncomment if you want to test the loading skeleton placeholder
  // await new Promise((resolve) => setTimeout(resolve, 2000)); // Delay for 2 seconds

  try {
    const cachedData = await redis.get(CACHE_KEY);
    const lastUpdated = await redis.get(`${CACHE_KEY}_timestamp`);
    
    if (cachedData && lastUpdated) {
      const lastUpdatedDate = new Date(lastUpdated);
      if (new Date() < expirationDate && new Date() > lastUpdatedDate) {
        return {
          statusCode: 200,
          headers: { 'Cache-Control': `public, max-age=${secondsUntilExpiration}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            rates: JSON.parse(cachedData),
            nextExpiration: expirationDate.toISOString(),
            lastUpdated,
          }),
        };
      }
    }

    // Fetch from CNB API
    const response = await fetch(process.env.UPSTREAM_API);
    if (!response.ok) throw new Error('Failed to fetch data from CNB');
    const rawData = await response.text();

    // Parse and prepare data
    const rates = parseCNBResponse(rawData);

    // Cache data in Redis
    const currentTimestamp = new Date().toISOString();
    await redis.set(CACHE_KEY, JSON.stringify(rates), 'EX', secondsUntilExpiration);
    await redis.set(`${CACHE_KEY}_timestamp`, currentTimestamp, 'EX', secondsUntilExpiration);

    return {
      statusCode: 200,
      // Setting a Cache-Control to avoid Front-End from hitting the serverless needlessly
      headers: { 'Cache-Control': `public, max-age=${secondsUntilExpiration}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        rates,
        nextExpiration: expirationDate.toISOString(),
        lastUpdated: currentTimestamp,
      }),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch exchange rates' }),
    };
  }
};