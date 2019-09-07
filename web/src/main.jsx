import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import App from './app.jsx';
import DataContainer from './data-container.jsx';

const store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={ store }>
        <DataContainer>
            <HashRouter>
                <App/>
            </HashRouter>
        </DataContainer>
    </Provider>,
    document.getElementById('root')
);
