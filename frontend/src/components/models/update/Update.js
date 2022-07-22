import React, { useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import UpdateBrand from './UpdateBrand';
import UpdateCategory from './UpdateCategory';
import UpdatePaymentMethod from './UpdatePaymentMethod';
import UpdateType from './UpdateType';

const Update = ({show, onHide}) => {
    const [categoryUpdateVisible, setCategoryUpdateVisible] = useState(false);
    const [typeUpdateVisible, setTypeUpdateVisible] = useState(false);
    const [brandUpdateVisible, setBrandUpdateVisible] = useState(false);
    const [methodUpdateVisible, setMethodUpdateVisible] = useState(false);

    return (
        <ListGroup style={
            { 
                cursor: 'pointer' 
            }}
            key='id'
        >
            <ListGroup.Item 
                className='btn-primary'
                style={{
                    cursor: 'pointer',
                    borderRadius: '5px'
                }}
                onClick={() => setCategoryUpdateVisible(true)}
            >
                Update a Category
            </ListGroup.Item>
            <ListGroup.Item  
                className='btn-primary'
                style={{
                    cursor: 'pointer',
                    borderRadius: '5px'
                }}
                onClick={() => setTypeUpdateVisible(true)}
            >
                Update a Type
            </ListGroup.Item>
            <ListGroup.Item
                className='btn-primary'
                style={{
                    cursor: 'pointer',
                    borderRadius: '5px'
                }}
                onClick={() => setBrandUpdateVisible(true)}
            >
                Update a Brand
            </ListGroup.Item>

            <ListGroup.Item
                className='btn-primary'
                style={{
                    cursor: 'pointer',
                    borderRadius: '5px'
                }}
                onClick={() => setMethodUpdateVisible(true)}
            >
                Update a Payment Method
            </ListGroup.Item>

            <UpdateCategory show={categoryUpdateVisible} onHide={() => setCategoryUpdateVisible(false)}/>
            <UpdateBrand show={brandUpdateVisible} onHide={() => setBrandUpdateVisible(false)}/>
            <UpdateType show={typeUpdateVisible} onHide={() => setTypeUpdateVisible(false)}/>
            <UpdatePaymentMethod show={methodUpdateVisible} onHide={() => setMethodUpdateVisible(false)}/>
        </ListGroup>
    );
};

export default Update;