import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ProductStore from './store/ProductStore';
import UserStore from './store/UserStore';
import ErrorStore from './store/ErrorStore';
import AuthStore from './store/AuthStore';
import RemoveStore from './store/RemoveStore';
import CategoryStore from './store/CategoryStore';
import BrandStore from './store/BrandStore';
import TypeStore from './store/TypeStore';
import OrderStore from './store/OrderStore';
import PaymentMethodsStore from './store/PaymentMethodsStore';
import CartStore from './store/CartStore';
import SearchStore from './store/SearchStore';
import PageStore from './store/PageStore';
import SortStore from './store/SortStore';

export const Context = createContext(null)

ReactDOM.render(
  <Context.Provider value={{
    product: new ProductStore(),
    category: new CategoryStore(),
    brand: new BrandStore(),
    type: new TypeStore(),
    user: new UserStore(),
    error: new ErrorStore(),
    auth: new AuthStore(),
    sort: new SortStore(),
    paymentMethod: new PaymentMethodsStore(),
    cart: new CartStore(),
    order: new OrderStore(),
    remove: new RemoveStore(),
    search: new SearchStore(),
    page: new PageStore()
  }}>
  <App />
  </Context.Provider>,
  document.getElementById('root')
);