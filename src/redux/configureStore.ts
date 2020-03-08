import {applyMiddleware, compose,createStore} from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';

import {rootReducer} from './reducers';
import {initialState} from './reducers/initialState';

declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools

export const store = createStore(
	rootReducer,
	initialState,
	composeEnhancers(applyMiddleware(thunk, reduxImmutableStateInvariant()))
);
