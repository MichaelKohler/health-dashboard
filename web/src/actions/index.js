import history from '../history';

export const FETCHED_HEALTH = 'FETCHED_HEALTH';
export const FETCH_HEALTH = 'FETCH_HEALTH';
export const FAILED_FETCH_HEALTH = 'FAILED_FETCH_HEALTH';
export const LOGIN_SUCCEEDED = 'LOGIN_SUCCEEDED';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGOUT_SUCCEEDED = 'LOGOUT_SUCCEEDED';
export const START_SUBMISSION = 'START_SUBMISSION';
export const SUBMISSION_SUCCEEDED = 'SUBMISSION_SUCCEEDED';
export const SUBMISSION_FAILED = 'SUBMISSION_FAILED';
export const FETCH_STATS = 'FETCH_STATS';
export const FETCHED_STATS = 'FETCHED_STATS';
export const FAILED_FETCH_STATS = 'FAILED_FETCH_STATS';
export const SNACKBAR_SHOW = 'SNACKBAR_SHOW';
export const SNACKBAR_CLEAR = 'SNACKBAR_CLEAR';

function fetchWithAuth(endpoint, method, body) {
  let url = __BACKEND_URL__ + endpoint; // eslint-disable-line no-undef
  const token = localStorage.getItem('jwt');

  if (method === 'DELETE' && typeof body.id !== 'undefined') {
    url = `${url}/${body.id}`;
  }

  return fetch(url, {
      method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify(body),
    })
    .then((rawResponse) => {
      if (rawResponse.status === 401) {
        history.push('/login');
        throw new Error('NOT_AUTHORIZED');
      }

      if (rawResponse.status === 200) {
        return rawResponse.json() // eslint-disable-line promise/no-nesting
          .catch(() => ({}));
      }

      if (rawResponse.status === 201) {
        return {};
      }

      throw new Error(`FAILED: ${rawResponse.status}`);
    });
}

export function fetchHealth() {
  return (dispatch) => {
    dispatch({
      type: FETCH_HEALTH,
    });

    Promise.all([
      fetchWithAuth('/cigarettes?limit=150', 'GET'),
      fetchWithAuth('/weights?limit=100', 'GET'),
      fetchWithAuth('/stairs?limit=100', 'GET'),
    ])
      .then(([
        cigarettes,
        weights,
        stairs,
      ]) => dispatch({
        type: FETCHED_HEALTH,
        cigarettes,
        weights,
        stairs,
      }))
      .catch(() => {
        dispatch({
          type: FAILED_FETCH_HEALTH,
        });
      });

    fetchWithAuth('/stats', 'GET')
      .then((stats) => dispatch({
        type: FETCHED_STATS,
        stats,
      }))
      .catch(() => {
        dispatch({
          type: FAILED_FETCH_STATS,
        });
      });
  };
}

export function login() {
  return (dispatch) => {
    event.preventDefault();

    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    fetch(`${__BACKEND_URL__}/auth/login`, { // eslint-disable-line no-undef
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((rawResponse) => rawResponse.json())
      .then((response) => {
        if (!response.token) {
          throw new Error('LOGIN_FAILED');
        }

        localStorage.setItem('jwt', response.token);
        dispatch(fetchHealth());
        history.push('/');
        return dispatch({
          type: LOGIN_SUCCEEDED,
        });
      })
      .catch(() => {
        dispatch({
          type: LOGIN_FAILED,
        });
      });
  };
}

export function logout() {
  return (dispatch) => {
    event.preventDefault();
    localStorage.removeItem('jwt');
    history.push('/');
    dispatch({
      type: LOGOUT_SUCCEEDED,
    });
  };
}

function add(dispatch, endpoint, body, frontendPath) {
  dispatch({
    type: START_SUBMISSION,
  });

  fetchWithAuth(endpoint, 'PUT', body)
    .then(() => dispatch(fetchHealth()))
    .then(() => {
      dispatch({
        type: SUBMISSION_SUCCEEDED,
      });

      dispatch({
        type: SNACKBAR_SHOW,
        message: 'Successfully added!',
        snackbarType: 'success',
      });

      history.push(frontendPath);

      return true;
    })
    .catch(() => {
      dispatch({
        type: SUBMISSION_FAILED,
      });

      dispatch({
        type: SNACKBAR_SHOW,
        message: 'Adding failed!',
        snackbarType: 'error',
      });
    });
}

export function addCigarette() {
  return (dispatch) => {
    event.preventDefault();

    const rolled = document.querySelector('#rolled').checked;
    add(dispatch, '/cigarettes', { rolled }, '/cigarettes');
  };
}

export function addWeight() {
  return (dispatch) => {
    event.preventDefault();

    const weight = document.querySelector('#weight').value;
    add(dispatch, '/weights', { weight }, '/weight');
  };
}

export function addStairs() {
  return (dispatch) => {
    event.preventDefault();

    const stairs = document.querySelector('#stairs').value;
    add(dispatch, '/stairs', { stairs }, '/stairs');
  };
}

function deleteRemotely(endpoint, query, dispatch) {
  fetchWithAuth(endpoint, 'DELETE', query)
    .then(() => dispatch({
      type: SNACKBAR_SHOW,
      message: 'Successfully deleted!',
      snackbarType: 'success',
    }))
    .then(() => dispatch(fetchHealth()))
    .catch(() => {
      dispatch({
        type: SUBMISSION_FAILED,
      });

      dispatch({
        type: SNACKBAR_SHOW,
        message: 'Deletion failed!',
        snackbarType: 'error',
      });
    });
}

export function deleteCigarette(id) {
  return (dispatch) => {
    event.preventDefault();
    deleteRemotely('/cigarettes', { id }, dispatch);
  };
}

export function deleteWeight(id) {
  return (dispatch) => {
    event.preventDefault();
    deleteRemotely('/weights', { id }, dispatch);
  };
}

export function deleteStairs(id) {
  return (dispatch) => {
    event.preventDefault();
    deleteRemotely('/stairs', { id }, dispatch);
  };
}

export function clearSnackbar() {
  return (dispatch) => {
    dispatch({
      type: SNACKBAR_CLEAR,
    });
  };
}
