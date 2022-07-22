import React, { useState } from 'react';
import { Form, Modal } from 'react-bootstrap';
import { createPaymentMethods } from '../../../http/paymentMethodsApi';
import { useInput } from '../../../http/validateApi';

const CreatePaymentMethod = ({show, onHide}) => {
    const name = useInput('', {minLength: {value: 3, name: 'Name'}});
    const [messageError, setMessageError] = useState('')

    const click = async () => {
        try {
            createPaymentMethods(name.value)
                name.onChange('')
                onHide()
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
                    New Payment Method
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div style={{color: 'red'}}>{messageError}</div>
                <Form>
                    {(name.isDirty && name.minLengthError) && <div className='mt-3' style={{color: 'red'}}>{name.messageError}</div>}
                    <Form.Control
                        value={name.value}
                        onChange={e => name.onChange(e)}
                        onBlur={e => name.onBlur(e)}
                        placeholder={'Enter the Payment Method'}
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
                    disabled={!name.inputValid}
                    onClick={click}
                >
                    Create
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

export default CreatePaymentMethod;