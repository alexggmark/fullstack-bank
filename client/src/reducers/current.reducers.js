import {
  CREATE_CURRENT_LOADING,
  CREATE_CURRENT_SUCCESS,
  CREATE_CURRENT_FAILURE
} from '../_constants/current.constants'

const initialState = {
  createCurrentLoading: false,
  createCurrentSuccess: false,
  createCurrentFailure: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_CURRENT_LOADING:
      return {
        ...state,
        createCurrentLoading: true,
        createCurrentFailure: false,
      }
    case CREATE_CURRENT_SUCCESS:
      return {
        ...state,
        createCurrentLoading: false,
        createCurrentSuccess: true,
        createCurrentFailure: false
      }
    case CREATE_CURRENT_FAILURE:
      return {
        ...state,
        createCurrentLoading: false,
        createCurrentFailure: true
      }
    default:
      return state
  }
}
