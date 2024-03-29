import React, { useContext, useState } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import { Context } from '../../../index';
import { updatePaymentMethods } from '../../../http/paymentMethodsApi';
import { useInput } from '../../../http/validateApi';
import '../../../css/update/UpdatePaymentMethod.css'
import { observer } from 'mobx-react-lite';

const UpdatePaymentMethod = observer(({show, onHide}) => {
    const {paymentMethod} = useContext(Context);
    const methodId = useInput(0, {isNumberId: {name: 'Payment Method'}});
    const name = useInput('', {minLength: {value: 2, name: 'Payment Method'}});
    const [messageError, setMessageError] = useState('')

    const click = async () => {
        try {
            const data = await updatePaymentMethods(methodId.value, name.value);
                paymentMethod.setPaymentMethods(data.paymentMethods);
                close();
        } catch (e) {
            setMessageError(e.response.data.message);
        }
    }

    const close = () => {
        document.getElementById('updateSelectMethod').value = '0';
        methodId.onChange('');
        name.onChange('');
        setMessageError('');
        onHide();
    }

    return (
        <Modal
            show={show}
            onHide={close}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title 
                    id='contained-modal-title-vcenter'
                >
                    Update a Payment Method
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
                        id='updateSelectMethod'
                        className='form-update-method'
                        onChange={e => methodId.onChange(e)}
                        onBlur={e => methodId.onBlur(e)}
                    >
                        <option
                            key='0'
                            value='0'
                        >
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
                    onClick={close}
                >
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
});

export default UpdatePaymentMethod;