import {
  CREATE_SAVINGS_LOADING,
  CREATE_SAVINGS_SUCCESS,
  CREATE_SAVINGS_FAILURE,
  DELETE_SAVINGS,
  POPULATE_SAVINGS_DATA,
  POPULATE_SAVINGS_LOADING,
  POPULATE_SAVINGS_SUCCESS,
  POPULATE_SAVINGS_FAILURE
} from '../_constants/savings.constants'

const initialState = {
  createSavingsLoading: false,
  createSavingsSuccess: false,
  createSavingsFailure: false,
  savingsAccounts: [],
  populateSavingsLoading: false,
  populateSavingsFailure: false,
  populateSavingsSuccess: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case POPULATE_SAVINGS_DATA:
      return {
        ...state,
        savingsAccounts: [
          ...state.savingsAccounts,
          action.payload
        ]
      }
    case POPULATE_SAVINGS_LOADING:
      return {
        ...state,
        savingsAccounts: [],
        populateSavingsLoading: true,
        populateSavingsSuccess: false,
        populateSavingsFailure: false,
      }
    case POPULATE_SAVINGS_SUCCESS:
      return {
        ...state,
        populateSavingsLoading: false,
        populateSavingsSuccess: true,
        populateSavingsFailure: false
      }
    case POPULATE_SAVINGS_FAILURE:
      return {
        ...state,
        populateSavingsLoading: false,
        populateSavingsSuccess: false,
        populateSavingsFailure: true
      }
    case CREATE_SAVINGS_LOADING:
      return {
        ...state,
        createSavingsLoading: true,
        createSavingsSuccess: false,
        createSavingsFailure: false,
      }
    case CREATE_SAVINGS_SUCCESS:
      return {
        ...state,
        createSavingsLoading: false,
        createSavingsSuccess: true,
        createSavingsFailure: false
      }
    case CREATE_SAVINGS_FAILURE:
      return {
        ...state,
        createSavingsLoading: false,
        createSavingsSuccess: false,
        createSavingsFailure: true
      }
    case DELETE_SAVINGS:
      console.log('DELETE SAVING')
      return {
        ...state,
        savingsAccounts: state.savingsAccounts.filter(item => item._id !== action.payload.id)
      }
    default:
      return state
  }
}
