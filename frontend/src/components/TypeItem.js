import React, { useContext } from 'react';
import { Context } from '../index';
import { ListGroup } from 'react-bootstrap';
import { ERROR_ROUTE, PAGE_FIRST, TYPE_ROUTE } from '../utils/const';
import { useNavigate } from 'react-router';
import {  fetchProductsType } from '../http/typeApi';
import { observer } from 'mobx-react-lite';

const TypeItem = observer(({typeItem, brandsId}) => {
    const {product} = useContext(Context);
    const {type} = useContext(Context);
    const {brand} = useContext(Context);
    const {messages} = useContext(Context);
    const {page} = useContext(Context);
    const navigate = useNavigate();

    const getType = async () => {
        try {
            type.setSelectedType(typeItem);
            const data = await fetchProductsType(typeItem.id, brandsId, PAGE_FIRST);
                product.setProducts(data.products);
                page.setCurrentPage(PAGE_FIRST);
                page.setCountPages(data.countPages);
                brand.setBrandsByType(brandsId);
        
            navigate(TYPE_ROUTE)
        } catch (e) {
            // messages.setMessageError(e.message)
            messages.setMessageError(e.response.data.message);
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
                    background:'none',
                    color: 'white'
                }}
            onClick={getType}
        >
            {typeItem.name}
        </ListGroup.Item>
    );
});

export default TypeItem;