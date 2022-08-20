import React, { useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import CreateBrand from './CreateBrand';
import CreateCategory from './CreateCategory';
import CreatePaymentMethod from './CreatePaymentMethod';
import CreateProduct from './CreateProduct';
import CreateType from './CreateType';
import '../../../css/AdminPage.css'

const Create = ({show, onHide}) => {
    const [categoryVisible, setCategoryVisible] = useState(false);
    const [typeVisible, setTypeVisible] = useState(false);
    const [brandVisible, setBrandVisible] = useState(false);
    const [productVisible, setProductVisible] = useState(false);
    const [methodVisible, setMethodVisible] = useState(false);

    return (        
        <ListGroup 
            className='listGroupAdmin'
            key='id'
        >
            <ListGroup.Item 
                className='listGroupItemBasket'
                onClick={() => setCategoryVisible(true)}
            >
                Create a Category
            </ListGroup.Item>
            <ListGroup.Item  
                className='listGroupItemBasket'
                onClick={() => setTypeVisible(true)}
            >
                 Create a Type
            </ListGroup.Item>
            <ListGroup.Item
                className='listGroupItemBasket'
                onClick={() => setBrandVisible(true)}
            >
                Create a Brand
            </ListGroup.Item>
            <ListGroup.Item 
                className='listGroupItemBasket'
                onClick={() => setMethodVisible(true)}
            >
                Create a Payment Method
            </ListGroup.Item>
            <ListGroup.Item 
                className='listGroupItemBasket'
                onClick={() => setProductVisible(true)}
            >
                Create a Product
            </ListGroup.Item>
            
            <CreateCategory show={categoryVisible} onHide={() => setCategoryVisible(false)}/>
            <CreateType show={typeVisible} onHide={() => setTypeVisible(false)}/>
            <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)}/>
            <CreateProduct show={productVisible} onHide={() => setProductVisible(false)}/>
            <CreatePaymentMethod show={methodVisible} onHide={() => setMethodVisible(false)}/>
        </ListGroup>
    );
};

export default Create;