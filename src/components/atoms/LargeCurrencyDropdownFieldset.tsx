import React from 'react'
import tw from 'twin.macro'

import { Fieldset } from '.'
import { ExchangeRate } from '../../hooks/useExchangeRates'
import getFlagEmoji from '../../utils/getFlagEmoji'

const StyledSelect = tw.select`text-2xl font-bold bg-white focus:outline-none w-full`;

interface LargeCurrencyDropdownFieldsetProps {
  label: string;
  exchangeRates: ExchangeRate[] | null;
  currency: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

// This component shows EUR+GBP+USD on the top of the select since these
// are the options the user use the most (assume we learned this from User Testing)
const LargeCurrencyDropdownFieldset: React.FC<LargeCurrencyDropdownFieldsetProps> = ({
  label,
  exchangeRates,
  currency,
  onChange,
}) => (
  <Fieldset label={label}>
    <StyledSelect id={label} value={currency} onChange={onChange}>
      <option value="EUR" key="EUR">
        {getFlagEmoji('EUR')} EUR - Euro
      </option>
      <option value="GBP" key="GBP">
        {getFlagEmoji('GBP')} GBP - British Pound
      </option>
      <option value="USD" key="USD">
        {getFlagEmoji('USD')} USD - US Dollar
      </option>

      {exchangeRates &&
        exchangeRates
          .filter(rate => !['EUR', 'GBP', 'USD'].includes(rate.code))
          .map(c => (
            <option value={c.code} key={c.code}>
              {getFlagEmoji(c.code)} {c.code} - {c.country} {c.currency}
            </option>
          ))}
    </StyledSelect>
  </Fieldset>
)

export default LargeCurrencyDropdownFieldset
