import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import history from './history';
import App from './app.jsx';
import DataContainer from './data-container.jsx';

const store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>
        <DataContainer>
            <Router history={history}>
                <App/>
            </Router>
        </DataContainer>
    </Provider>,
    document.getElementById('root')
);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js') // eslint-disable-line compat/compat
      .then((registration) => {
        console.log('ServiceWorker registration successful with scope: ', registration.scope); // eslint-disable-line no-console
      })
      .catch((err) => {
        console.log('ServiceWorker registration failed: ', err); // eslint-disable-line no-console
      });
  });
}

