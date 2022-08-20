import React, { useContext, useState } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import { Context } from '../../../index';
import { updatePaymentMethods } from '../../../http/paymentMethodsApi';
import { useInput } from '../../../http/validateApi';

const UpdatePaymentMethod = ({show, onHide}) => {
    const {product} = useContext(Context)
    const methodId = useInput(0, {isNumberId: {name: 'Payment Method'}});
    const name = useInput('', {minLength: {value: 2, name: 'Payment Method'}});
    const [messageError, setMessageError] = useState('')

    const click = async () => {
        try {
            await updatePaymentMethods(methodId.value, name.value);
                methodId.onChange(0);
                name.onChange('');
                onHide();
        } catch (error) {
            setMessageError(error.response.data.message)
        }
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Update a brand
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div style={{color: 'red'}}>{messageError}</div>
                {(methodId.isDirty && methodId.isNumberError) && <div className='mt-3' style={{color: 'red'}}>{methodId.messageError}</div>}
                <Form.Select
                    className='mt-3'
                    onChange={e => methodId.onChange(e)}
                    onBlur={e => methodId.onBlur(e)}
                >
                    <option value={0}>
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
                <Form>
                    {(name.isDirty && name.minLengthError) && <div className='mt-3' style={{color: 'red'}}>{name.messageError}</div>}
                    <Form.Control
                        className='mt-3'
                        value={name.value}
                        onChange={e => name.onChange(e)}
                        onBlur={e => name.onBlur(e)}
                        placeholder={`Update 'Name': ${product.paymentMethods.filter(i => { return i.id === Number(methodId)}).map(i => i.name)}`}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant='outline-primary'
                    style={{
                        cursor: 'pointer',
                        borderRadius: '5px',
                        margin: '2px'
                    }}
                    disabled={!methodId.inputValid || !name.inputValid}
                    onClick={click}
                >
                    Update
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

export default UpdatePaymentMethod;