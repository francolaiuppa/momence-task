import React, { ReactNode } from 'react';
import tw, { styled } from 'twin.macro';

const H1Container = styled.h1<{ $dark?: boolean }>`
  ${tw`text-3xl font-bold text-center mb-4`}
  ${({ $dark }) => ($dark ? tw`text-indigo-950` : tw`text-indigo-50`)}
`;

const H2Container = styled.h2<{ $dark?: boolean }>`
  ${tw`text-lg text-center mb-10`}
  ${({ $dark }) => ($dark ? tw`text-indigo-950` : tw`text-indigo-50`)}
`;

const H3Container = styled.h3<{ $dark?: boolean }>`
  ${tw`text-2xl font-bold text-center mb-4`}
  ${({ $dark }) => ($dark ? tw`text-indigo-950` : tw`text-indigo-50`)}
`;

interface HeadingProps {
  type: "h1" | "h2" | "h3";
  children: ReactNode;
  dark?: boolean;
}

const Heading: React.FC<HeadingProps> = ({ type, dark = false, children }) => {
  if (type === "h1") {
    return <H1Container $dark={dark}>{children}</H1Container>;
  } else if (type === "h2") {
    return <H2Container $dark={dark}>{children}</H2Container>;
  } else {
    return <H3Container $dark={dark}>{children}</H3Container>;
  }
};

export default Heading;
