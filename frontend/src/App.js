import React, { useContext, useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import NavBar from './components/NavBar';
import BasketPage from './pages/BasketPage';
import ProductPage from './pages/ProductPage';
import TypePage from './pages/TypePage';
import HomePage from './pages/HomePage';
import { USERLIST_ROUTE, BASKET_ROUTE, CATEGORY_ROUTE, 
         LOGIN_ROUTE, REGISTER_ROUTE, SHOP_ROUTE, PERSONAL_ACCOUNT_ROUTE, 
         PRODUCT_ROUTE, TYPE_ROUTE, BRAND_ROUTE, ADMIN_ROUTE, 
         ORDER_ROUTE, COMPLETED_ROUTE, BRANDS_BY_CATEGORY_ROUTE,
         CATEGORIES_BY_BRAND_ROUTE, BRAND_INFO_ROUTE,
         CATEGORY_INFO_ROUTE, SEARCH_ROUTE,
         PURCHASES_STORY_ROUTE,
         ERROR_ROUTE,
         PRODUCTS_LIST_ROUTE
        } from './utils/const';
import CategoryPage from './pages/CategoryPage';
import BrandPage from './pages/BrandPage';
import Admin from './pages/Admin';
import OrderPage from './pages/OrderPage';
import Completed from './pages/Completed';
import { Context } from './index';
import { observer } from 'mobx-react-lite';
import { check } from './http/userApi';
import { Spinner } from 'react-bootstrap';
import UsersListPage from './pages/UsersListPage';
import BrandsByCategoryPage from './pages/BrandsByCategoryPage';
import CategoriesByBrandPage from './pages/CategoriesByBrandPage';
import BrandInfoPage from './pages/BrandInfoPage';
import CategoryInfoPage from './pages/CategoryInfoPage';
import SearchPage from './pages/SearchPage';
import PurchasesStoryPage from './pages/PurchasesStoryPage';
import ErrorPage from './pages/ErrorPage';
import ProductsListPage from './pages/ProductsListPage';
import PersonalAccountPage from './pages/PersonalAccountPage';

const App = observer(() => {
  const {user} = useContext(Context)
  const [loading, setLoading] = useState(true)

  // useEffect(() => { 
  //   setTimeout(async () => {
  //     await check().then(data => {user.setLogin(data.login); user.setRole(data.role); user.setIsAuth(true); user.setIdUser(data.idUser)}).finally(() => setLoading(false))
  //   }, 1000)
  // }, [])

  useEffect(() => { 
    setTimeout(async () => {
      await check().then(data => {
        localStorage.setItem('accessToken', data.accessToken);
          user.setUser(data.user);
      }).finally(() => setLoading(false))
    }, 1000)
  })

  if (loading) {
    return <Spinner animation={'grow'}/>
  }

  return (
    <BrowserRouter>
      <NavBar/>
      <Routes>
        <Route exact path={SHOP_ROUTE} element={<HomePage/>}/>
        <Route exact path={PERSONAL_ACCOUNT_ROUTE} element={<PersonalAccountPage/>}/>
        <Route path={LOGIN_ROUTE} element={<Login/>}/>
        <Route path={REGISTER_ROUTE} element={<Register/>}/>
        <Route path={BASKET_ROUTE} element={<BasketPage/>}/>
        <Route path={CATEGORY_ROUTE} element={<CategoryPage/>}/>
        <Route path={PRODUCT_ROUTE} element={<ProductPage/>}/>
        <Route path={TYPE_ROUTE} element={<TypePage/>}/>
        <Route path={BRAND_ROUTE} element={<BrandPage/>}/>
        <Route path={ADMIN_ROUTE} element={<Admin/>}/>
        <Route path={ORDER_ROUTE} element={<OrderPage/>}/>
        <Route path={COMPLETED_ROUTE} element={<Completed/>}/>
        <Route path={USERLIST_ROUTE} element={<UsersListPage/>}/>
        <Route path={PRODUCTS_LIST_ROUTE} element={<ProductsListPage/>}/>
        <Route path={BRANDS_BY_CATEGORY_ROUTE} element={<BrandsByCategoryPage/>}/>
        <Route path={CATEGORIES_BY_BRAND_ROUTE} element={<CategoriesByBrandPage/>}/>
        <Route path={BRAND_INFO_ROUTE} element={<BrandInfoPage/>}/>
        <Route path={CATEGORY_INFO_ROUTE} element={<CategoryInfoPage/>}/>
        <Route path={SEARCH_ROUTE} element={<SearchPage/>}/>
        <Route path={PURCHASES_STORY_ROUTE} element={<PurchasesStoryPage/>}/>
        <Route path={ERROR_ROUTE} element={<ErrorPage/>}/>
      </Routes>
    </BrowserRouter>
  );
});

export default App;