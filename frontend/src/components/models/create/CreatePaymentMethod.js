import React, { useState } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import { createPaymentMethods } from '../../../http/paymentMethodsApi';
import { useInput } from '../../../http/validateApi';
import '../../../css/create/CreatePaymentMethod.css'

const CreatePaymentMethod = ({show, onHide}) => {
    const name = useInput('', {minLength: {value: 3, name: 'Name'}});
    const [messageError, setMessageError] = useState('')

    const click = async () => {
        try {
            createPaymentMethods(name.value)
                name.onChange('')
                onHide()
        } catch (e) {
            setMessageError(e.message)
        }
        
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
                    New Payment Method
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='error-message'>{messageError}</div>
                <Form>
                    {(name.isDirty && name.minLengthError) && 
                        <div className='error-message'>
                            {name.messageError}
                        </div>}
                    <Form.Control
                        className='form-control-create-method'
                        value={name.value}
                        onChange={e => name.onChange(e)}
                        onBlur={e => name.onBlur(e)}
                        placeholder={'Enter the Payment Method'}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    className='button-create-method'
                    variant='outline-primary'
                    disabled={!name.inputValid}
                    onClick={click}
                >
                    Create
                </Button>
                <Button 
                    className='button-create-method'
                    variant='outline-danger'
                    onClick={onHide}
                >
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreatePaymentMethod;