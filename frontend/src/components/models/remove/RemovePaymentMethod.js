import React, { useContext } from 'react';
import { Form, Modal } from 'react-bootstrap';
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
                <button
                    className="btn-primary m-2"
                    variant={'outline-success'}
                    style={{
                        cursor: 'pointer',
                        borderRadius: '5px'
                    }}
                    disabled={!methodId.inputValid}
                    onClick={click}
                >
                    Remove
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

export default RemovePaymentMethod;