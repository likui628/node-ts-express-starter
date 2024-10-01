import { add, Duration } from 'date-fns'

export const getTokenExpiration = (
  val: number,
  duration: keyof Duration = 'days',
) => {
  return add(new Date(), { [duration]: val })
}
