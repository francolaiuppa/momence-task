import { useEffect, useState } from 'react';

const clearLocalStorage = () => {
  localStorage.removeItem('cnb_data');
  localStorage.removeItem('cnb_expiration');
  localStorage.removeItem('cnb_lastUpdated');
};

export interface ExchangeRate {
  country: string;
  currency: string;
  amount: number;
  code: string;
  rate: number;
  ratePer100CZK: number;
}

const useExchangeRates = () => {
  const [exchangeRates, setExchangeRates] = useState<ExchangeRate[] | null>(null);
  const [nextExpiration, setNextExpiration] = useState<Date | null>(null); // Use Date instead of string
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchExchangeRates = async () => {
    setLoading(true);
    setError(null);

    const cachedExpiration = localStorage.getItem('cnb_expiration');
    const now = new Date();

    if (cachedExpiration && now > new Date(Number(cachedExpiration))) {
      // console.log('The cache is expired, clearing and fetching new data!');
      clearLocalStorage();
    }

    const cachedData = localStorage.getItem('cnb_data');
    const cachedLastUpdated = localStorage.getItem('cnb_lastUpdated');

    if (cachedData) {
      setExchangeRates(JSON.parse(cachedData));
      setNextExpiration(cachedExpiration ? new Date(Number(cachedExpiration)) : null);
      setLastUpdated(cachedLastUpdated);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/.netlify/functions/proxy');
      if (!response.ok) {
        throw new Error('Response was not OK');
      }
      const { rates, nextExpiration, lastUpdated } = await response.json();

      const expirationTime = new Date(nextExpiration).getTime();
      localStorage.setItem('cnb_data', JSON.stringify(rates));
      localStorage.setItem('cnb_expiration', expirationTime.toString());
      localStorage.setItem('cnb_lastUpdated', lastUpdated.toString());

      setExchangeRates(rates);
      setNextExpiration(new Date(expirationTime)); 
      setLastUpdated(lastUpdated);
    } catch (err) {
      // console.error(err);
      setError('Unable to fetch exchange rates. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExchangeRates();
  }, []);

  return {
    exchangeRates,
    nextExpiration,
    lastUpdated,
    loading,
    error,
    refetch: fetchExchangeRates,
  };
};

export default useExchangeRates;
