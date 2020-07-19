import { combineReducers } from 'redux'
import CustomerReducer from './customer.reducers'

const combination = combineReducers({
  CustomerReducer,
})

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    state = undefined
  }

  return combination(state, action)
}

export default rootReducer