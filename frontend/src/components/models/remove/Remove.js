import React, { useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import RemoveBrand from './RemoveBrand';
import RemoveCategory from './RemoveCategory';
import RemovePaymentMethod from './RemovePaymentMethod';
import RemoveType from './RemoveType';
import '../../../css/AdminPage.css'

const Remove = ({show, onHide}) => {
    const [categoryRemoveVisible, setCategoryRemoveVisible] = useState(false);
    const [typeRemoveVisible, setTypeRemoveVisible] = useState(false);
    const [brandRemoveVisible, setBrandRemoveVisible] = useState(false);
    const [methodRemoveVisible, setMethodRemoveVisible] = useState(false);

    return (
        <ListGroup
            className='listGroupAdmin'
            key='id'
        >
            <ListGroup.Item 
                className='listGroupItemBasket'
                onClick={() => setCategoryRemoveVisible(true)}
            >
                Remove a Category
            </ListGroup.Item>
            <ListGroup.Item  
                className='listGroupItemBasket'
                onClick={() => setTypeRemoveVisible(true)}
            >
                Remove a Type
            </ListGroup.Item>
            <ListGroup.Item
                className='listGroupItemBasket'
                onClick={() => setBrandRemoveVisible(true)}
            >
                Remove a Brand
            </ListGroup.Item>
            <ListGroup.Item
                className='listGroupItemBasket'
                onClick={() => setMethodRemoveVisible(true)}
            >
                Remove a Payment Method
            </ListGroup.Item>

            <RemoveCategory show={categoryRemoveVisible} onHide={() => setCategoryRemoveVisible(false)}/>
            <RemoveType show={typeRemoveVisible} onHide={() => setTypeRemoveVisible(false)}/>
            <RemoveBrand show={brandRemoveVisible} onHide={() => setBrandRemoveVisible(false)}/>
            <RemovePaymentMethod show={methodRemoveVisible} onHide={() => setMethodRemoveVisible(false)}/>
        </ListGroup>
    );
};

export default Remove;