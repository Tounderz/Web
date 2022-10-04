import React, { useContext } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Context } from '../index';
import { useNavigate } from "react-router";
import Remove from '../components/models/remove/Remove';
import Create from '../components/models/create/Create';
import Update from '../components/models/update/Update';
import { FIELD_NAMES_PRODUCTS, FIELD_NAMES_USERS_SEARCH, PAGE_FIRST, PRODUCTS_LIST_ROUTE, USERLIST_ROUTE } from '../utils/const';
import { fetchUsers } from '../http/userApi';
import { fetchProducts } from '../http/productApi';
import '../css/AdminPage.css'
import { observer } from 'mobx-react-lite';

const Admin = observer(() => {
    const {user} = useContext(Context);
    const {product} = useContext(Context);
    const {page} = useContext(Context);
    const {messages} = useContext(Context);
    const {search} = useContext(Context);
    const {sort} = useContext(Context);
    const navigate = useNavigate();

    const cleanSearchAndSort = () => {
        search.setSearchBy('');
        search.setSelectedSearchParameter('');
        sort.setFieldNames([]);
        sort.setFieldName('');
        sort.setTypeSort('');
        messages.setMessageError('');
    }

    const pageParameters = (countPages) => {
        page.setCurrentPage(PAGE_FIRST);
        page.setCountPages(countPages);
    }

    const userList = async () => {
        const data = await fetchUsers(PAGE_FIRST);
            user.setUsersList(data.usersList);
            pageParameters(data.countPages);
            search.setFieldNames(FIELD_NAMES_USERS_SEARCH);
            cleanSearchAndSort();
            navigate(USERLIST_ROUTE);
    }

    const productList = async () => {
        const data = await fetchProducts(PAGE_FIRST);
            product.setProducts(data.products);
            pageParameters(data.countPages);
            search.setFieldNames(FIELD_NAMES_PRODUCTS);
            cleanSearchAndSort();
            navigate(PRODUCTS_LIST_ROUTE);
    }

    return (
        <Row className='adminFonPage'>
            <Col md={2}>
                <Create/>
            </Col>
            <Col md={2}>
                <Update/>
            </Col>
            <Col md={2}>
                <Remove/>
            </Col>
            <Row className='rowAdminButtons'>
                <Button 
                    className='buttonUserListAdmin'
                    variant='outline-success'
                    onClick={userList}
                >
                    User list
                </Button>
                <Button
                    className='buttonProductListAdmin'
                    variant='outline-primary'
                    onClick={productList}
                >
                    Product List
                </Button>
            </Row>
        </Row>
    )
});

export default Admin;