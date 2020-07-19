import {
  API_URL
} from '../_constants/api.constants'

export const customerServices = {
  login,
  createUser,
}

function login (credentials) {
  const request = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  }

  return fetch(`${API_URL}/api/loginUser`, request)
    .then((res) => {
      return res
    })
    .catch(err => console.error(err))
}

function createUser (credentials) {
  const request = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  }

  return fetch(`${API_URL}/api/createUser`, request)
    .then((res) => {
      return res
    })
}
