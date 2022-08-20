import React, { useContext, useState } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import { Context } from '../../../index';
import { useInput } from '../../../http/validateApi';
import { updatePassword } from '../../../http/userApi';

const UpdatePassword = ({show, onHide}) => {
    const {user} = useContext(Context);
    const oldPassword = useInput('', {minLength: {value: 6, name: 'password'}});
    const newPassword = useInput('', {minLength: {value: 6, name: 'newPassword'}, isConfirmPassword: oldPassword.value});
    const confirmPassword = useInput('', {minLength: {value: 6, name: 'confirmPassword'}, isConfirmPassword: newPassword.value});
    const [messageError, setMessageError] = useState('');

    const update = async () => {
        try {
            const data = await updatePassword(oldPassword.value, newPassword.value, user.idUser);
                user.setSelectedUser(data.user);
                oldPassword.onChange('');
                newPassword.onChange('');
                confirmPassword.onChange('');
                setMessageError('')
                onHide();
        } catch (error) {
            setMessageError(error.response.data.message);
        }
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Update Password
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div style={{color: 'red'}}>{messageError}</div>
                <Form>
                    {(oldPassword.isDirty && oldPassword.minLengthError) && <div className='mt-3' style={{color: 'red'}}>{oldPassword.messageError}</div>}
                    <Form.Label>Old password:</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Old password"
                        value={oldPassword.value}
                        onChange={e => oldPassword.onChange(e)}
                        onBlur={e => oldPassword.onBlur(e)}
                    />
 
                    {(newPassword.isDirty && newPassword.minLengthError) && <div className='mt-3' style={{color: 'red'}}>{newPassword.messageError}</div>}
                    {(newPassword.isDirty && !newPassword.confirmPasswordError) && <div className='mt-3' style={{color: 'red'}}>{newPassword.messageError}</div>}
                    <Form.Label className='mt-3'>New password:</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="New password"
                        value={newPassword.value}
                        onChange={e => newPassword.onChange(e)}
                        onBlur={e => newPassword.onBlur(e)}
                    />

                    {((confirmPassword.isDirty && confirmPassword.minLengthError) || (confirmPassword.isDirty && confirmPassword.confirmPasswordError)) && <div className='mt-3' style={{color: 'red'}}>{confirmPassword.messageError}</div>}
                    <Form.Label className='mt-3'>Confirm Password:</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword.value}
                        onChange={e => confirmPassword.onChange(e)}
                        onBlur={e => confirmPassword.onBlur(e)}
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
                    disabled={!oldPassword.inputValid || !newPassword.inputValid || !confirmPassword.inputValid}
                    onClick={() => update()}
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

export default UpdatePassword;