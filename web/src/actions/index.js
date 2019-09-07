export const FETCH_HEALTH = 'FETCH_HEALTH';

export function fetchHealth() {
  return (dispatch) => {
    const token = localStorage.getItem('jwt');

    // eslint-disable-next-line compat/compat
    return fetch('http://localhost:3333/cigarettes', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: token,
      },
    })
    .then((rawResponse) => rawResponse.json())
    .then((response) => {
      dispatch({
        type: FETCH_HEALTH,
        cigarettes: response,
      });
    })
    .catch(() => {
      // ignore
    });
  };
}
