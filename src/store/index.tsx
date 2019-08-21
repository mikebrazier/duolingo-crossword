import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { AppState, initialState } from './../types/AppState';
import { CWAppReducer } from './../reducers';

export function configureStore(preloadedState = initialState) {
  return createStore(CWAppReducer, preloadedState);
}
