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
};

// eslint-disable-next-line no-unused-vars
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCHED_HEALTH:
      return Object.assign({}, state, {
        cigarettes: action.cigarettes,
        weights: action.weights,
        stairs: action.stairs,
        isFetchingHealth: false,
        failedFetchingHealth: false,
      });
    case FETCH_HEALTH:
      return Object.assign({}, state, {
        isFetchingHealth: true,
      });
    case FAILED_FETCH_HEALTH:
      return Object.assign({}, state, {
        isFetchingHealth: false,
        failedFetchingHealth: true,
      });
    case LOGIN_SUCCEEDED:
      return Object.assign({}, state, {
        isLoggedIn: true,
        loginFailed: false,
      });
    case LOGIN_FAILED:
      return Object.assign({}, state, {
        isLoggedIn: false,
        loginFailed: true,
      });
    case LOGOUT_SUCCEEDED:
      return Object.assign({}, state, {
        isLoggedIn: false,
      });
    case START_SUBMISSION:
      return Object.assign({}, state, {
        isSubmitting: true,
      });
    case SUBMISSION_SUCCEEDED:
      return Object.assign({}, state, {
        postFailed: false,
        isSubmitting: false,
      });
    case SUBMISSION_FAILED:
      return Object.assign({}, state, {
        postFailed: true,
        isSubmitting: false,
      });
    case FETCHED_STATS:
      return Object.assign({}, state, {
        stats: action.stats,
        statsFailed: false,
      });
    case FAILED_FETCH_STATS:
      return Object.assign({}, state, {
        statsFailed: true,
      });
    default:
      return state;
  }
}
