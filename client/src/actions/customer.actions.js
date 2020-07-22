import customerServices from '../_services/customer.services'
import {
  LOGIN_USER_LOADING,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGOUT_USER,
  POPULATE_USER_DATA
} from '../_constants/customer.constants'

const customerActions = {
  loginAction,
  getUserData
}

function loginAction(credentials) {
  if (!credentials) { return }

  return (dispatch) => {
    dispatch(load())
    customerServices.login(credentials)
      .then(() => {
        dispatch(success())
      })
      .catch((err) => {
        console.error(err)
        dispatch(fail())
      })
  }

  function success() {
    return { type: LOGIN_USER_SUCCESS }
  }
  function load() {
    return { type: LOGIN_USER_LOADING }
  }
  function fail() {
    return { type: LOGIN_USER_FAILURE }
  }
}

function getUserData() {
  customerServices.getUserData()
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.error(err)
    })
}

function logoutAction() {


  function logout() {
    return { type: LOGOUT_USER }
  }
}

export default customerActions