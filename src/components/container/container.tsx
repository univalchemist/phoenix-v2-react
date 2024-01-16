import React, { forwardRef } from 'react'
import classNames from 'classnames'

import { IContainerProps } from './types'
import './container.scss'

export const Container = forwardRef<HTMLElement, IContainerProps>(
  (
    {
      WrapEl = 'div',
      className = '',
      col = false,
      reversed,
      align,
      justify,
      gap = 0,
      children,
      style,
      ...rest
    },
    ref,
  ) => {
    const Wrap = WrapEl ? WrapEl : React.Fragment
    const props =
      WrapEl && WrapEl !== React.Fragment
        ? {
            className: classNames('container-wrapper', {
              row: !col,
              col,
              reversed,
              [className]: !!className,
            }),
            style: {
              ...style,
              alignItems: align,
              justifyContent: justify,
              gap,
            },
          }
        : {}
    return (
      <Wrap {...rest} {...props} ref={ref}>
        {children}
      </Wrap>
    )
  },
)

export default Container
