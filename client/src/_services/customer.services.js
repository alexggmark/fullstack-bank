import {
  API_URL
} from '../_constants/api.constants'
import userAuthHeader from '../_helpers/userAuthHeader'

export const customerServices = {
  login,
  createUser,
}

function handleResponse(res) {
  if (!res.ok) {
    if (res.status === 400) {
      return Promise.reject('Invalid login')
    }
  }
  return res.json()
}

function login(credentials) {
  const request = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  }

  return fetch(`${API_URL}/api/loginUser`, request)
    .then(handleResponse)
    .then((res) => {
      localStorage.setItem('user', JSON.stringify({ token: res.token }))
      return res.user
    })
}

function getUserData(userId) {
  const request = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: userAuthHeader
    },
    body: userId
  }

  return fetch(`${API_URL}/api/getUserData`, request)
      .then(handleResponse)
      .then((res) => {
        console.log('GETTING RES')
        console.log(res)
      })
}

function createUser(credentials) {
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

function logout() {
  console.log('Logout')
}
