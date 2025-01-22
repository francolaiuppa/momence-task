import React from 'react'
import tw from 'twin.macro'
import Skeleton from '../atoms/Skeleton'

const PulsingAnimation = tw.div`w-full min-h-40 animate-pulse`;
const Container = tw.div`w-full mx-auto bg-white rounded-lg shadow-md mb-4 overflow-hidden`;
const HeightLimiter = tw.div`max-h-60 overflow-y-auto`;
const Table = tw.table`w-full text-left table-auto`;
const HeadingTableRow = tw.tr`border-b-2 border-gray-200`;
const HeadingTableLeftHeading = tw.th`text-lg font-semibold py-4 text-gray-300 px-6`;
const HeadingTableRightHeading = tw.th`text-lg font-semibold py-4 text-gray-300 text-right px-6 whitespace-nowrap`;
const TableBody = tw.tbody`font-medium text-gray-800 mt-4`;
const TableCellLeft = tw.td`py-2 pl-6 text-clip flex flex-row items-center`;
const TableCellRight = tw.td`py-2 pr-6`;
const LastUpdatedAtContainer = tw.span`py-2 pl-6 text-clip flex flex-row items-center`;

const SkeletonPlaceholder = () => (
  <PulsingAnimation>
    <Container>
      <HeightLimiter>
        <Table>
          <thead>
            <HeadingTableRow>
              <HeadingTableLeftHeading>
                Currency
              </HeadingTableLeftHeading>
              <HeadingTableRightHeading>
                100 CZK equals
              </HeadingTableRightHeading>
            </HeadingTableRow>
          </thead>
          <TableBody>
            {Array(5)
              .fill(null)
              .map((_, index) => (
                <tr key={`fake${index}`}>
                  <TableCellLeft>
                    <Skeleton
                      $roundness="full"
                      $width="shortest"
                      $margin="short"
                    />
                    <Skeleton
                      $height="medium"
                    />
                  </TableCellLeft>
                  <TableCellRight>
                    <div css={tw`flex justify-end`}>
                      <Skeleton
                        $width="short"
                      />
                    </div>
                  </TableCellRight>
                </tr>
              ))}
          </TableBody>
        </Table>
      </HeightLimiter>
    </Container>
    <LastUpdatedAtContainer>
      <Skeleton $width="long" />
    </LastUpdatedAtContainer>
  </PulsingAnimation>
)

export default SkeletonPlaceholder
