import { customerServices } from '../_services/customer.services'
import {
  LOGIN_USER_LOADING,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL
} from '../_constants/customer.constants'

export const customerActions = {
  login,
}

function login (credentials) {
  console.log('Login action')
  if (!credentials) { return }

  return (dispatch) => {
    dispatch(request())
    customerServices.login(credentials).then(
      (res) => {
        dispatch(response())
        console.log(res)
      })
      .catch((err) => {
        dispatch(fail())
        console.error(err)
      }
    )
  }

  function response() {
    return { type: LOGIN_USER_SUCCESS }
  }
  function request() {
    return { type: LOGIN_USER_LOADING }
  }
  function fail() {
    return { typee: LOGIN_USER_FAIL }
  }
}