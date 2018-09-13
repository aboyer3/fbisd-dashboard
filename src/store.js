import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {Reducer, initialState} from './reducers/reducer.js';
import { composeWithDevTools } from 'redux-devtools-extension';

export default function configureStore(initialState) {
  const composeEnhancers = composeWithDevTools({
    // Specify custom devTools options
  });
  return createStore(Reducer, initialState, composeEnhancers(
    applyMiddleware(thunk)
    // other store enhancers if any
  ));
}

