/** @file store/index.tsx
 *  @brief Redux store configuration function
 *
 *  @author Mike Brazier
 */

import { createStore } from 'redux';
import { initialState } from './../types/AppState';
import { CWAppReducer } from './../reducers';

export function configureStore(preloadedState = initialState) {
  return createStore(CWAppReducer, preloadedState);
}
