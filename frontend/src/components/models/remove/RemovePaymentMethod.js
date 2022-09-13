import React, { useContext } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import { Context } from '../../../index';
import { removePaymentMethods } from '../../../http/paymentMethodsApi';
import { useInput } from '../../../http/validateApi';
import '../../../css/remove/RemovePaymentMethod.css'

const RemovePaymentMethod = ({show, onHide}) => {
    const {paymentMethod} = useContext(Context);
    const methodId = useInput(0, {isNumberId: {name: 'Payment Method'}});

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
                <Modal.Title 
                    id='contained-modal-title-vcenter'
                >
                    Remove a Payment Method
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {(methodId.isDirty && methodId.isNumberError) && 
                    <div className='error-message'>
                        {methodId.messageError}
                    </div>}
                <Form.Select 
                    className='form-method-remove'
                    onChange={e => methodId.onChange(e)}
                    onBlur={e => methodId.onBlur(e)}
                >
                    <option value=''>
                        Select a Payment Method
                    </option>
                    {paymentMethod.paymentMethods.map(item => (
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
                    className='button-method-remove'
                    variant='outline-primary'
                    disabled={!methodId.inputValid}
                    onClick={click}
                >
                    Remove
                </Button>
                <Button 
                    className='button-method-remove'
                    variant='outline-danger'
                    onClick={onHide}
                >
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default RemovePaymentMethod;