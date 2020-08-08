import currentServices from '../_services/current.services'
import {
  CREATE_CURRENT_LOADING,
  CREATE_CURRENT_SUCCESS,
  CREATE_CURRENT_FAILURE,
  DELETE_CURRENT,
  POPULATE_CURRENT_DATA,
  POPULATE_CURRENT_LOADING,
  POPULATE_CURRENT_SUCCESS,
  POPULATE_CURRENT_FAILURE
} from '../_constants/current.constants'

const currentActions = {
  createCurrentAccount,
  getCurrentAccountsUser,
  deleteCurrentAccount
}

function createCurrentAccount(data) {
  return (dispatch) => {
    dispatch(load())
    currentServices.createCurrent(data)
      .then((res) => {
        console.log(res)
        dispatch({
          type: POPULATE_CURRENT_DATA,
          payload: res
        })
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

function deleteCurrentAccount(id) {
  return (dispatch) => {
    currentServices.deleteCurrent(id)
      .then((res) => {
        dispatch(deleteCurrent(id))
      })
      .catch((err) => {
        console.error(err)
      })
  }

  function deleteCurrent(id) {
    return { type: DELETE_CURRENT, payload: id }
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