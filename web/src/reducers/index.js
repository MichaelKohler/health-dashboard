import {
  FETCHED_HEALTH,
  FETCH_HEALTH,
  FAILED_FETCH_HEALTH,
  LOGIN_SUCCEEDED,
  LOGIN_FAILED,
  LOGOUT_SUCCEEDED,
  START_SUBMISSION,
  SUBMISSION_SUCCEEDED,
  SUBMISSION_FAILED,
  FETCHED_STATS,
  FAILED_FETCH_STATS,
  SNACKBAR_SHOW,
  SNACKBAR_CLEAR,
} from '../actions';

const initialState = {
  cigarettes: [],
  weights: [],
  stairs: [],
  isFetchingHealth: false,
  failedFetchingHealth: false,
  isLoggedIn: !!localStorage.getItem('jwt'),
  loginFailed: false,
  stats: {},
  isSubmitting: false,
  snackbarOpen: false,
};

// eslint-disable-next-line no-unused-vars
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCHED_HEALTH:
      return {
        ...state,
        cigarettes: action.cigarettes,
        weights: action.weights,
        stairs: action.stairs,
        isFetchingHealth: false,
        failedFetchingHealth: false,
      };
    case FETCH_HEALTH:
      return {
        ...state,
        isFetchingHealth: true,
      };
    case FAILED_FETCH_HEALTH:
      return {
        ...state,
        isFetchingHealth: false,
        failedFetchingHealth: true,
      };
    case LOGIN_SUCCEEDED:
      return {
        ...state,
        isLoggedIn: true,
        loginFailed: false,
      };
    case LOGIN_FAILED:
      return {
        ...state,
        isLoggedIn: false,
        loginFailed: true,
      };
    case LOGOUT_SUCCEEDED:
      return {
        ...state,
        isLoggedIn: false,
      };
    case START_SUBMISSION:
      return {
        ...state,
        isSubmitting: true,
      };
    case SUBMISSION_SUCCEEDED:
      return {
        ...state,
        submissionFailed: false,
        isSubmitting: false,
      };
    case SUBMISSION_FAILED:
      return {
        ...state,
        submissionFailed: true,
        isSubmitting: false,
      };
    case FETCHED_STATS:
      return {
        ...state,
        stats: action.stats,
        statsFailed: false,
      };
    case FAILED_FETCH_STATS:
      return {
        ...state,
        statsFailed: true,
      };
    case SNACKBAR_SHOW:
      return {
        ...state,
        snackbarOpen: true,
        snackbarMessage: action.message,
        snackbarType: action.snackbarType,
      };
    case SNACKBAR_CLEAR:
      return {
        ...state,
        snackbarOpen: false,
      };
    default:
      return state;
  }
}
