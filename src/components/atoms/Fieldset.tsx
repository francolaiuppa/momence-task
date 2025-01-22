import React, { PropsWithChildren, ReactNode } from 'react'
import tw, { styled } from 'twin.macro'

interface Fieldset {
  label: string
  children: ReactNode
}

const StyledFieldset = styled.div`
  ${tw`border-2 border-gray-200 flex flex-col p-4 rounded-md mb-4 transition-all duration-300 ease-in-out`}
  &:focus-within {
    border-color: #6366f1;
    border-width: 2px;
  }
`

const FieldsetContent = tw.div`flex flex-row text-2xl font-bold`

const Label = tw.label`text-lg text-gray-600 mb-0 pb-0 leading-none`

const Fieldset = ({ label, children }: PropsWithChildren<Fieldset>) => (
  <StyledFieldset className="group">
    <Label htmlFor={label}>{label}</Label>
    <FieldsetContent>{children}</FieldsetContent>
  </StyledFieldset>
)

export default Fieldset
