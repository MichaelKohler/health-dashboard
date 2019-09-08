export const FETCH_HEALTH = 'FETCH_HEALTH';

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
  // eslint-disable-next-line compat/compat
  return (dispatch) => Promise.all([fetchWithAuth('http://localhost:3333/cigarettes', 'GET'), fetchWithAuth('http://localhost:3333/weights', 'GET')])
  .then(([cigarettes, weights]) => {
    dispatch({
      type: FETCH_HEALTH,
      cigarettes,
      weights,
    });
  })
  .catch(() => {
    // ignore
  });
}
