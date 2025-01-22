import React, { PropsWithChildren } from 'react'

import { CenteredLayout, ContainerWithGradient } from '../atoms'
import { Navbar } from '../molecules'

const Page = ({ children }: PropsWithChildren) => {
  return (
    <ContainerWithGradient>
      <Navbar />
      <CenteredLayout>
        {children} 
      </CenteredLayout>
    </ContainerWithGradient>
  )
}

export default Page 
