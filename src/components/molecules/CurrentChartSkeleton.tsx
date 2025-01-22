import React from 'react'
import tw from 'twin.macro'
import Skeleton from '../atoms/Skeleton'

const SkeletonPlaceholder = () => (
  <div tw="w-full min-h-40 animate-pulse">
    <div tw="w-full mx-auto bg-white rounded-lg shadow-md mb-4 overflow-hidden">
      <div tw="max-h-60 overflow-y-auto">
        <table tw="w-full text-left table-auto">
          <thead>
            <tr tw="border-b-2 border-gray-200">
              <th tw="text-lg font-semibold py-4 text-gray-300 px-6">
                Currency
              </th>
              <th tw="text-lg font-semibold py-4 text-gray-300 text-right px-6 whitespace-nowrap">
                100 CZK equals
              </th>
            </tr>
          </thead>
          <tbody tw="font-medium text-gray-800 mt-4">
            {Array(5)
              .fill(null)
              .map((_, index) => (
                <tr key={`fake${index}`}>
                  <td tw="py-2 pl-6 text-clip flex flex-row items-center">
                    <Skeleton
                      $roundness="full"
                      $width="shortest"
                      $margin="short"
                    />
                    <Skeleton
                      $height="medium"
                    />
                  </td>
                  <td tw="py-2 pr-6">
                    <div css={tw`flex justify-end`}>
                      <Skeleton
                        $width="short"
                      />
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
    <span tw="text-base text-center text-indigo-100 mb-8 opacity-80 flex flex-row items-center justify-center">
      <Skeleton $width="long" />
    </span>
  </div>
)

export default SkeletonPlaceholder
