```
// Accept any number of functions
export function applyMiddleware(...middlewares) {
  // Return one new function which expects next (the createStore func)
  return function (next) {

    // Return a new function which matches the createStore signature
    return function (reducer, initialState) {

      // Call the original createStore to get the store
      var store = next(reducer, initialState);
      // Get the dispatch function
      var dispatch = store.dispatch;

      // Start building a chain to hold the middleware
      var chain = [];

      // Call each middleware passing in the store signature
      // Wrap the dispatch function to call the original store
      // dispatch for use in the middleware at the top level
      chain = middlewares.map(middleware => middleware({
        getState: store.getState,
        dispatch: function(action) {
          return dispatch(action)
        }
      }));

      // With an array of middleware functions (each now expecting)
      // a dispatch (next) as an argument
      dispatch = compose(...chain)(store.dispatch);

      // Return the store signature with the now wrapped dispatch
      return { ...store, dispatch };
    }
  }
}

//----

// The createStore dispatch function (simplified)
function dispatch(action) {
  currentState = currentReducer(currentState, action);

  return action;
}
```