import React, { PropsWithChildren, ReactNode, useEffect, useState } from 'react'
import tw from 'twin.macro'
import { Fieldset } from '.'
import getFlagEmoji from '../../utils/getFlagEmoji'

interface LargeNumericInputFieldsetProps {
  label: string
  currency: string
  amount: number | string
  min?: number
  step?: number
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const StyledInput = tw.input`text-2xl font-bold bg-white focus:outline-none w-full`
const SpanWithMarginRight = tw.span`mr-1`

const LargeNumericInputFieldset: React.FC<LargeNumericInputFieldsetProps> = ({
  label,
  currency,
  amount,
  min = 0,
  step = 1,
  onChange,
}) => {
  return (
    <Fieldset label={label}>
      <SpanWithMarginRight>{getFlagEmoji(currency)} </SpanWithMarginRight>
      <SpanWithMarginRight>{currency} </SpanWithMarginRight>
      <StyledInput
        id={label}
        type="number"
        min={min}
        step={step}
        value={amount}
        onChange={onChange}
      />
    </Fieldset>
  )
}

export default LargeNumericInputFieldset
