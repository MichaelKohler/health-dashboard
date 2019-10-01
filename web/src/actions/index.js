import history from '../history';

export const FETCHED_HEALTH = 'FETCHED_HEALTH';
export const FETCH_HEALTH = 'FETCH_HEALTH';
export const FAILED_FETCH_HEALTH = 'FAILED_FETCH_HEALTH';
export const LOGIN_SUCCEEDED = 'LOGIN_SUCCEEDED';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGOUT_SUCCEEDED = 'LOGOUT_SUCCEEDED';
export const CIGARETTE_SUCCEEDED = 'CIGARETTE_SUCCEEDED';
export const CIGARETTE_FAILED = 'CIGARETTE_FAILED';
export const WEIGHT_SUCCEEDED = 'WEIGHT_SUCCEEDED';
export const WEIGHT_FAILED = 'WEIGHT_FAILED';
export const FETCH_STATS = 'FETCH_STATS';
export const FETCHED_STATS = 'FETCHED_STATS';
export const FAILED_FETCH_STATS = 'FAILED_FETCH_STATS';

function fetchWithAuth(endpoint, method, body) {
  const url = __BACKEND_URL__ + endpoint; // eslint-disable-line no-undef
  const token = localStorage.getItem('jwt');

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
        return rawResponse.json();
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

    Promise.all([fetchWithAuth('/cigarettes', 'GET'), fetchWithAuth('/weights', 'GET')])
      .then(([cigarettes, weights]) => dispatch({
        type: FETCHED_HEALTH,
        cigarettes,
        weights,
      }))
      .catch(() => {
        dispatch({
          type: FAILED_FETCH_HEALTH,
        });
      });
  };
}

export function fetchStats() {
  return (dispatch) => {
    dispatch({
      type: FETCH_STATS,
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
        fetchHealth()(dispatch);
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

export function postCigarette() {
  return (dispatch) => {
    event.preventDefault();

    const rolled = document.querySelector('#rolled').checked;

    fetchWithAuth('/cigarettes', 'POST', {
      rolled,
    })
      .then(() => fetchHealth()(dispatch))
      .then(() => {
        dispatch({
          type: CIGARETTE_SUCCEEDED,
        });

        history.push('/cigarettes');
      })
      .catch(() => {
        dispatch({
          type: CIGARETTE_FAILED,
        });
      });
  };
}

export function postWeight() {
  return (dispatch) => {
    event.preventDefault();

    const weight = document.querySelector('#weight').value;

    fetchWithAuth('/weights', 'POST', {
      weight,
    })
      .then(() => fetchHealth()(dispatch))
      .then(() => {
        dispatch({
          type: WEIGHT_SUCCEEDED,
        });

        history.push('/weight');
      })
      .catch(() => {
        dispatch({
          type: WEIGHT_FAILED,
        });
      });
  };
}
