/** @file store/index.tsx
 *  @brief Redux store configuration function
 *
 *  @author Mike Brazier
 */

import { createStore } from 'redux';
import { initialState } from './../types/AppState';
import { CWAppReducer } from './../reducers';
import 'redux-devtools-extension';

export function configureStore(preloadedState = initialState) {
  return createStore(
    CWAppReducer,
    preloadedState,
    //these need to be removed during production
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
      (window as any).__REDUX_DEVTOOLS_EXTENSION__()
  );
}
