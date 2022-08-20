import React, { useContext } from 'react';
import { Container, Row } from 'react-bootstrap';
import { Context } from '../index';
import '../css/Completed.css'

const Completed = () => {
    const {product} = useContext(Context)

    return (
        <Row className='completedfonPage'>
            <Container className='containerCompleted'>
                <h1>{product.selectedOrderId ? 'Order № ' + product.selectedOrderId : 'You are not logged in'}</h1>
            </Container>
        </Row>
    );
};

export default Completed;