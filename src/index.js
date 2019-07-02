import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react'
import { Router } from 'react-router-dom';
import store, { persistor } from './redux/store';
import history from './helpers/history';
import App from './App';

import './styles/base/base.css'
import './styles/index.css';
// import 'bootstrap/dist/css/bootstrap.css';

ReactDOM.render(
	<Provider store={store}>
    <PersistGate persistor={persistor}>
      <Router history={history}>
        <App />
      </Router>
    </PersistGate>
	</Provider>,
	document.getElementById('root')
);
registerServiceWorker();
