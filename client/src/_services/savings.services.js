import {
  API_URL
} from '../_constants/api.constants'
import userAuthHeader from '../_helpers/userAuthHeader'

const savingsServices = {
  createSavings,
  fetchSavings,
  deleteSavings
}

function handleResponse(res) {
  if (!res.ok) {
    if (res.status === 400) {
      return Promise.reject('Invalid login')
    }
  }
  return res.json()
}

function createSavings(data) {
  const request = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: userAuthHeader().token
    },
    body: JSON.stringify(data)
  }

  return fetch(`${API_URL}/api/createNewSavingsAccount`, request)
  .then(handleResponse)
    .then((res) => {
      return res
    })
}

function fetchSavings() {
  const request = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: userAuthHeader().token
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

function deleteSavings(id) {
  const request = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: userAuthHeader().token
    },
    body: JSON.stringify(id)
  }

  return fetch(`${API_URL}/api/deleteSavingsAccount`, request)
    .then(handleResponse)
    .then((res) => {
      return res
    })
}

export default savingsServices