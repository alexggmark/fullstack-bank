import {
  POPULATE_TRANSLOG_DATA,
  POPULATE_TRANSLOG_DATA_REVERSE,
  POPULATE_TRANSLOG_LOADING,
  POPULATE_TRANSLOG_SUCCESS,
  POPULATE_TRANSLOG_FAILURE,
  UPDATING_TRANSLOG_LOADING,
  UPDATING_TRANSLOG_SUCCESS,
  UPDATING_TRANSLOG_FAILURE,
  UPDATE_SINGLE_TRANSLOG
} from '../_constants/translog.constants'

const initialState = {
  translogs: [],
  populateTranslogLoading: false,
  populateTranslogFailure: false,
  populateTranslogSuccess: false,
  updatingTranslogLoading: false,
  updatingTranslogFailure: false,
  updatingTranslogSuccess: false,
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
    case POPULATE_TRANSLOG_DATA_REVERSE:
      return {
        ...state,
        translogs: [
          action.payload,
          ...state.translogs
        ]
      }
    case UPDATE_SINGLE_TRANSLOG:
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
    case UPDATING_TRANSLOG_LOADING:
      return {
        ...state,
        updatingTranslogLoading: true,
        updatingTranslogFailure: false,
        updatingTranslogSuccess: false,
      }
    case UPDATING_TRANSLOG_SUCCESS:
      return {
        ...state,
        updatingTranslogLoading: false,
        updatingTranslogFailure: false,
        updatingTranslogSuccess: true,
      }
    case UPDATING_TRANSLOG_FAILURE:
      return {
        ...state,
        updatingTranslogLoading: false,
        updatingTranslogFailure: true,
        updatingTranslogSuccess: false,
      }
    default:
      return state
  }
}