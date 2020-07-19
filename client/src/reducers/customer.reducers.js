import {
  LOGIN_USER_LOADING,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
} from '../_constants/customer.constants'

const initialState = {
  userLoginLoading: false,
  userLoginSuccess: false,
  userLoginFailure: false,
  userName: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER_LOADING:
      return {
        ...state,
        userLoginLoading: true,
        userLoginFailure: false,
      }
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        userLoginLoading: false,
        userLoginSuccess: true,
        userLoginFailure: false,
      }
    case LOGIN_USER_FAIL:
      return {
        ...state,
        userLoginFailure: true
      }
    default:
      return state
  }
}
