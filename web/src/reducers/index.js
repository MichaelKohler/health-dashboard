import {
  FETCHED_HEALTH,
  FETCH_HEALTH,
  FAILED_FETCH_HEALTH,
  LOGIN_SUCCEEDED,
  LOGIN_FAILED,
  LOGOUT_SUCCEEDED,
  CIGARETTE_SUCCEEDED,
  CIGARETTE_FAILED,
  WEIGHT_SUCCEEDED,
  WEIGHT_FAILED,
  STAIRS_SUCCEEDED,
  STAIRS_FAILED,
  FETCHED_STATS,
  FAILED_FETCH_STATS,
  START_SUBMISSION,
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
    case CIGARETTE_SUCCEEDED:
      return Object.assign({}, state, {
        cigarettePostFailed: false,
        isSubmitting: false,
      });
    case CIGARETTE_FAILED:
      return Object.assign({}, state, {
        cigarettePostFailed: true,
        isSubmitting: false,
      });
    case WEIGHT_SUCCEEDED:
      return Object.assign({}, state, {
        weightPostFailed: false,
        isSubmitting: false,
      });
    case WEIGHT_FAILED:
      return Object.assign({}, state, {
        weightPostFailed: true,
        isSubmitting: false,
      });
    case STAIRS_SUCCEEDED:
      return Object.assign({}, state, {
        stairsPostFailed: false,
        isSubmitting: false,
      });
    case STAIRS_FAILED:
      return Object.assign({}, state, {
        stairsPostFailed: true,
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
    case START_SUBMISSION:
      return Object.assign({}, state, {
        isSubmitting: true,
      });
    default:
      return state;
  }
}
