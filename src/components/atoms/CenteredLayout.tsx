import React, { PropsWithChildren } from 'react';
import tw from 'twin.macro';

const CenteredLayoutContainer = tw.div`flex flex-col justify-center p-6 w-full lg:w-2/5`;

const CenteredLayout = ({ children }: PropsWithChildren<{}>) => (
  <CenteredLayoutContainer>{children}</CenteredLayoutContainer>
);

export default CenteredLayout;