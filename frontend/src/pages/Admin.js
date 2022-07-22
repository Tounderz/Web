import React, { useContext, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Context } from '../index';
import { useNavigate } from "react-router";
import Remove from '../components/models/remove/Remove';
import Create from '../components/models/create/Create';
import Update from '../components/models/update/Update';
import { PAGE_FIRST, PRODUCTS_LIST_ROUTE, USERLIST_ROUTE } from '../utils/const';
import { fetchUsers } from '../http/userApi';
import { fetchProducts } from '../http/productApi';

const Admin = () => {
    const {user} = useContext(Context)
    const {product} = useContext(Context)
    const [create, setCreate] = useState(false)
    const [update, setUpdate] = useState(false)
    const [remove, setRemove] = useState(false)
    const navigate = useNavigate()

    const userList = async () => {
        const data = await fetchUsers(PAGE_FIRST);
            user.setUsersList(data.usersList);
            user.setCountPages(data.countPages);
            navigate(USERLIST_ROUTE)
    }

    const productList = async () => {
        const data = await fetchProducts(PAGE_FIRST);
            product.setProducts(data.products);
            product.setCountPages(data.countPages);
            navigate(PRODUCTS_LIST_ROUTE)
    }

    return (
        <Row className='mt-2 m-3'>
            <Col md={2}>
                <Create show={create} onHide={() => setCreate(false)}/>
            </Col>
            <Col md={2}>
                <Update show={update} onHide={() => setUpdate(false)}/>
            </Col>
            <Col md={2}>
                <Remove show={remove} onHide={() => setRemove(false)}/>
            </Col>
            <Row className='mt-2 m-3'>
            <button 
                className='btn-primary'
                variant={'outline-success'}
                style={{
                    cursor: 'pointer',
                    borderRadius: '5px',
                    width: '100px',
                    height: '40px',
                    marginTop: '15px'
                }}
                onClick={userList}
            >
                User list
            </button>
            <button
                className='btn-primary'
                variant={'outline-success'}
                style={{
                    cursor: 'pointer',
                    borderRadius: '5px',
                    width: '150px',
                    height: '40px',
                    marginTop: '15px',
                    margin: '15px'
                }}
                onClick={productList}
            >
                Product List
            </button>
            </Row>
        </Row>
    )
};

export default Admin;