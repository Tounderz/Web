import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Button, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom';
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

const UserBar = observer(() => {
    const {user} = useContext(Context);
    const {product} = useContext(Context);
    const {general} = useContext(Context);
    const navigate = useNavigate();

    const generalClear = () => {
        general.setFieldNames([]);
        general.setFieldName('');
        general.setTypeSort('');
    }

    const signUp = () => {
        generalClear();
        navigate(REGISTER_ROUTE);
    }

    const logIn = () => {
        generalClear();
        navigate(LOGIN_ROUTE);
    }

    const logOut = async () => {
        const data = await logout();
            user.setUser(data.user);
            localStorage.removeItem('accessToken');
            generalClear();

            navigate(SHOP_ROUTE);
    }

    const basket = async () => {
        const data = await fetchBaskets(user.user.login, PAGE_FIRST);
            product.setBaskets(data.baskets);
            product.setTotalAmount(data.sum);
            product.setCountPages(data.countPages);
            generalClear();
            navigate(BASKET_ROUTE);
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
            generalClear();

            navigate(ADMIN_ROUTE);
    }

    const cabinet = async () => {
        const data = await fetchUser(user.user.login);
            user.setSelectedUser(data.user);
            generalClear();

        navigate(PERSONAL_ACCOUNT_ROUTE);
    }

    let menu;
    if (!user.user.isAuth) {
        menu = (
            <div>
                <Button
                    variant='link'
                    style={{
                        color: 'white'
                    }}
                    onClick={logIn}
                >
                    Sign In
                </Button>
                <Button
                    variant='outline-secondary'
                    onClick={signUp}
                >
                    Sign Up
                </Button>
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
                // <ul className='navbar-nav me-auto mb-2 mb-md-0'>
                //         <Link 
                //             className='nav-link'
                //             to={BASKET_ROUTE}
                //             onClick={basket}
                //         >
                //             Basket
                //         </Link>
                //         <Link
                //             className='nav-link'
                //             to={PERSONAL_ACCOUNT_ROUTE}
                //             onClick={cabinet}
                //         >
                //             Cabinet
                //         </Link>
                //         <Link
                //             className='nav-link'
                //             to={SHOP_ROUTE}
                //             onClick={logOut}
                //         >
                //             Logout
                //         </Link>
                // </ul>
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
                // <ul className='navbar-nav me-auto mb-2 mb-md-0'>
                //         <Link
                //             className='nav-link'
                //             to={ADMIN_ROUTE}
                //             onClick={admin}
                //         >
                //             <SvgSelector id='admin'/>                            
                //         </Link>
                //         <Link
                //             className='nav-link'
                //             to={PERSONAL_ACCOUNT_ROUTE}
                //             onClick={cabinet}
                //         >
                //             <SvgSelector id='account'/>  
                //         </Link>
                //         <Link
                //             className='nav-link'
                //             to={SHOP_ROUTE}
                //             onClick={logOut}
                //         >
                //             Logout
                //         </Link>
                // </ul>
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