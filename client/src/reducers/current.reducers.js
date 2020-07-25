import {
  CREATE_CURRENT_LOADING,
  CREATE_CURRENT_SUCCESS,
  CREATE_CURRENT_FAILURE,
  POPULATE_CURRENT_DATA,
  POPULATE_CURRENT_LOADING,
  POPULATE_CURRENT_SUCCESS,
  POPULATE_CURRENT_FAILURE
} from '../_constants/current.constants'

const initialState = {
  createCurrentLoading: false,
  createCurrentSuccess: false,
  createCurrentFailure: false,
  currentAccounts: [],
  populateCurrentLoading: false,
  populateCurrentFailure: false,
  populateCurrentSuccess: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case POPULATE_CURRENT_DATA:
      return {
        ...state,
        currentAccounts: [
          ...state.currentAccounts,
          action.payload
        ]
      }
    case POPULATE_CURRENT_LOADING:
      return {
        ...state,
        currentAccounts: [],
        populateCurrentLoading: true,
        populateCurrentSuccess: false,
        populateCurrentFailure: false,
      }
    case POPULATE_CURRENT_SUCCESS:
      return {
        ...state,
        populateCurrentLoading: false,
        populateCurrentSuccess: true,
        populateCurrentFailure: false
      }
    case POPULATE_CURRENT_FAILURE:
      return {
        ...state,
        populateCurrentLoading: false,
        populateCurrentSuccess: false,
        populateCurrentFailure: true
      }
    case CREATE_CURRENT_LOADING:
      return {
        ...state,
        createCurrentLoading: true,
        createCurrentSuccess: false,
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
        createCurrentSuccess: false,
        createCurrentFailure: true
      }
    default:
      return state
  }
}
