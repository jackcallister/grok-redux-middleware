import React from 'react';
import { createStore, compose } from 'redux';
import { Provider } from 'react-redux';
import App from './components/app';
import behindTheCurtain from './middleware/behindTheCurtain';
import anotherLogger from './middleware/anotherLogger';
import reducers from './reducers';

function applyMiddleware(...middlewares) {
  return (next) => (reducer, initialState) => {
    var store = next(reducer, initialState);
    var dispatch = store.dispatch;
    var chain = [];

    chain = middlewares.map(middleware => middleware({
      getState: store.getState,
      dispatch: (action) => dispatch(action)
    }));
    dispatch = compose(...chain)(store.dispatch);

    console.log('next dispatch', dispatch)

    return { ...store, dispatch };
  };
}

const store = applyMiddleware(anotherLogger, behindTheCurtain)(createStore)(reducers);

console.log('store.dispatch', store.dispatch)

document.addEventListener('DOMContentLoaded', () => {
  React.render(
    <Provider store={store}>
    { () => <App /> }
    </Provider>,
    document.getElementById('app')
  );
});
