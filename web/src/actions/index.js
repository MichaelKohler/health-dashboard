import history from '../history';

export const FETCHED_HEALTH = 'FETCHED_HEALTH';
export const FETCH_HEALTH = 'FETCH_HEALTH';
export const FAILED_FETCH_HEALTH = 'FAILED_FETCH_HEALTH';

function fetchWithAuth(url, method) {
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

    Promise.all([fetchWithAuth('http://localhost:3333/cigarettes', 'GET'), fetchWithAuth('http://localhost:3333/weights', 'GET')])
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
