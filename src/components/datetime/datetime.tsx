import React, { useMemo } from 'react'

import { ConditionalWrapper } from '../'
import { IDateTimeProps } from './types'
import {
  formatDateTime,
  getTimeDiff,
  humanize,
  minutesToTimeStr,
} from '@/utils'

export const DateTime: React.FC<IDateTimeProps> = ({
  value,
  format = 'YYYY-MM-DD HH:mm:ss',
  mode,
  WrapEl,
  className,
  placeholder,
}) => {
  const formattedValue = useMemo(() => {
    if (!value) return placeholder ?? ''
    let _value = value
    if (!isNaN(+_value)) {
      if (_value.toString().length < 13) {
        _value = +value * 1000
      }
    }
    if (mode === 'diff') {
      const diff = getTimeDiff(_value, new Date(), 'minutes')
      return minutesToTimeStr(diff)
    } else if (mode === 'humanize') {
      return humanize(_value)
    }
    return formatDateTime(_value, format)
  }, [format, mode, placeholder, value])

  return (
    <ConditionalWrapper WrapEl={WrapEl} className={className}>
      {formattedValue}
    </ConditionalWrapper>
  )
}

export default DateTime
