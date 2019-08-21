import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import App from './App';
import { configureStore } from './store';
import { emptyAppState } from './types/AppState';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const store = configureStore(emptyAppState);
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
