import React from 'react'

import { Heading } from './components/atoms'
import { Page, ExchangeRatesContent } from './components/molecules'
import useExchangeRates from './hooks/useExchangeRates'

const App = () => {
  const { exchangeRates, lastUpdated, loading, error, refetch } =
    useExchangeRates()
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
