import transactionServices from '../_services/translog.services'
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
  DECREASE_MONEY_STORE
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
        dispatch(success())
        dispatch({
          type: UPDATE_SINGLE_TRANSLOG,
          payload: res
        })
        if (fromId === 'store') dispatch({
            type: DECREASE_MONEY_STORE,
            payload: res.value
          })
        if (toId === 'store') dispatch({
            type: UPDATE_MONEY_STORE,
            payload: res.value
          })
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