import {
  API_URL
} from '../_constants/api.constants'
import userAuthHeader from '../_helpers/userAuthHeader'

const transactionServices = {
  transferMoney,
  getTransLogs,
}

function transferMoney(value, fromId, toId) {
  const request = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: userAuthHeader().token
    },
    body: JSON.stringify({ value, fromId, toId })
  }

  return fetch(`${API_URL}/api/transferMoney`, request)
    .then((res) => {
      return res
    })
}

function getTransLogs() {
  const request = {
    TYPE: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: userAuthHeader().token
    }
  }

  return fetch(`${API_URL}/api/getTransLogs`, request)
    .then((res) => {
      return res.json()
    })
    .then((res) => {
      console.log(res)
      return res
    })
}

export default transactionServices