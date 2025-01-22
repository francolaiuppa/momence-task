import React from 'react';
import tw from 'twin.macro'
import { ExchangeRate } from '../../hooks/useExchangeRates'
import getFlagEmoji from '../../utils/getFlagEmoji';

interface CurrencyChartProps {
  exchangeRates: ExchangeRate[] | null;
  lastUpdated: string | null;
}

const CurrencyChart: React.FC<CurrencyChartProps> = ({ exchangeRates, lastUpdated }) => {
  if (!exchangeRates || !lastUpdated) {
    return null;
  }
  return (
    <>
      <div tw="w-full mx-auto bg-white rounded-lg shadow-md mb-4 overflow-hidden">
        <div tw="max-h-60 overflow-y-auto">
          <table tw="w-full text-left table-auto">
            <thead>
              <tr tw="border-b-2 border-gray-200">
                <th tw="text-lg font-semibold py-4 text-gray-600 px-6">Currency</th>
                <th tw="text-lg font-semibold py-4 text-right px-6 whitespace-nowrap">100 CZK equals</th>
              </tr>
            </thead>
            <tbody tw="font-medium text-gray-800 mt-4">
              {exchangeRates?.map((rate, index) => (
                <tr key={rate.code} css={`${index % 2 === 1 && tw`bg-gray-100`}`}>
                  <td tw="py-2 pl-6 text-clip">
                    <span tw="text-lg">{getFlagEmoji(rate.code)}</span> {rate.code} - {rate.country} {rate.currency}
                  </td>
                  <td tw="py-2 pr-6 text-right font-medium text-indigo-950">
                    {rate.ratePer100CZK.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <span tw="text-base text-center text-indigo-100 mb-8 opacity-80 flex flex-row items-center justify-center">
        <span tw="text-2xl mr-2">🕒</span><span tw="italic"> Last updated on {new Date(lastUpdated || '').toLocaleString()} </span>
      </span>
    </>
  )
};



export default CurrencyChart;
