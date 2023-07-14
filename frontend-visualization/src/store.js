import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import io from 'socket.io-client';

// Action types
const CO2_MEASUREMENT = 'CO2_MEASUREMENT';

// Action creators
const co2Measurement = (co2Value) => ({
  type: CO2_MEASUREMENT,
  payload: co2Value,
});

// Socket.IO configuration
const socket = io('localhost:3000');

// Redux middleware for handling socket events
const socketMiddleware = (store) => (next) => (action) => {
  if (action.type === CO2_MEASUREMENT) {
    socket.emit('co2Measurement', action.payload);
  }
  return next(action);
};

// Initial state
const initialState = {
  co2Value: null,
  airQuality: null,
};

// Reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CO2_MEASUREMENT:
      const co2Value = action.payload;
      let airQuality;

      if (co2Value <= 1000) {
        airQuality = 'Good';
      } else if (co2Value <= 2000) {
        airQuality = 'Average';
      } else {
        airQuality = 'Bad';
      }

      return {
        ...state,
        co2Value,
        airQuality,
      };

    default:
      return state;
  }
};

// Create the Redux store
const store = createStore(reducer, applyMiddleware(thunk, socketMiddleware));

// Socket.IO event listener
socket.on('co2Measurement', (co2Value) => {
  store.dispatch(co2Measurement(co2Value));
});

export { store };
