import React, { PropsWithChildren } from 'react';
import tw from 'twin.macro';

const ButtonContainer = tw.button`px-6 py-5 rounded-md w-full text-lg font-bold bg-orange-400 text-orange-950 hover:bg-orange-600 active:bg-orange-700`;

const Button = ({ children, onClick }: PropsWithChildren<{ 
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}>) => (
  <ButtonContainer onClick={onClick}>{children}</ButtonContainer>
);

export default Button;