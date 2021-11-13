export * from './invoice'

export const formatMongoError = (error: any) => {
  if (error.code === 11000) {
    const field = Object.keys(error.keyPattern)[0]
    return `An account with this ${field} already exists!`
  }
  // return 'Error saving data to database'
  return error
}

const MONTHS_SHORT = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'June',
  'July',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec',
]

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export const formatDate = (ts: string, format?: string) => {
  const d = new Date(ts)
  const day = d.getDate()
  const months = format === 'short' ? MONTHS_SHORT : MONTHS
  const month = months[d.getMonth()]
  const year = d.getFullYear()
  let suffix = ''
  switch (day) {
    case 1:
      suffix = 'st'
      break
    case 2:
      suffix = 'nd'
      break
    case 3:
      suffix = 'rd'
      break
    default:
      suffix = 'th'
  }
  return `${month} ${day}${suffix}, ${year}`
}
