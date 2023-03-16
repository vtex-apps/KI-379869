export const validateDaysPassed = (date1: any, date2: any, days: number) => {
  const dayInMs = 24 * 60 * 60 * 1000
  const difference = Math.abs(date2 - date1)
  const differenceOnDays = Math.floor(difference / dayInMs)

  return differenceOnDays >= days
}
