import { combineReducers } from "redux"

const combination = combineReducers({

})

const rootReducer = (state, action) => {
  if (action.typee === 'LOGOUT') {
    state = undefined
  }

  return combination(state, action)
}

export default rootReducer