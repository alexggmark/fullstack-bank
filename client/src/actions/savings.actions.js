import savingsServices from '../_services/savings.services'
import {
  CREATE_SAVINGS_LOADING,
  CREATE_SAVINGS_SUCCESS,
  CREATE_SAVINGS_FAILURE,
  DELETE_SAVINGS,
  POPULATE_SAVINGS_DATA,
  POPULATE_SAVINGS_LOADING,
  POPULATE_SAVINGS_SUCCESS,
  POPULATE_SAVINGS_FAILURE
} from '../_constants/savings.constants'
import {
  UPDATE_MONEY_STORE,
  DECREASE_MONEY_STORE,
  UPDATE_SAVINGS_STORE,
  DECREASE_SAVINGS_STORE
} from '../_constants/customer.constants'

const savingsActions = {
  createSavingsAccount,
  getSavingsAccountsUser,
  deleteSavingsAccount
}

function createSavingsAccount(data) {
  return (dispatch) => {
    dispatch(load())
    savingsServices.createSavings(data)
      .then((res) => {
        dispatch({
          type: POPULATE_SAVINGS_DATA,
          payload: res
        })
        dispatch({
          type: UPDATE_SAVINGS_STORE,
          payload: res.total
        })
        dispatch({
          type: DECREASE_MONEY_STORE,
          payload: res.total
        })
        dispatch(success())
      })
      .catch((err) => {
        console.error(err)
        dispatch(fail())
      })
  }

  function success() {
    return { type: CREATE_SAVINGS_SUCCESS }
  }
  function load() {
    return { type: CREATE_SAVINGS_LOADING }
  }
  function fail() {
    return { type: CREATE_SAVINGS_FAILURE }
  }
}

function getSavingsAccountsUser() {
  return (dispatch) => {
    dispatch(load())
    savingsServices.fetchSavings()
      .then((res) => {
        dispatch(success())
        res.forEach((item) => {
          dispatch({
            type: POPULATE_SAVINGS_DATA,
            payload: item
          })
        })
      })
      .catch((err) => {
        dispatch(fail())
      })
  }

  function success() {
    return { type: POPULATE_SAVINGS_SUCCESS }
  }
  function load() {
    return { type: POPULATE_SAVINGS_LOADING }
  }
  function fail() {
    return { type: POPULATE_SAVINGS_FAILURE }
  }
}

function deleteSavingsAccount(id) {
  return (dispatch) => {
    savingsServices.deleteSavings(id)
      .then((res) => {
        dispatch({
          type: DELETE_SAVINGS,
          payload: id
        })
        return res
      })
      .then((res) => {
        dispatch({
          type: UPDATE_MONEY_STORE,
          payload: res.total
        })
        dispatch({
          type: DECREASE_SAVINGS_STORE,
          payload: res.total
        })
      })
      .catch((err) => {
        console.error(err)
      })
  }
}

export default savingsActions