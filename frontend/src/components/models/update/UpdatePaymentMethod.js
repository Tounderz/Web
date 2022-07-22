import React, { useContext, useState } from 'react';
import { Form, Modal } from 'react-bootstrap';
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
                <button
                    className="btn-primary m-2"
                    variant={'outline-success'}
                    style={{
                        cursor: 'pointer',
                        borderRadius: '5px'
                    }}
                    disabled={!methodId.inputValid || !name.inputValid}
                    onClick={click}
                >
                    Update
                </button>
                <button 
                    className="btn-danger"
                    variant={'outline-success'}
                    style={{
                        cursor: 'pointer',
                        borderRadius: '5px'
                    }}
                    onClick={onHide}
                >
                    Close
                </button>
            </Modal.Footer>
        </Modal>
    );
};

export default UpdatePaymentMethod;