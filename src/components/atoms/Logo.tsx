import React from 'react'
import tw from 'twin.macro'

// These classes are coming from Tailwind CSS. For more info check https://tailwindcss.com/docs/
const LogoContainer = tw.div`
    h-16
    w-32
    bg-indigo-900
    flex
    items-center
    justify-center
    font-bold
    text-2xl
    text-indigo-300
    rounded-md`;

const Logo = () => (<LogoContainer>LOGO</LogoContainer>)

export default Logo
