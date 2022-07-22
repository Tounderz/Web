import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ProductStore from './store/ProductStore';
import UserStore from './store/UserStore';
import ErrorStore from './store/ErrorStore';
import AuthStore from './store/AuthStore';

export const Context = createContext(null)

ReactDOM.render(
  <Context.Provider value={{
    product: new ProductStore(),
    user: new UserStore(),
    error: new ErrorStore(),
    auth: new AuthStore()
  }}>
  <App />
  </Context.Provider>,
  document.getElementById('root')
);