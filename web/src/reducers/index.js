import { FETCH_HEALTH } from '../actions';

const initialState = {
  cigarettes: [],
  weight: [],
};

// eslint-disable-next-line no-unused-vars
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_HEALTH:
        // eslint-disable-next-line compat/compat
        return Object.assign({}, state, {
          cigarettes: action.cigarettes,
        });
    default:
      return state;
  }
}
