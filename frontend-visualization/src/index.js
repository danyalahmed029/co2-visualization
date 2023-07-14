import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import CO2Visualization from './App';

ReactDOM.render(
  <Provider store={store}>
    <CO2Visualization />
  </Provider>,
  document.getElementById('root')
);