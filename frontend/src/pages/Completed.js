import React, { useContext } from 'react';
import { Container, Row } from 'react-bootstrap';
import { Context } from '../index';
import '../css/Completed.css'

const Completed = () => {
    const {order} = useContext(Context);

    return (
        <Row className='completedfonPage'>
            <Container className='containerCompleted'>
                <h1>{order.selectedOrderId ? 'Order № ' + order.selectedOrderId : 'You are not logged in'}</h1>
            </Container>
        </Row>
    );
};

export default Completed;