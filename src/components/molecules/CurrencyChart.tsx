import React from 'react';
import tw from 'twin.macro'
import { ExchangeRate } from '../../hooks/useExchangeRates'
import getFlagEmoji from '../../utils/getFlagEmoji';

const MainContainer = tw.div`w-full mx-auto bg-white rounded-lg shadow-md mb-4 overflow-hidden`;
const HeightLimiter = tw.div`max-h-60 overflow-y-auto`;
const Table = tw.table`w-full text-left table-auto`;
const HeadTableRow = tw.tr`border-b-2 border-gray-200`;
const HeadTableRowHeadingLeft = tw.th`text-lg font-semibold py-4 text-gray-600 px-6`;
const HeadTableRowHeadingRight = tw.th`text-lg font-semibold py-4 text-right px-6 whitespace-nowrap`;
const TableBody = tw.tbody`font-medium text-gray-800 mt-4`;
const TableBodyCellLeft = tw.td`py-2 pl-6 text-clip`;
const TableBodyCellRight = tw.td`py-2 pr-6 text-right font-medium text-indigo-950`;
const SpanLarge = tw.span`text-lg`;
const LastUpdatedContainer = tw.div`text-base text-center text-indigo-100 mb-8 opacity-80 flex flex-row items-center justify-center`;
const LastUpdatedEmoji = tw.span`text-2xl mr-2`;
const SpanItalic = tw.span`italic`;

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
      <MainContainer>
        <HeightLimiter>
          <Table>
            <thead>
              <HeadTableRow>
                <HeadTableRowHeadingLeft>Currency</HeadTableRowHeadingLeft>
                <HeadTableRowHeadingRight>100 CZK equals</HeadTableRowHeadingRight>
              </HeadTableRow>
            </thead>
            <TableBody>
              {exchangeRates?.map((rate, index) => (
                <tr key={rate.code} css={`${index % 2 === 1 && tw`bg-gray-100`}`}>
                  <TableBodyCellLeft>
                    <SpanLarge>{getFlagEmoji(rate.code)}</SpanLarge> {rate.code} - {rate.country} {rate.currency}
                  </TableBodyCellLeft>
                  <TableBodyCellRight>
                    {rate.ratePer100CZK.toFixed(2)}
                  </TableBodyCellRight>
                </tr>
              ))}
            </TableBody>
          </Table>
        </HeightLimiter>
      </MainContainer>
      <LastUpdatedContainer>
        <LastUpdatedEmoji>🕒</LastUpdatedEmoji><SpanItalic> Last updated on {new Date(lastUpdated || '').toLocaleString()} </SpanItalic>
      </LastUpdatedContainer>
    </>
  )
};



export default CurrencyChart;
