export const FETCHED_HEALTH = 'FETCHED_HEALTH';
export const FETCH_HEALTH = 'FETCH_HEALTH';
export const FAILED_FETCH_HEALTH = 'FAILED_FETCH_HEALTH';

function fetchWithAuth(url, method) {
  const token = localStorage.getItem('jwt');

  // eslint-disable-next-line compat/compat
  return fetch(url, {
      method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: token,
      },
    })
    .then((rawResponse) => rawResponse.json());
}

export function fetchHealth() {
  return (dispatch) => {
    dispatch({
      type: FETCH_HEALTH,
    });

    // eslint-disable-next-line compat/compat
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
