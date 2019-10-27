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
export const STAIRS_SUCCEEDED = 'STAIRS_SUCCEEDED';
export const STAIRS_FAILED = 'STAIRS_FAILED';
export const FETCH_STATS = 'FETCH_STATS';
export const FETCHED_STATS = 'FETCHED_STATS';
export const FAILED_FETCH_STATS = 'FAILED_FETCH_STATS';
export const START_SUBMISSION = 'START_SUBMISSION';

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
        return rawResponse.json()
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

    Promise.all([fetchWithAuth('/cigarettes', 'GET'), fetchWithAuth('/weights', 'GET'), fetchWithAuth('/stairs', 'GET')])
      .then(([cigarettes, weights, stairs]) => dispatch({
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
  };
}

export function fetchStats() {
  return (dispatch) => {
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

export function fetchAll(dispatch) {
  fetchHealth()(dispatch);
  fetchStats()(dispatch);
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
        fetchAll(dispatch);
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

    dispatch({
      type: START_SUBMISSION,
    });

    fetchWithAuth('/cigarettes', 'POST', {
      rolled,
    })
      .then(() => fetchAll(dispatch))
      .then(() => {
        dispatch({
          type: CIGARETTE_SUCCEEDED,
        });

        history.push('/cigarettes');

        return true;
      })
      .catch(() => {
        dispatch({
          type: CIGARETTE_FAILED,
        });
      });
  };
}

export function deleteCigarette(id) {
  return (dispatch) => {
    event.preventDefault();

    fetchWithAuth('/cigarettes', 'DELETE', {
      id,
    })
      .then(() => fetchAll(dispatch))
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

    dispatch({
      type: START_SUBMISSION,
    });

    const weight = document.querySelector('#weight').value;

    fetchWithAuth('/weights', 'POST', {
      weight,
    })
      .then(() => fetchAll(dispatch))
      .then(() => {
        dispatch({
          type: WEIGHT_SUCCEEDED,
        });

        history.push('/weight');

        return true;
      })
      .catch(() => {
        dispatch({
          type: WEIGHT_FAILED,
        });
      });
  };
}

export function deleteWeight(id) {
  return (dispatch) => {
    event.preventDefault();

    fetchWithAuth('/weights', 'DELETE', {
      id,
    })
      .then(() => fetchAll(dispatch))
      .catch(() => {
        dispatch({
          type: WEIGHT_FAILED,
        });
      });
  };
}

export function postStairs() {
  return (dispatch) => {
    event.preventDefault();

    dispatch({
      type: START_SUBMISSION,
    });

    const stairs = document.querySelector('#stairs').value;

    fetchWithAuth('/stairs', 'POST', {
      stairs,
    })
      .then(() => fetchAll(dispatch))
      .then(() => {
        dispatch({
          type: STAIRS_SUCCEEDED,
        });

        history.push('/stairs');

        return true;
      })
      .catch(() => {
        dispatch({
          type: STAIRS_FAILED,
        });
      });
  };
}

export function deleteStairs(id) {
  return (dispatch) => {
    event.preventDefault();

    fetchWithAuth('/stairs', 'DELETE', {
      id,
    })
      .then(() => fetchAll(dispatch))
      .catch(() => {
        dispatch({
          type: STAIRS_FAILED,
        });
      });
  };
}
