import React from 'react';
import tw, { styled } from 'twin.macro';

// This component uses the `tw` template literal to retrieve the css code for the 
// corresponding TailwindCSS class. For more info, please check https://tailwindcss.com/docs/
const s = {
  shimmering: tw`bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 bg-[length:200%_100%] animate-shimmer`,
  roundness: {
    normal: tw`rounded`,
    full: tw`rounded-full`,
  },
  width: {
    shortest: tw`w-6`,
    short: tw`w-16`,
    medium: tw`w-24`,
    long: tw`w-64`,
  },
  height: {
    medium: tw`h-6`,
    tall: tw`h-24`,
  },
  margin: {
    none: '',
    short: tw`mr-2`
  }
};

// Props type for Skeleton
type SkeletonProps = {
  $roundness?: keyof typeof s.roundness;
  $height?: keyof typeof s.height;
  $width?: keyof typeof s.width;
  $margin?: keyof typeof s.margin;
};

// Styled-component using transient props
const SkeletonContainer = styled.div<SkeletonProps>`
  ${s.shimmering};
  ${({ $roundness = 'normal' }) => s.roundness[$roundness]};
  ${({ $height = 'medium' }) => s.height[$height]};
  ${({ $width = 'medium' }) => s.width[$width]};
  ${({ $margin = 'none' }) => s.margin[$margin]};
`;

// Skeleton component
const Skeleton: React.FC<Omit<SkeletonProps, '$'>> = ({
  $roundness = 'normal',
  $height = 'medium',
  $width = 'medium',
  $margin = 'none'
}) => <SkeletonContainer $roundness={$roundness} $height={$height} $width={$width} $margin={$margin} />;

export default Skeleton;
