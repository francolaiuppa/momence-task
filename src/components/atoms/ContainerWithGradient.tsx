import React, { PropsWithChildren } from 'react';
import tw, { styled } from 'twin.macro';

const StyledContainerWithGradient = styled.div`
  ${tw`flex flex-col items-center`};
  background: radial-gradient(circle at 50% 100%, white 60%, transparent 60.1%),
              linear-gradient(to right, #1e3a8a, #1e2a47);
  background-size: 100% 45%, 100% 100%;
  background-position: bottom, top;
  background-repeat: no-repeat, no-repeat;
  min-height: 100vh;

  // Disable the radial gradient on large viewports
  @media (min-width: 1024px) {
    background: linear-gradient(to right, #1e3a8a, #1e2a47);
    ${tw`pb-24`}
  }
`;

const ContainerWithGradient = ({ children }: PropsWithChildren<{}>) => (
  <StyledContainerWithGradient>{children}</StyledContainerWithGradient>
);

export default ContainerWithGradient;
