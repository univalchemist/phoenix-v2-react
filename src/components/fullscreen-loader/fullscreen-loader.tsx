import React from 'react'
import classNames from 'classnames'

import { IFullScreenLoaderProps } from './types'
import './fullscreen-loader.scss'

export const FullScreenLoader: React.FC<IFullScreenLoaderProps> = ({
  semi = false,
  sectionLoader = false,
  loading,
  loadingText,
}) => {
  if (!loading) return null
  return (
    <div
      className={classNames('loading-box', {
        'section-loading': !!sectionLoader,
        processing: !!loading,
        semi,
      })}
    >
      <p>{loadingText}</p>
    </div>
  )
}

export default FullScreenLoader
