import React, { HTMLAttributes, CSSProperties } from 'react'

export interface IContainerProps extends HTMLAttributes<HTMLElement> {
  WrapEl?: React.ElementType
  className?: string
  col?: boolean
  reversed?: boolean
  align?: CSSProperties['alignItems']
  justify?: CSSProperties['justifyContent']
  gap?: number
  children: React.ReactNode
}
