import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { NavDropdown } from 'react-bootstrap'
import { useNavigate } from 'react-router';
import { fetchBaskets } from '../http/basketApi';
import { fetchBrands } from '../http/brandApi';
import { fetchCategories } from '../http/categoryApi';
import { fetchPaymentMethods } from '../http/paymentMethodsApi';
import { fetchTypes } from '../http/typeApi';
import { fetchUser, logout } from '../http/userApi';
import { Context } from '../index';
import { ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE,
         PAGE_FIRST, REGISTER_ROUTE, SHOP_ROUTE, 
         PERSONAL_ACCOUNT_ROUTE 
        } from '../utils/const';
import { SvgSelector } from './Svg/SvgSelector';
import '../css/NavBar.css'
import { Link } from 'react-router-dom';

const UserBar = observer(() => {
    const {user} = useContext(Context);
    const {product} = useContext(Context);
    const {paymentMethod} = useContext(Context);
    const {cart} = useContext(Context);
    const {page} = useContext(Context);
    const {brand} = useContext(Context);
    const {category} = useContext(Context);
    const {type} = useContext(Context);
    const {sort} = useContext(Context);
    const navigate = useNavigate();

    const sortClear = () => {
        sort.setFieldNames([]);
        sort.setFieldName('');
        sort.setTypeSort('');
    }

    const logOut = async () => {
        const data = await logout();
            user.setUser(data.user);
            localStorage.removeItem('accessToken');
            sortClear();

            navigate(SHOP_ROUTE);
    }

    const basket = async () => {
        const data = await fetchBaskets(user.user.login, PAGE_FIRST);
            cart.setBaskets(data.baskets);
            cart.setTotalAmount(data.sum);
            page.setCountPages(data.countPages);
            sortClear();
            navigate(BASKET_ROUTE);
    }

    const admin = async () => {
        const dataType = await fetchTypes();
            type.setTypes(dataType.types);
        const dataCategory = await fetchCategories();
            category.setCategories(dataCategory.categories);
        const dataBrand = await fetchBrands();
            brand.setBrands(dataBrand.brands);
        const dataPM = await fetchPaymentMethods();
            paymentMethod.setPaymentMethods(dataPM.paymentMethods);
            brand.setSelectedBrand({})
            category.setSelectedCategory({})
            type.setSelectedType({})
            product.setSelectedProduct({})
            sortClear();

            navigate(ADMIN_ROUTE);
    }

    const cabinet = async () => {
        const data = await fetchUser(user.user.login);
            user.setSelectedUser(data.user);
            sortClear();

        navigate(PERSONAL_ACCOUNT_ROUTE);
    }

    let menu;
    if (!user.user.isAuth) {
        menu = (
            <div className='div-sign'>
                <Link
                    className='sign navbar-brand'
                    to={LOGIN_ROUTE}
                    onClick={sortClear}
                >
                    Sign In
                </Link>
                <Link
                    className='sign navbar-brand'
                    to={REGISTER_ROUTE}
                    onClick={sortClear}
                >
                    Sign Up
                </Link>
            </div>
        )
    } else {  
        if (user.user.role === 'user') {
            menu = (
                <NavDropdown
                    title={<SvgSelector id='account'/>}
                    id='collasible-nav-dropdown'
                    menuVariant='dark'
                    style={{
                        color: 'white',
                        cursor: 'pointer'
                    }}
                >
                    <NavDropdown.Item
                        onClick={cabinet}
                    >
                        Account
                    </NavDropdown.Item>
                    <NavDropdown.Item 
                        onClick={basket}
                    >
                        Basket
                    </NavDropdown.Item>
                    <NavDropdown.Divider/>
                    <NavDropdown.Item
                        onClick={logOut}
                    >
                        Logout
                    </NavDropdown.Item>
                </NavDropdown>
            )
        } else {
            menu = (
                <NavDropdown
                    title={<SvgSelector id='admin'/>}
                    id='collasible-nav-dropdown'
                    menuVariant='dark'
                    style={{
                        color: 'white',
                        cursor: 'pointer'
                    }}
                >
                    <NavDropdown.Item 
                        onClick={admin}
                    >
                        Admin
                    </NavDropdown.Item>
                    <NavDropdown.Item
                        onClick={cabinet}
                    >
                        Account
                    </NavDropdown.Item>
                    <NavDropdown.Divider/>
                    <NavDropdown.Item
                        onClick={logOut}
                    >
                        Logout
                    </NavDropdown.Item>
                </NavDropdown>
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