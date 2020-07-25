import {
  API_URL
} from '../_constants/api.constants'
import userAuthHeader from '../_helpers/userAuthHeader'

const savingsServices = {
  createSavings,
  fetchSavings,
}

function createSavings(data) {
  const request = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: userAuthHeader.token
    },
    body: JSON.stringify(data)
  }

  return fetch(`${API_URL}/api/createNewSavingsAccount`, request)
    .then((res) => {
      return res
    })
}

function fetchSavings() {
  const request = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: userAuthHeader.token
    }
  }

  return fetch(`${API_URL}/api/getSavingsAccountsUser`, request)
    .then((res) => {
      return res.json()
    })
    .then((res) => {
      return res
    })
}

export default savingsServices