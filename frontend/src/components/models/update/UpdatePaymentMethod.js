import React, { useContext, useState } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import { Context } from '../../../index';
import { updatePaymentMethods } from '../../../http/paymentMethodsApi';
import { useInput } from '../../../http/validateApi';
import '../../../css/update/UpdatePaymentMethod.css'

const UpdatePaymentMethod = ({show, onHide}) => {
    const {paymentMethod} = useContext(Context);
    const methodId = useInput(0, {isNumberId: {name: 'Payment Method'}});
    const name = useInput('', {minLength: {value: 2, name: 'Payment Method'}});
    const [messageError, setMessageError] = useState('')

    const click = async () => {
        try {
            await updatePaymentMethods(methodId.value, name.value);
                methodId.onChange(0);
                name.onChange('');
                onHide();
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
                    Update a brand
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='error-message'>{messageError}</div>
                <Form>
                    {(methodId.isDirty && methodId.isNumberError) && 
                        <div className='error-message'>
                            {methodId.messageError}
                        </div>}
                    <Form.Select
                        className='form-update-method'
                        onChange={e => methodId.onChange(e)}
                        onBlur={e => methodId.onBlur(e)}
                    >
                        <option value={0}>
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
                    {(name.isDirty && name.minLengthError) && 
                        <div className='mt-3' style={{color: 'red'}}>
                            {name.messageError}
                        </div>}
                    <Form.Control
                        className='form-update-method'
                        value={name.value}
                        onChange={e => name.onChange(e)}
                        onBlur={e => name.onBlur(e)}
                        placeholder={`Update 'Name': ${paymentMethod.paymentMethods.filter(i => { return i.id === Number(methodId)}).map(i => i.name)}`}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    className='button-update-method'
                    variant='outline-primary'
                    disabled={!methodId.inputValid || !name.inputValid}
                    onClick={click}
                >
                    Update
                </Button>
                <Button
                    className='button-update-method'
                    variant='outline-danger'
                    onClick={onHide}
                >
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default UpdatePaymentMethod;