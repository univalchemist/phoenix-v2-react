import { CSSProperties, forwardRef, useMemo } from 'react'
import classNames from 'classnames'

import { ConditionalWrapper } from '../wrapper'
import { ITextProps } from './types'
import './text.scss'

export const Text = forwardRef<HTMLElement, ITextProps>(
  (
    {
      font,
      size,
      color,
      lineHeight,
      fontWeight,
      ellipsis,
      noWrap = true,
      className,
      WrapEl = 'span',
      style,
      children,
      ...rest
    },
    ref,
  ) => {
    const computedStyle: CSSProperties = useMemo(() => {
      const _style: CSSProperties = style ? { ...style } : {}
      if (font) {
        _style.fontFamily = `var(--font-${font})`
      }
      if (size !== undefined) {
        _style.fontSize = size
      }
      if (lineHeight !== undefined) {
        _style.lineHeight = `${lineHeight}px`
      }
      if (fontWeight !== undefined) {
        _style.fontWeight = fontWeight
      }
      if (color) {
        if (color.startsWith('--')) {
          _style.color = `var(${color})`
        } else {
          _style.color = color
        }
      }

      return _style
    }, [color, font, fontWeight, lineHeight, size, style])

    return (
      <ConditionalWrapper
        {...rest}
        ref={ref}
        WrapEl={WrapEl}
        className={classNames('typography', className, {
          ellipsis: !!ellipsis,
          noWrap: !!noWrap,
        })}
        style={computedStyle}
      >
        {children}
      </ConditionalWrapper>
    )
  },
)

export default Text
