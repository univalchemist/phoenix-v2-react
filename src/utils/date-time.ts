import moment from 'moment'
import { t } from '@/i18n'

export const formatDateTime = (
  dateTime: Date | string | number,
  format: string,
): string => moment(dateTime).format(format)

export const isDisableDate = (
  curDate: Date,
  disabledList: Date[] = [],
  maxDate?: Date,
  minDate?: Date,
): boolean => {
  if (maxDate) {
    if (moment(curDate).isAfter(maxDate)) {
      return true
    }
  }
  if (minDate) {
    if (moment(curDate).isBefore(minDate)) {
      return true
    }
  }
  return !!disabledList?.some(d => moment(d).isSame(curDate, 'day'))
}

export const minutesToTimeStr = (minutes: number): string => {
  if (!minutes) return '0m'

  const sign = minutes < 0 ? '-' : ''

  const _minutes = Math.abs(minutes)
  const daysDiff = Math.floor(_minutes / 1440)
  const hoursDiff = Math.floor((_minutes % 1440) / 60)
  const minsDiff = _minutes % 60

  let timeStr = sign
  if (daysDiff) {
    timeStr += `${daysDiff}d `
  }
  if (hoursDiff) {
    timeStr += `${hoursDiff}h `
  }
  if (minsDiff) {
    timeStr += `${minsDiff}m`
  }

  return timeStr
}

export const getTimeDiff = (
  start: Date | string | number,
  end: Date | string | number,
  unit: 'minutes' | 'seconds' | 'hours',
): number => moment(start).diff(end, unit)

export const humanize = (datetime: Maybe<Date | string | number>): string => {
  if (!datetime) return ''
  const diff = moment(datetime).diff(moment(), 'minutes')

  if (diff >= 0 && diff <= 1) {
    return t('justNow')
  }
  return moment.duration(diff, 'minutes').humanize(true)
}

export const isAlertExpiring = (date: Date | string | number) =>
  getTimeDiff(date, new Date(), 'minutes') < 720

export const getMinDate = (days: string[]) => {
  let minDate: Date = new Date(days[0])
  days.forEach(day => {
    if (moment(minDate).isAfter(new Date(day))) minDate = new Date(day)
  }, [])

  return formatDateTime(minDate, 'YYYY-MM-DD')
}

/**
 * Get timestamp in seconds from date
 * @param value Date | string | undefined : Selected value
 * @param type 'date' | 'datetime' : Determine whether to return date or datetime value
 * @param shouldEndDay boolean : Determine whether return end of day or start of day when `type` is 'date`
 * @param defaultValue Date | string | undefined : Default value
 * @returns number : Timestamp value in seconds
 */
export const getTimeStamp = (
  value: Date | string | undefined,
  type: 'date' | 'datetime' = 'date',
  shouldEndDay = false,
  defaultValue?: Date | string,
): number => {
  let res = 0
  const tmstpInSeconds = (val: Date | string): number => {
    const datetime = moment(val)
    let timestamp = 0
    if (type === 'date') {
      timestamp = shouldEndDay
        ? datetime.endOf('day').unix()
        : datetime.startOf('day').unix()
    } else {
      timestamp = datetime.unix()
    }

    return timestamp
  }

  if (!value) {
    if (defaultValue) {
      res = tmstpInSeconds(defaultValue)
    }
  } else {
    res = tmstpInSeconds(value)
  }

  return res
}

export const getGreetingTime = (): 'morning' | 'afternoon' | 'evening' => {
  const now = new Date().getHours()
  if (now >= 0 && now <= 12) return 'morning'
  if (now > 12 && now < 18) return 'afternoon'

  return 'evening'
}
