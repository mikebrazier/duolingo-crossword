/** @file LocalStorage.tsx
 *  @brief Functions for persisting AppState into Browser LocalStorage
 *
 *  @author Mike Brazier
 */
import { AppState } from './AppState';

/**
 * Loads a state.  Returns undefined on localStorage.getItem() fail,
 * throws error on JSON.parse() failure
 *
 * @return     {<type>}  { description_of_the_return_value }
 */
export const loadState = (): AppState | undefined => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

/**
 * Saves a state.  Only logs to console whether save was successful or not
 *
 * @return     {<type>}  { description_of_the_return_value }
 */
export const saveState = (state: AppState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
    console.log('save state successful');
  } catch (err) {
    console.log('save state error', err);
  }
};
