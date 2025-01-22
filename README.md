# Momence Currency Calculator Challenge

## Overview

This is my submission for Momence's Full-Stack Developer position.
The application allows users to view the latest exchange rates for
common currencies and convert amounts from CZK to any of the supported
currencies.

This app is deployed at https://momence-task.netlify.app/

## Architecture Decisions

- **TailwindCSS**: Selected for rapid styling and a utility-first design approach, enabling consistent and maintainable styles.
- **React Query**: Deliberately omitted to avoid unnecessary overhead for a single API call. I’m happy to elaborate further on this decision if needed.
- **Styled Components**: Combined with TailwindCSS via `twin.macro` for effortless theming and modular styling.
- **Performance Focus**: Achieved a 100 Lighthouse performance score with a load time of just 1.2 seconds.
- **vitest**: Chosen as a modern, fast test runner compatible with Jest syntax, ensuring a smooth testing workflow.
- **Netlify Serverless**: Implements core Back-End solutions with minimal code, emphasizing simplicity and maintainability.

## Design Decisions

- Inspired by the XE Currency app for clean, user-friendly design.
- Fully responsive for mobile and desktop.
- Minimalist design using only CSS gradients, SVGs and emojis for a lightweight experience.

## How to Run Locally

#### Clone the repository:

```bash
git clone https://github.com/francolaiuppa/momence-task.git
```

#### Install the Front-End dependencies

```bash
npm i
```

#### Create a new `.env` file with contents

```bash
UPSTASH_REDIS_URL=rediss://replace:this@with.your.own:6379
UPSTREAM_API=https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt
```

You can register a free account at upstash.com or run your own Redis.

#### Install Netlify CLI

```bash
npm install netlify-cli -g
```

#### Install Back-End dependencies

```bash
cd netlify/functions && npm i
```

#### Run the project

From the root of the project, run:

```bash
netlify dev
```

This will run both the Netlify Serverless environment locally and the `vite` managed React app.

## Tests

You can run tests using

```bash
npm run test
```

Or if you want to use Vitest's UI:

```bash
npm run test:ui
```

## Feature Showcase

### **Backend**

- **Respectful Caching**: Prevents spamming upstream API and aligns with data update policies.
- Uses `Cache-Control` headers for optimized frontend responses.
- Fails early if environment variables are missing to aid debugging.
- **Single Dependency**: Uses Redis for efficient caching.
- Fixes CORS limitations for upstream API and restricts usage to the current domain.

### **Frontend**

#### Skeleton loaders with custom shimmering animation

  ![Skeleton Loaders](extras/loading-skeletons.gif)

Note: You can uncomment the line in `proxy.ts` to induce a delay so you can see the skeleton loaders.

#### Lighthouse performance score of 98+ with 1.2s load time

  ![Lighthouse Score](extras/lighthouse.png)

#### Fully responsive design

##### Desktop

  ![Desktop version](extras/desktop.png)

##### Mobile

  ![Mobile version](extras/mobile.png)

Also:

- Triple-layer caching system for speed and efficiency.
- Test coverage using `vitest` for robust frontend testing.

## Conclusion

Thank you for taking the time to review this project. I hope it showcases my skills, attention to detail, and commitment to delivering high-quality work. If you have any questions or feedback, feel free to reach out to me.

Looking forward to the opportunity to collaborate!

Best regards,
Fran