import { combineReducers } from 'redux'
import CustomerReducer from './customer.reducers'
import CurrentReducer from './current.reducers'
import SavingsReducer from './savings.reducers'
import TranslogReducer from './translog.reducers'

const combination = combineReducers({
  CustomerReducer,
  CurrentReducer,
  SavingsReducer,
  TranslogReducer,
})

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    state = undefined
  }

  return combination(state, action)
}

export default rootReducer