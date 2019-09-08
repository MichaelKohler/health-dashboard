import {
  FETCHED_HEALTH,
  FETCH_HEALTH,
  FAILED_FETCH_HEALTH,
} from '../actions';

const initialState = {
  cigarettes: [],
  weights: [],
  isFetchingHealth: false,
  failedFetchingHealth: false,
};

// eslint-disable-next-line no-unused-vars
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCHED_HEALTH:
        // eslint-disable-next-line compat/compat
        return Object.assign({}, state, {
          cigarettes: action.cigarettes,
          weights: action.weights,
          isFetchingHealth: false,
        });
    case FETCH_HEALTH:
        // eslint-disable-next-line compat/compat
        return Object.assign({}, state, {
          isFetchingHealth: true,
        });
    case FAILED_FETCH_HEALTH:
        // eslint-disable-next-line compat/compat
        return Object.assign({}, state, {
          isFetchingHealth: false,
          failedFetchingHealth: true,
        });
    default:
      return state;
  }
}
