import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import buildStore from './store';

import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';

const store = buildStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
