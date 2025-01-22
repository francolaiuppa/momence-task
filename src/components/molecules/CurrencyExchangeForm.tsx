import React, { PropsWithChildren, ReactNode, useEffect, useState } from 'react'

import { ExchangeRate } from '../../hooks/useExchangeRates'
import {
  FloatingContainer,
  LargeCurrencyDropdownFieldset,
  LargeNumericInputFieldset,
  LargeDisplayOnlyFieldset
} from '../atoms'

interface CurrencyExchangeFormProps {
  exchangeRates: ExchangeRate[] | null
}

const CurrencyExchangeForm: React.FC<CurrencyExchangeFormProps> = ({
  exchangeRates,
}) => {
  const [amount, setAmount] = useState<number>(100) // Default to 100
  const [currency, setCurrency] = useState<string>('EUR') // Default to EUR
  const [total, setTotal] = useState<string>('Waiting...') // Placeholder for the total

  const calculateTotal = () => {
    if (!exchangeRates) {
      setTotal('Invalid rate')
      return
    }
    const rate = exchangeRates.find(rate => rate.code === currency)?.rate
    if (rate) {
      const convertedAmount = (amount / rate).toFixed(2)
      setTotal(`${convertedAmount} ${currency}`)
    } else {
      setTotal('Invalid rate')
    }
  }

  // Recalculate on component mount and when relevant state changes
  useEffect(() => {
    calculateTotal()
  }, [exchangeRates, amount, currency])

  return (
    <FloatingContainer>
      <LargeNumericInputFieldset
        label="Amount"
        currency="CZK"
        amount={amount}
        onChange={e => {
          setAmount(Number(e.target.value))
          calculateTotal()
        }}
      />

      <LargeCurrencyDropdownFieldset
        label="To"
        currency={currency}
        exchangeRates={exchangeRates}
        onChange={e => {
          setCurrency(e.target.value)
          calculateTotal()
        }}
      />

      <LargeDisplayOnlyFieldset label="Total" value={total} currency={currency} />
    </FloatingContainer>
  )
}
export default CurrencyExchangeForm
