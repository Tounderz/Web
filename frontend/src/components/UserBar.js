import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { fetchBaskets } from '../http/basketApi';
import { fetchBrands } from '../http/brandApi';
import { fetchCategories } from '../http/categoryApi';
import { fetchPaymentMethods } from '../http/paymentMethodsApi';
import { fetchTypes } from '../http/typeApi';
import { fetchUser, logout } from '../http/userApi';
import { Context } from '../index';
import { ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE,
         PAGE_FIRST, REGISTER_ROUTE, SHOP_ROUTE, 
         WELCOME_ROUTE 
        } from '../utils/const';

const UserBar = observer(() => {
    const {user} = useContext(Context)
    const {product} = useContext(Context)

    const logOut = async () => {
        const data = await logout();
            user.setUser(data.user);
            localStorage.removeItem('accessToken');
    }

    const basket = async () => {
        const data = await fetchBaskets(user.user.login, PAGE_FIRST);
            product.setBaskets(data.baskets);
            product.setTotalAmount(data.sum);
            product.setCountPages(data.countPages);
    }

    const admin = async () => {
        const dataType = await fetchTypes();
            product.setTypes(dataType.types);
        const dataCategory = await fetchCategories();
            product.setCategories(dataCategory.categories);
        const dataBrand = await fetchBrands();
            product.setBrands(dataBrand.brands);
        const dataPM = await fetchPaymentMethods();
            product.setPaymentMethods(dataPM.paymentMethods);
            product.setSelectedBrand({})
            product.setSelectedCategory({})
            product.setSelectedType({})
            product.setSelectedProduct({})
    }

    const cabinet = async () => {
        const data = await fetchUser(user.user.login);
            user.setSelectedUser(data.user);
    }

    let menu;
    if (!user.user.isAuth) {
        menu = (
            <ul className='navbar-nav me-auto mb-2 mb-md-0'>
                <Link
                    className='nav-link'
                    to={LOGIN_ROUTE}
                >
                    Login
                </Link>
                <Link
                    className='nav-link'
                    to={REGISTER_ROUTE}
                >
                    Register
                </Link>
            </ul>
        )
    } else {  
        if (user.user.role === 'user') {
            menu = (
                <ul className='navbar-nav me-auto mb-2 mb-md-0'>
                        <Link 
                            className='nav-link'
                            to={BASKET_ROUTE}
                            onClick={basket}
                        >
                            Basket
                        </Link>
                        <Link
                            className='nav-link'
                            to={WELCOME_ROUTE}
                            onClick={cabinet}
                        >
                            Cabinet
                        </Link>
                        <Link
                            className='nav-link'
                            to={SHOP_ROUTE}
                            onClick={logOut}
                        >
                            Logout
                        </Link>
                </ul>
            )
        } else {
            menu = (
                <ul className='navbar-nav me-auto mb-2 mb-md-0'>
                        <Link
                            className='nav-link'
                            to={ADMIN_ROUTE}
                            onClick={admin}
                        >
                            Admin
                        </Link>
                        <Link
                            className='nav-link'
                            to={WELCOME_ROUTE}
                            onClick={cabinet}
                        >
                            Cabinet
                        </Link>
                        <Link
                            className='nav-link'
                            to={SHOP_ROUTE}
                            onClick={logOut}
                        >
                            Logout
                        </Link>
                </ul>
            )
        }
    }

    return (
        <nav>
            {menu}
        </nav>
    );
});

export default UserBar;