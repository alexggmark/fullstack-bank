import transactionServices from '../_services/translog.services'
import { matchIdWithAccountType } from '../_helpers/matchingUtils'

import {
  POPULATE_TRANSLOG_DATA,
  POPULATE_TRANSLOG_DATA_REVERSE,
  POPULATE_TRANSLOG_LOADING,
  POPULATE_TRANSLOG_SUCCESS,
  POPULATE_TRANSLOG_FAILURE,
  UPDATING_TRANSLOG_LOADING,
  UPDATING_TRANSLOG_SUCCESS,
  UPDATING_TRANSLOG_FAILURE,
  UPDATE_SINGLE_TRANSLOG
} from '../_constants/translog.constants'
import {
  UPDATE_MONEY_STORE,
  DECREASE_MONEY_STORE,
  UPDATE_SAVINGS_STORE,
  DECREASE_SAVINGS_STORE,
  UPDATE_CURRENT_STORE,
  DECREASE_CURRENT_STORE
} from '../_constants/customer.constants'

const transactionActions = {
  populateTranslogData,
  transferMoney,
  loadMoreTranslogData
}

function populateTranslogData() {
  return (dispatch) => {
    dispatch(load())
    transactionServices.getTransLogs(4)
      .then((res) => {
        console.log('TRANSLOG DATA')
        console.log(res)
        dispatch(success())
        res.forEach((item) => {
          dispatch({
            type: POPULATE_TRANSLOG_DATA,
            payload: item
          })
        })
      })
      .catch((err) => {
        dispatch(failure())
      })
  }

  function success() {
    return { type: POPULATE_TRANSLOG_SUCCESS }
  }
  function load() {
    return { type: POPULATE_TRANSLOG_LOADING }
  }
  function failure() {
    return { type: POPULATE_TRANSLOG_FAILURE }
  }
}

function loadMoreTranslogData(counter) {
  return (dispatch) => {
    transactionServices.loadMoreTransLogs(counter)
      .then((res) => {
        res.forEach((item) => {
          dispatch({
            type: POPULATE_TRANSLOG_DATA_REVERSE,
            payload: item
          })
        })
      })
  }
}

function transferMoney(sendValue, fromId, toId) {
  return (dispatch) => new Promise((resolve, reject) => {
    dispatch(load())
    transactionServices.transferMoney(sendValue, fromId, toId)
      .then((res) => {
        const fromType = matchIdWithAccountType(fromId)
        const toType = matchIdWithAccountType(toId)

        dispatch(success())
        dispatch({
          type: UPDATE_SINGLE_TRANSLOG,
          payload: res
        })

        switch (fromType) {
          case 'store':
            dispatch({ type: DECREASE_MONEY_STORE, payload: res.value })
            break
          case 'savings':
            dispatch({ type: DECREASE_SAVINGS_STORE, payload: res.value })
            break
          case 'current':
            dispatch({ type: DECREASE_CURRENT_STORE, payload: res.value })
            break
          default: // do nothing
        }

        switch (toType) {
          case 'store':
            dispatch({ type: UPDATE_MONEY_STORE, payload: res.value })
            break
          case 'savings':
            dispatch({ type: UPDATE_SAVINGS_STORE, payload: res.value })
            break
          case 'current':
            dispatch({ type: UPDATE_CURRENT_STORE, payload: res.value })
            break
          default: // do nothing
        }

        resolve(res)
      })
      .catch((err) => {
        dispatch(failure())
        reject(err)
      })
  })

  function success() {
    return { type: UPDATING_TRANSLOG_SUCCESS }
  }
  function load() {
    return { type: UPDATING_TRANSLOG_LOADING }
  }
  function failure() {
    return { type: UPDATING_TRANSLOG_FAILURE }
  }
}

export default transactionActions