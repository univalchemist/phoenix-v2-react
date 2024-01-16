import React, { forwardRef } from 'react'

import { IConditionalWrapperProps } from './types'

export const ConditionalWrapper = forwardRef<
  HTMLElement,
  IConditionalWrapperProps
>(({ className, WrapEl, children, ...rest }, ref) => {
  const Wrap = WrapEl ? WrapEl : React.Fragment
  const props = WrapEl && WrapEl !== React.Fragment ? { className, ref } : {}
  return (
    <Wrap {...rest} {...props}>
      {children}
    </Wrap>
  )
})

export default ConditionalWrapper
