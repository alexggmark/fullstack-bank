import {
  API_URL
} from '../_constants/api.constants'

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
      console.log(res)
      localStorage.setItem('user', JSON.stringify({ token: res.token }))
      return res.user
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
