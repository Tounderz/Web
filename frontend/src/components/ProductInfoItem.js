import React, { useContext, useState } from 'react';
import { Col, Form, InputGroup } from 'react-bootstrap';
import { removeInfoProduct } from '../http/infoProductApi';
import { Context } from '../index';
import UpdateInfoProduct from './models/update/UpdateInfoProduct';

const ProductInfoItem = ({id, info}) => {
    const {user} = useContext(Context)
    const [updateInfoVisible, setUpdateInfoVisible] = useState(false)

    let admin;

    if (user.user.role !== 'user' && user.user.isAuth) {
        admin = (
            <Col style={{ textAlign: 'right' }}>
                <button
                    className="btn-primary" 
                    variant={'outline-success'} 
                    onClick={() => {setUpdateInfoVisible(true)}}
                    style={{
                        cursor: 'pointer',
                        borderRadius: '5px'
                    }}
                >
                    Update
                </button>
                
                <button
                    className="btn-danger m-1" 
                    variant={'outline-success'} 
                    onClick={async () => await removeInfoProduct(info.id)}
                    style={{
                        cursor: 'pointer',
                        borderRadius: '5px'
                    }}
                >
                    Remove
                </button>
                <UpdateInfoProduct info={info} show={updateInfoVisible} onHide={() => setUpdateInfoVisible(false)}/>
            </Col>
        )
    }

    return (
        <InputGroup className="mb-3">
            <Form.Label style={{'fontSize': '20px'}}>{id}: {info.title} - {info.description}</Form.Label>
            {admin}
        </InputGroup>
    );
};

export default ProductInfoItem;