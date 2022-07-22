import React, { useContext } from 'react';
import { Context } from '../index';
import { ListGroup } from 'react-bootstrap';
import { ERROR_ROUTE, PAGE_FIRST, TYPE_ROUTE } from '../utils/const';
import { useNavigate } from 'react-router';
import {  fetchProductsType } from '../http/typeApi';
import { observer } from 'mobx-react-lite';

const TypeItem = observer(({type, brandsId}) => {
    const {product} = useContext(Context)
    const {error} = useContext(Context)
    const navigate = useNavigate()

    const getType = async () => {
        try {
            product.setSelectedType(type);
            const data = await fetchProductsType(type.id, brandsId, PAGE_FIRST);
                product.setProducts(data.products);
                product.setCountPages(data.countPages);
                product.setBrandsByType(brandsId);
        
            navigate(TYPE_ROUTE)
        } catch (e) {
            error.setMessageError(e.response.data.message)
            navigate(ERROR_ROUTE)
        }
    }

    return (
        <ListGroup.Item 
            md={3} 
            className='d-flex justify-content-center btn-primary'
            style={
                {
                    cursor: 'pointer',
                    borderRadius: '5px',
                }}
                border={'light'}
            variant={'outline-success'} 
            onClick={getType}
        >
            {type.name}
        </ListGroup.Item>
    );
});

export default TypeItem;