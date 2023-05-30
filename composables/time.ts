import dayjs from 'dayjs/esm/index.js'
import utc from 'dayjs/esm/plugin/utc'
import timezone from 'dayjs/esm/plugin/timezone'
import isSameOrAfter from 'dayjs/esm/plugin/isSameOrAfter'

export function useTime(start_date: string, end_date: string) {
  dayjs.extend(utc)
  dayjs.extend(timezone)

  const startDate = dayjs(start_date) // 12 August 2022 09:00:00 PDT
  const endDate = dayjs(end_date) // 21 August 2022 23:59:00 PDT

  const timePT = computed(() => {
    return `${startDate
      .tz('America/Los_Angeles')
      .format('D MMM')} at ${startDate
      .tz('America/Los_Angeles')
      .format('hh:mma')} - to - ${endDate
      .tz('America/Los_Angeles')
      .format('D MMM')} at ${endDate
      .tz('America/Los_Angeles')
      .format('hh:mma')} (PT)`
  })
  const timeLocale = computed(() => {
    return `${startDate.format('D MMM')} at ${startDate.format(
      'hh:mma',
    )} - to - ${endDate.format('D MMM')} at ${endDate.format(
      'hh:mma',
    )} (${dayjs.tz.guess()})`
  })

  const isExpired = computed(() => {
    if (dayjs) {
      dayjs.extend(isSameOrAfter)
      return dayjs(Date.now()).isSameOrAfter(endDate)
    }
    else {
      return false
    }
  })

  return {
    startDate,
    endDate,
    timePT,
    timeLocale,
    isExpired,
  }
}
