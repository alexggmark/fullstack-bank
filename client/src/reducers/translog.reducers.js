import {
  POPULATE_TRANSLOG_DATA,
  POPULATE_TRANSLOG_LOADING,
  POPULATE_TRANSLOG_SUCCESS,
  POPULATE_TRANSLOG_FAILURE
} from '../_constants/translog.constants'

const initialState = {
  translogs: [],
  populateTranslogLoading: false,
  populateTranslogFailure: false,
  populateTranslogSuccess: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case POPULATE_TRANSLOG_DATA:
      return {
        ...state,
        translogs: [
          ...state.translogs,
          action.payload
        ]
      }
    case POPULATE_TRANSLOG_LOADING:
      return {
        ...state,
        translogs: [],
        populateTranslogLoading: true,
        populateTranslogFailure: false,
        populateTranslogSuccess: false
      }
    case POPULATE_TRANSLOG_SUCCESS:
      return {
        ...state,
        populateTranslogLoading: false,
        populateTranslogFailure: false,
        populateTranslogSuccess: true
      }
    case POPULATE_TRANSLOG_FAILURE:
      return {
        ...state,
        populateTranslogLoading: false,
        populateTranslogFailure: true,
        populateTranslogSuccess: false
      }
    default:
      return state
  }
}