import {
  API_URL
} from '../_constants/api.constants'
import userAuthHeader from '../_helpers/userAuthHeader'

const currentServices = {
  createCurrent,
}

function createCurrent(data) {
  const request = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: userAuthHeader.token
    },
    body: JSON.stringify(data)
  }

  return fetch(`${API_URL}/api/createNewCurrentAccount`, request)
    .then((res) => {
      return res
    })
}

export default currentServices