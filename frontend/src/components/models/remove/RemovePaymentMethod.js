import React, { useContext } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import { Context } from '../../../index';
import { removePaymentMethods } from '../../../http/paymentMethodsApi';
import { useInput } from '../../../http/validateApi';

const RemovePaymentMethod = ({show, onHide}) => {
    const {product} = useContext(Context)
    const methodId = useInput(0, {isNumberId: {name: 'Payment Method'}})

    const click = async () => {
        await removePaymentMethods(methodId.value);
            methodId.onChange(0);
            onHide();
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Remove a Payment Method
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {(methodId.isDirty && methodId.isNumberError) && <div className='mt-3' style={{color: 'red'}}>{methodId.messageError}</div>}
                <Form.Select 
                    className='mt-3'
                    onChange={e => methodId.onChange(e)}
                    onBlur={e => methodId.onBlur(e)}
                >
                    <option value=''>
                        Select a Payment Method
                    </option>
                    {product.paymentMethods.map(item => (
                        <option
                            value={item.id}
                            key={item.id}
                        >
                            {item.name}
                        </option>
                    ))}
                </Form.Select>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant='outline-primary'
                    style={{
                        cursor: 'pointer',
                        borderRadius: '5px',
                        margin: '2px'
                    }}
                    disabled={!methodId.inputValid}
                    onClick={click}
                >
                    Remove
                </Button>
                <Button 
                    variant='outline-danger'
                    style={{
                        cursor: 'pointer',
                        borderRadius: '5px',
                        margin: '2px'
                    }}
                    onClick={onHide}
                >
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default RemovePaymentMethod;