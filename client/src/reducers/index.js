import { combineReducers } from 'redux'
import CustomerReducer from './customer.reducers'
import CurrentReducer from './current.reducers'

const combination = combineReducers({
  CustomerReducer,
  CurrentReducer,
})

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    state = undefined
  }

  return combination(state, action)
}

export default rootReducer