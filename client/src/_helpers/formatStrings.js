import moment from 'moment'

export const formatDate = (string) => {
  return moment(string).format('MMM Do YYYY')
}

export const formatMoney = (string) => {
  if (string % 1 != 0) {
    return Math.round(string * 100) / 100
  }
  return `${string}.00`
}