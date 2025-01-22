import React, { PropsWithChildren, ReactNode, useEffect, useState } from 'react';
import tw from 'twin.macro'

import { ExchangeRate } from '../../hooks/useExchangeRates';
import getFlagEmoji from '../../utils/getFlagEmoji';
import { FloatingContainer } from '../atoms';

const styles = {
  largeInputField: [
    tw`border-2 border-gray-200 flex flex-col p-4 rounded-md`,
    `&:focus-within { border-color: #6366f1; border-width: 2px; }`, // this allows the whole input element to show focus state
    tw`transition-all duration-300 ease-in-out`,  // animate when changing states
    tw`mb-4`,
  ],
  largeInputFieldInput: [
    tw`text-2xl font-bold bg-white focus:outline-none w-full`,
  ],
}

interface LargeInputFieldProps {
  label: string;
  children: ReactNode
  // No need to define children here
}

interface LargeInputFieldProps {
  label: string;
}

const LargeInputField = ({ label, children }: PropsWithChildren<LargeInputFieldProps>) => (
  <div css={styles.largeInputField} className="group">
    <label htmlFor={label} tw="text-lg text-gray-600 mb-0 pb-0 leading-none">{label}</label>
    <div tw="flex flex-row text-2xl font-bold">
      {children}
    </div>
  </div>
);

interface CurrencyExchangeFormProps {
  exchangeRates: ExchangeRate[] | null
}

const CurrencyExchangeForm: React.FC<CurrencyExchangeFormProps> = ({ exchangeRates }) => {
  const [amount, setAmount] = useState<number>(100); // Default to 100
  const [currency, setCurrency] = useState<string>('EUR'); // Default to EUR
  const [total, setTotal] = useState<string>('Waiting...'); // Placeholder for the total

  // Function to handle the calculation
  const calculateTotal = () => {
    if (!exchangeRates) {
      setTotal('Invalid rate');
      return;
    }
    const rate = exchangeRates.find((rate) => rate.code === currency)?.rate;
    if (rate) {
      const convertedAmount = (amount / rate).toFixed(2);
      setTotal(`${convertedAmount} ${currency}`);
    } else {
      setTotal('Invalid rate');
    }
  };

   // Recalculate on component mount and when relevant state changes
   useEffect(() => {
    calculateTotal();
  }, [exchangeRates, amount, currency]);

  return (
    <FloatingContainer>
      <LargeInputField label="Amount">
        <span tw="mr-1">{getFlagEmoji('CZK')} </span>
        <span tw="mr-1">CZK </span>
        <input id="Amount" type="number" min={0} step="1" css={styles.largeInputFieldInput} value={amount} onChange={(e) => {
          setAmount(Number(e.target.value));
          calculateTotal();
        }} />
      </LargeInputField>
      <LargeInputField label="To">
        <select css={styles.largeInputFieldInput} id="To" value={currency} onChange={(e) => {
            setCurrency(e.target.value);
            calculateTotal();
          }}>
          <option value="EUR" key="EUR">{getFlagEmoji('EUR')} EUR - Euro</option>
          <option value="GBP" key="GBP">{getFlagEmoji('GBP')} GBP - British Pound</option>
          <option value="USD" key="USD">{getFlagEmoji('USD')} USD - US Dollar</option>

          {exchangeRates && exchangeRates.filter((rate) => !['EUR', 'GBP', 'USD'].includes(rate.code)).map((c) => (
            <option value={c.code} key={c.code}>{getFlagEmoji(c.code)} {c.code} - {c.country} {c.currency}</option>
          ))}
        </select>
      </LargeInputField>
      <LargeInputField label="Total">
        <span tw="mr-1">{getFlagEmoji(currency)}</span>
        <input id="Total" type="text" css={styles.largeInputFieldInput} value={total} disabled />
      </LargeInputField>
    </FloatingContainer>
  )
}
export default CurrencyExchangeForm;