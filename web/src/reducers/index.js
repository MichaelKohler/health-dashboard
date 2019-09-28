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
} from '../actions';

const initialState = {
  cigarettes: [],
  weights: [],
  isFetchingHealth: false,
  failedFetchingHealth: false,
  isLoggedIn: !!localStorage.getItem('jwt'),
  loginFailed: false,
};

// eslint-disable-next-line no-unused-vars
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCHED_HEALTH:
      return Object.assign({}, state, {
        cigarettes: action.cigarettes,
        weights: action.weights,
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
      });
    case CIGARETTE_FAILED:
      return Object.assign({}, state, {
        cigarettePostFailed: true,
      });
    case WEIGHT_SUCCEEDED:
      return Object.assign({}, state, {
        weightPostFailed: false,
      });
    case WEIGHT_FAILED:
      return Object.assign({}, state, {
        weightPostFailed: true,
      });
    default:
      return state;
  }
}
