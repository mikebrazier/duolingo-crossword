import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { AppState, initialState } from './../types/AppState';
import { CWAppReducer } from './../reducers';

const composeEnhancers = composeWithDevTools({
  // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});

export function configureStore(preloadedState = initialState) {
  return createStore(CWAppReducer, preloadedState, composeEnhancers());
}
