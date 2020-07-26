import currentServices from '../_services/current.services'
import {
  CREATE_CURRENT_LOADING,
  CREATE_CURRENT_SUCCESS,
  CREATE_CURRENT_FAILURE,
  POPULATE_CURRENT_DATA,
  POPULATE_CURRENT_LOADING,
  POPULATE_CURRENT_SUCCESS,
  POPULATE_CURRENT_FAILURE
} from '../_constants/current.constants'

const currentActions = {
  createCurrentAccount,
  getCurrentAccountsUser
}

function createCurrentAccount(data) {
  return (dispatch) => {
    dispatch(load())
    currentServices.createCurrent(data)
      .then((res) => {
        dispatch(success())
      })
      .catch((err) => {
        dispatch(fail())
      })
  }

  function success() {
    return { type: CREATE_CURRENT_SUCCESS }
  }
  function load() {
    return { type: CREATE_CURRENT_LOADING }
  }
  function fail() {
    return { type: CREATE_CURRENT_FAILURE }
  }
}

function getCurrentAccountsUser() {
  return (dispatch) => {
    dispatch(load())
    currentServices.fetchCurrent()
      .then((res) => {
        dispatch(success())
        res.forEach((item) => {
          dispatch({
            type: POPULATE_CURRENT_DATA,
            payload: item
          })
        })
      })
      .catch((err) => {
        dispatch(fail())
      })
  }

  function success() {
    return { type: POPULATE_CURRENT_SUCCESS }
  }
  function load() {
    return { type: POPULATE_CURRENT_LOADING }
  }
  function fail() {
    return { type: POPULATE_CURRENT_FAILURE }
  }
}

export default currentActions