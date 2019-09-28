import history from '../history';

export const FETCHED_HEALTH = 'FETCHED_HEALTH';
export const FETCH_HEALTH = 'FETCH_HEALTH';
export const FAILED_FETCH_HEALTH = 'FAILED_FETCH_HEALTH';
export const LOGIN_SUCCEEDED = 'LOGIN_SUCCEEDED';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGOUT_SUCCEEDED = 'LOGOUT_SUCCEEDED';

function fetchWithAuth(endpoint, method) {
  const url = __BACKEND_URL__ + endpoint; // eslint-disable-line no-undef
  const token = localStorage.getItem('jwt');

  return fetch(url, {
      method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: token,
      },
    })
    .then((rawResponse) => {
      if (rawResponse.status === 401) {
        history.push('/login');
        throw new Error('NOT_AUTHORIZED');
      }

      return rawResponse.json();
    });
}

export function fetchHealth() {
  return (dispatch) => {
    dispatch({
      type: FETCH_HEALTH,
    });

    Promise.all([fetchWithAuth('/cigarettes', 'GET'), fetchWithAuth('/weights', 'GET')])
    .then(([cigarettes, weights]) => {
      dispatch({
        type: FETCHED_HEALTH,
        cigarettes,
        weights,
      });
    })
    .catch(() => {
      dispatch({
        type: FAILED_FETCH_HEALTH,
      });
    });
  };
}

export function refetch() {
  return fetchHealth();
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
      refetch();
      history.push('/');
      dispatch({
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
