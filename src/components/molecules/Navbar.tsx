import React from 'react';
import tw from 'twin.macro';

import Logo from '../atoms/Logo'

const Navbar = () => (
  <div css={tw`flex flex-row justify-start p-6 w-full`}>
    <Logo />
  </div>
)

export default Navbar
