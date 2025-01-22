import React, { PropsWithChildren, ReactNode, useEffect, useState } from 'react'
import tw from 'twin.macro'
import { Fieldset } from '.'
import getFlagEmoji from '../../utils/getFlagEmoji'

interface LargeDisplayOnlyFieldsetProps {
  label: string;
  currency: string;
  value: string;
}

const StyledInput = tw.input`text-2xl font-bold bg-white focus:outline-none w-full`
const SpanWithMarginRight = tw.span`mr-1`;

const LargeDisplayOnlyFieldset: React.FC<LargeDisplayOnlyFieldsetProps> = ({
  label,
  currency,
  value
}) => {
  return (
    <Fieldset label={label}>
      <SpanWithMarginRight>{getFlagEmoji(currency)} </SpanWithMarginRight>
      <StyledInput
        id={label}
        type="text"
        value={value}
        disabled
      />
    </Fieldset>
  )
}

export default LargeDisplayOnlyFieldset;