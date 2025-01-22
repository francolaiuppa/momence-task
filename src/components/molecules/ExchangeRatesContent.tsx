import React from 'react'
import { Heading, Button, FloatingContainer } from '../atoms'
import {
  CurrencyChart,
  CurrencyExchangeForm,
  CurrentChartSkeleton,
  CurrencyExchangeFormSkeleton,
} from './'
import { ExchangeRate } from '../../hooks/useExchangeRates'

const ExchangeRatesContent = ({
  error,
  refetch,
  loading,
  exchangeRates,
  lastUpdated,
}: {
  error: string | null
  refetch: () => void
  loading: boolean
  exchangeRates: ExchangeRate[] | null
  lastUpdated: string | null
}) => {
  if (error) {
    return (
      <FloatingContainer>
        <Heading type="h1" dark={true}>An error occurred</Heading>
        <Heading type="h2" dark={true}>
          We couldn't retrieve the latest rates. <br/><br/> This should be temporary. Please try again using the button below.
        </Heading>
        <Button onClick={refetch}>Try again</Button>
      </FloatingContainer>
    )
  }

  return (
    <>
      <Heading type="h3">Daily exchange rates</Heading>
      {loading && <CurrentChartSkeleton />}
      {!loading && (
        <CurrencyChart
          exchangeRates={exchangeRates}
          lastUpdated={lastUpdated}
        />
      )}

      <Heading type="h3">Currency converter</Heading>
      {loading && <CurrencyExchangeFormSkeleton />}
      {!loading && <CurrencyExchangeForm exchangeRates={exchangeRates} />}
    </>
  )
}

export default ExchangeRatesContent
