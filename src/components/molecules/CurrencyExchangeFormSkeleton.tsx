import React from 'react'
import tw from 'twin.macro'

const s = {
  shimmering: tw`bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 bg-[length:200%_100%] animate-shimmer`,
}

const SkeletonPlaceholder = () => (
  <div css={tw`w-full bg-white rounded-md p-4 shadow-2xl flex flex-col`}>
    <div css={[tw`h-24 w-full mb-4`, s.shimmering]}></div>
    <div css={[tw`h-24 w-full mb-4`, s.shimmering]}></div>
    <div css={[tw`h-24 w-full mb-4`, s.shimmering]}></div>
  </div>
)

export default SkeletonPlaceholder
