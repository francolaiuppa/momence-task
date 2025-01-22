import React, { PropsWithChildren } from 'react';
import tw from 'twin.macro';

const StyledFloatingContainer = tw.div`w-full bg-white rounded-md p-4 shadow-2xl`;

const FloatingContainer = ({ children }: PropsWithChildren<{}>) => (
  <StyledFloatingContainer>{children}</StyledFloatingContainer>
);

export default FloatingContainer;