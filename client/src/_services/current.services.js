import {
  API_URL
} from '../_constants/api.constants'
import userAuthHeader from '../_helpers/userAuthHeader'

const currentServices = {
  createCurrent,
  fetchCurrent,
  deleteCurrent
}

function handleResponse(res) {
  if (!res.ok) {
    if (res.status === 400) {
      return Promise.reject('Invalid login')
    }
  }
  return res.json()
}

function createCurrent(data) {
  const request = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: userAuthHeader().token
    },
    body: JSON.stringify(data)
  }

  return fetch(`${API_URL}/api/createNewCurrentAccount`, request)
    .then(handleResponse)
    .then((res) => {
      console.log(res)
      return res
    })
}

function fetchCurrent() {
  const request = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: userAuthHeader().token
    }
  }

  return fetch(`${API_URL}/api/getCurrentAccountsUser`, request)
    .then(handleResponse)
    .then((res) => {
      return res
    })
}

function deleteCurrent(id) {
  const request = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: userAuthHeader().token
    },
    body: JSON.stringify(id)
  }

  return fetch(`${API_URL}/api/deleteCurrentAccount`, request)
    .then(handleResponse)
    .then((res) => {
      return res
    })
}

export default currentServices