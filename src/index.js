import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/lib/integration/react';

import { createBrowserHistory } from 'history';

import configureStore from './redux/configureStore';
import * as serviceWorker from './serviceWorker';

import App from './App';

import './styles/base/base.css'
import './styles/index.css';

const history = createBrowserHistory();
const store = configureStore(history);
const persistor = persistStore(store);

ReactDOM.render(
    <Provider store={ store }>
        <PersistGate persistor={ persistor }>
            <ConnectedRouter history={ history }>
                <App />
            </ConnectedRouter>
        </PersistGate>
    </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
