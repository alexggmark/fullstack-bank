import customerServices from '../_services/customer.services'
import {
  LOGIN_USER_LOADING,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  REGISTER_USER_LOADING,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  POPULATE_USER_DATA
} from '../_constants/customer.constants'

const customerActions = {
  loginAction,
  populateUserData,
  registerAction
}

function populateUserData() {
  return (dispatch) => {
    console.log('TESTING')
    customerServices.getUserData()
      .then((res) => {
        dispatch({
          type: POPULATE_USER_DATA,
          payload: res
        })
      })
      .catch((err) => {
        console.error(err)
      })
  }
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

function registerAction(credentials) {
  return (dispatch) => {
    console.log('registerAction: LOAD')
    dispatch(load())
    customerServices.createUser(credentials)
      .then(() => {
        console.log('registerAction: SUCCESS')
        dispatch(success())
      })
      .catch((err) => {
        console.log('registerAction: FAILURE')
        dispatch(fail())
      })
  }

  function success() {
    return { type: REGISTER_USER_SUCCESS }
  }
  function load() {
    return { type: REGISTER_USER_LOADING }
  }
  function fail() {
    return { type: REGISTER_USER_FAILURE }
  }
}

export default customerActions
