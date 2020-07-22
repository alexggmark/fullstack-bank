import currentServices from '../_services/current.services'
import {
  CREATE_CURRENT_LOADING,
  CREATE_CURRENT_SUCCESS,
  CREATE_CURRENT_FAILURE
} from '../_constants/current.constants'

const currentActions = {
  createCurrentAccount,
}

function createCurrentAccount(data) {
  console.log('CreateCurrent ACTION')
  return (dispatch) => {
    dispatch(load())
    currentServices.createCurrent(data)
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
    return { type: CREATE_CURRENT_SUCCESS }
  }
  function load() {
    return { type: CREATE_CURRENT_LOADING }
  }
  function fail() {
    return { type: CREATE_CURRENT_FAILURE }
  }
}

export default currentActions