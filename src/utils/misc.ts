import { add, Duration } from 'date-fns'

export const getTokenExpiration = (
  val: number,
  duration: keyof Duration = 'days',
) => {
  if (val <= 0) {
    throw new Error('Duration value must be a positive number')
  }
  return add(new Date(), { [duration]: val })
}
