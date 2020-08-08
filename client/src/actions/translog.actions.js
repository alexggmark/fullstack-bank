import transactionServices from '../_services/translog.services'
import {
  POPULATE_TRANSLOG_DATA,
  POPULATE_TRANSLOG_LOADING,
  POPULATE_TRANSLOG_SUCCESS,
  POPULATE_TRANSLOG_FAILURE
} from '../_constants/translog.constants'

const transactionActions = {
  populateTranslogData,
}

function populateTranslogData() {
  return (dispatch) => {
    dispatch(load())
    transactionServices.getTransLogs()
      .then((res) => {
        console.log(res)
        dispatch(success())
        res.forEach((item) => {
          // console.log(item)
          dispatch({
            type: POPULATE_TRANSLOG_DATA,
            payload: item
          })
        })
      })
      .catch((err) => {
        dispatch(fail())
      })
  }

  function success() {
    return { type: POPULATE_TRANSLOG_SUCCESS }
  }
  function load() {
    return { type: POPULATE_TRANSLOG_LOADING }
  }
  function fail() {
    return { type: POPULATE_TRANSLOG_FAILURE }
  }
}

export default transactionActions