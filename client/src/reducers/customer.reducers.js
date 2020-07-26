import {
  LOGIN_USER_LOADING,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGOUT_USER,
  POPULATE_USER_DATA
} from '../_constants/customer.constants'
import userAuthHeader from '../_helpers/userAuthHeader'

const initialState = {
  userLoginLoading: false,
  userLoginSuccess: userAuthHeader ? true : false,
  userLoginFailure: false,
  firstName: null,
  lastName: null,
  username: null,
  createdAt: null,
  activeSavingsAccount: null,
  activeCurrentAccount: null,
  moneyStore: null,
  totalCurrent: null,
  totalSavings: null
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
        userLoginFailure: false
      }
    case LOGIN_USER_FAILURE:
      return {
        ...state,
        userLoginLoading: false,
        userLoginFailure: true
      }
    case LOGOUT_USER:
      return {
        ...initialState
      }
    case POPULATE_USER_DATA:
      const {
        activeCurrentAccount,
        activeSavingsAccount,
        createdAt,
        firstName,
        lastName,
        moneyStore,
        username,
        totalCurrent,
        totalSavings } = action.payload
      return {
        ...state,
        activeCurrentAccount,
        activeSavingsAccount,
        createdAt,
        firstName,
        lastName,
        moneyStore,
        username,
        totalCurrent,
        totalSavings
      }
    default:
      return state
  }
}
