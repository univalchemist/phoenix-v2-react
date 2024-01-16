import React from 'react'
import { Tooltip as ReTooltip } from 'react-tooltip'
import { faker } from '@faker-js/faker'

import { ITooltipProps } from './types'
import 'react-tooltip/dist/react-tooltip.css'
import './tooltip.scss'

export const Tooltip: React.FC<ITooltipProps> = ({
  id = faker.string.nanoid(),
  placement,
  children,
  content,
  ...rest
}) => {
  if (!children || !id) return null

  const trigger = React.cloneElement(children, {
    id,
  })
  return (
    <>
      {trigger}
      <ReTooltip
        {...rest}
        id="custom-tooltip"
        place={placement}
        anchorSelect={`#${id}`}
      >
        {content}
      </ReTooltip>
    </>
  )
}

export default Tooltip
