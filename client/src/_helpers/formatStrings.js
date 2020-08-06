import moment from 'moment'

export const formatDate = (string) => {
  return moment(string).format('MMM Do YYYY')
}

export const formatMoney = (string) => {
  if (string % 1 != 0) {
    return string
  }
  return `${string}.00`
}