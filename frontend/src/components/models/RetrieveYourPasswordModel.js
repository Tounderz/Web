import React from 'react';
import { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { retrievePassword } from '../../http/retrievePasswordApi';
import { useInput } from '../../http/validateApi';
import '../../css/RetrieveYourPasswordModel.css'
import { observer } from 'mobx-react-lite';

const RetrieveYourPasswordModel = observer(({show, onHide}) => {
    const email = useInput('', {minLength: {value: 4, name: 'Email'}, isEmail: true});
    const [messageError, setMessageError] = useState('');

    const send = async () => {
        try {
            await retrievePassword(email.value);
                close();
        } catch (e) {
            setMessageError(e.response.data.message);
        }
    }

    const close = () => {
        email.onChange('');
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
                    Retrieve your password
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='error-message'>{messageError}</div>
                <Form>
                    {((email.isDirty && email.emailError) || 
                        (email.isDirty && email.isEmpty)) && 
                        <div className='error-message'>
                            {email.messageError}
                        </div>}
                    <Form.Control
                        className='form-control-retrieve-password'
                        value={email.value}
                        onChange={e => email.onChange(e)}
                        onBlur={e => email.onBlur(e)}
                        placeholder={'Enter your email address'}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    className='button-retrieve-password'
                    variant='outline-success'
                    disabled={!email.inputValid}
                    onClick={send}
                >
                    Send
                </Button>
                <Button
                    className='button-retrieve-password'
                    variant='outline-danger'
                    onClick={close}
                >
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
});

export default RetrieveYourPasswordModel;