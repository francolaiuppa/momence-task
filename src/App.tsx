import React from 'react'

import { Heading } from './components/atoms'
import { Page, ExchangeRatesContent } from './components/molecules'
import { exchangeRates } from './mockDataDeleteMe'

const App = () => {
  const error = null;
  const refetch = () => {};
  const loading = false;
  const lastUpdated = new Date().toISOString(); 
  return (
    <Page>
      <Heading type="h1">CNB Currency Converter</Heading>
      <Heading type="h2">
        Check the latest daily exchange rates from the Czech National Bank or
        use our calculator to easily convert amounts in real-time.
      </Heading>

      <ExchangeRatesContent
        error={error}
        refetch={refetch}
        loading={loading}
        exchangeRates={exchangeRates}
        lastUpdated={lastUpdated}
      />
    </Page>
  )
}

export default App
