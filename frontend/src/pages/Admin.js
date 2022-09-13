import React, { useContext, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Context } from '../index';
import { useNavigate } from "react-router";
import Remove from '../components/models/remove/Remove';
import Create from '../components/models/create/Create';
import Update from '../components/models/update/Update';
import { PAGE_FIRST, PRODUCTS_LIST_ROUTE, USERLIST_ROUTE } from '../utils/const';
import { fetchUsers } from '../http/userApi';
import { fetchProducts } from '../http/productApi';
import '../css/AdminPage.css'

const Admin = () => {
    const {user} = useContext(Context);
    const {product} = useContext(Context);
    const {page} = useContext(Context);
    const {error} = useContext(Context);
    const {search} = useContext(Context);
    const {sort} = useContext(Context);
    const [create, setCreate] = useState(false);
    const [update, setUpdate] = useState(false);
    const [remove, setRemove] = useState(false);
    const navigate = useNavigate();

    const userList = async () => {
        const data = await fetchUsers(PAGE_FIRST);
            user.setUsersList(data.usersList);
            page.setCurrentPage(PAGE_FIRST);
            page.setCountPages(data.countPages);
            search.setSearchBy('');
            search.setSelectedSearchParameter('');
            sort.setFieldNames([]);
            sort.setFieldName('');
            sort.setTypeSort('');
            error.setMessageError('');
            navigate(USERLIST_ROUTE)
    }

    const productList = async () => {
        const data = await fetchProducts(PAGE_FIRST);
            product.setProducts(data.products);
            page.setCurrentPage(PAGE_FIRST);
            page.setCountPages(data.countPages);
            search.setSearchBy('');
            search.setSelectedSearchParameter('');
            sort.setFieldNames([]);
            sort.setFieldName('');
            sort.setTypeSort('');
            error.setMessageError('');
            navigate(PRODUCTS_LIST_ROUTE)
    }

    return (
        <Row className='adminFonPage'>
            <Col md={2}>
                <Create show={create} onHide={() => setCreate(false)}/>
            </Col>
            <Col md={2}>
                <Update show={update} onHide={() => setUpdate(false)}/>
            </Col>
            <Col md={2}>
                <Remove show={remove} onHide={() => setRemove(false)}/>
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
};

export default Admin;