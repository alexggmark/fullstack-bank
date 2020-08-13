import {
  LOGIN_USER_LOADING,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  REGISTER_USER_LOADING,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  LOGOUT_USER,
  POPULATE_USER_DATA,
  UPDATE_MONEY_STORE,
  DECREASE_MONEY_STORE,
  UPDATE_SAVINGS_STORE,
  DECREASE_SAVINGS_STORE,
  UPDATE_CURRENT_STORE,
  DECREASE_CURRENT_STORE
} from '../_constants/customer.constants'
import userAuthHeader from '../_helpers/userAuthHeader'

const initialState = {
  userLoginLoading: false,
  userLoginSuccess: userAuthHeader() ? true : false,
  userLoginFailure: false,
  registerLoading: false,
  registerSuccess: false,
  registerFailure: false,
  firstName: null,
  lastName: null,
  username: null,
  createdAt: null,
  activeSavingsAccount: 0,
  activeCurrentAccount: 0,
  moneyStore: 0
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
    case REGISTER_USER_LOADING:
      return {
        ...state,
        registerLoading: true,
        registerSuccess: false,
        registerFailure: false,
      }
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        registerLoading: false,
        registerSuccess: true,
        registerFailure: false,
      }
    case REGISTER_USER_FAILURE:
      return {
        ...state,
        registerLoading: false,
        registerFailure: true,
      }
    case LOGOUT_USER:
      return {
        ...state,
        userLoginSuccess: false,
      }
    case POPULATE_USER_DATA:
      const {
        activeCurrentAccount,
        activeSavingsAccount,
        createdAt,
        firstName,
        lastName,
        moneyStore,
        username } = action.payload
      return {
        ...state,
        activeCurrentAccount,
        activeSavingsAccount,
        createdAt,
        firstName,
        lastName,
        moneyStore,
        username
      }
    case UPDATE_MONEY_STORE:
      console.log(`UPDATE_MONEY_STORE: ${state.moneyStore} + ${action.payload}`)
      return {
        ...state,
        moneyStore: state.moneyStore + action.payload
      }
    case DECREASE_MONEY_STORE:
      console.log(`DECREASE_MONEY_STORE: ${state.moneyStore} - ${action.payload}`)
      return {
        ...state,
        moneyStore: state.moneyStore - action.payload
      }
    case UPDATE_SAVINGS_STORE:
      return {
        ...state,
        activeSavingsAccount: state.activeSavingsAccount + action.payload
      }
    case DECREASE_SAVINGS_STORE:
      return {
        ...state,
        activeSavingsAccount: state.activeSavingsAccount - action.payload
      }
    case UPDATE_CURRENT_STORE:
      console.log(`UPDATE_CURRENT_STORE: ${state.activeCurrentAccount} + ${action.payload}`)
      return {
        ...state,
        activeCurrentAccount: state.activeCurrentAccount + action.payload
      }
    case DECREASE_CURRENT_STORE:
      console.log(`DECREASE_CURRENT_STORE: ${state.activeCurrentAccount} - ${action.payload}`)
      return {
        ...state,
        activeCurrentAccount: state.activeCurrentAccount - action.payload
      }
    default:
      return state
  }
}
