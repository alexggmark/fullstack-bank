import savingsServices from '../_services/savings.services'
import {
  CREATE_SAVINGS_LOADING,
  CREATE_SAVINGS_SUCCESS,
  CREATE_SAVINGS_FAILURE,
  POPULATE_SAVINGS_DATA,
  POPULATE_SAVINGS_LOADING,
  POPULATE_SAVINGS_SUCCESS,
  POPULATE_SAVINGS_FAILURE
} from '../_constants/savings.constants'

const savingsActions = {
  createSavingsAccount,
  getSavingsAccountsUser
}

function createSavingsAccount(data) {
  return (dispatch) => {
    dispatch(load())
    savingsServices.createSavings(data)
      .then((res) => {
        console.log(res)
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
        console.log(res)
        dispatch(success())
        res.forEach((item) => {
          dispatch({
            type: POPULATE_SAVINGS_DATA,
            payload: item
          })
        })
      })
      .catch((err) => {
        console.error(err)
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

export default savingsActions