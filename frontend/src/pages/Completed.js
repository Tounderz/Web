import React, { useContext } from 'react';
import { Container } from 'react-bootstrap';
import { Context } from '../index';

const Completed = () => {
    const {product} = useContext(Context)

    return (
        <Container className='d-flex justify-content-center align-items-center'>
            <h1>{product.selectedOrderId ? 'Order № ' + product.selectedOrderId : 'You are not logged in'}</h1>
        </Container>
    );
};

export default Completed;