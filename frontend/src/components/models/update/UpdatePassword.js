import React, { useContext, useState } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import { Context } from '../../../index';
import { useInput } from '../../../http/validateApi';
import { updatePassword } from '../../../http/userApi';
import '../../../css/update/UpdatePassword.css'
import { observer } from 'mobx-react-lite';

const UpdatePassword = observer(({show, onHide}) => {
    const {user} = useContext(Context);
    const oldPassword = useInput('', {minLength: {value: 6, name: 'Password'}});
    const newPassword = useInput('', {minLength: {value: 6, name: 'New Password'}, isConfirmPassword: {value: oldPassword.value}});
    const confirmPassword = useInput('', {minLength: {value: 6, name: 'Confirm Password'}, isConfirmPassword: {value: newPassword.value}});
    const [messageError, setMessageError] = useState('');

    const update = async () => {
        try {
            const data = await updatePassword(oldPassword.value, newPassword.value, user.idUser);
                user.setSelectedUser(data.user);
                close();
        } catch (e) {
            // setMessageError(e.message);
            setMessageError(e.response.data.message);
        }
    }

    const close = () => {
        oldPassword.onChange('');
        newPassword.onChange('');
        confirmPassword.onChange('');
        setMessageError('')
        onHide();
    }

    return (
        <Modal
            show={show}
            onHide={close}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title
                    id='contained-modal-title-vcenter'
                >
                    Update Password
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='error-message'>
                    {messageError}
                </div>
                <Form>
                    {(oldPassword.isDirty && oldPassword.minLengthError) && 
                        <div className='error-message'>
                            {oldPassword.messageError}
                        </div>}
                    <Form.Control
                        className='form-update-password'
                        type="password"
                        placeholder="Old password"
                        value={oldPassword.value}
                        onChange={e => oldPassword.onChange(e)}
                        onBlur={e => oldPassword.onBlur(e)}
                    />
 
                    {((newPassword.isDirty && newPassword.minLengthError) || 
                        (newPassword.isDirty && newPassword.confirmPasswordError)) && 
                        <div className='error-message'>
                            {newPassword.messageError}
                        </div>} 
                    <Form.Control
                        className='form-update-password'
                        type="password"
                        placeholder="New password"
                        value={newPassword.value}
                        onChange={e => newPassword.onChange(e)}
                        onBlur={e => newPassword.onBlur(e)}
                    />

                    {((confirmPassword.isDirty && confirmPassword.minLengthError) || 
                        (confirmPassword.isDirty && confirmPassword.confirmPasswordError)) && 
                        <div className='error-message'>
                            {confirmPassword.messageError}
                        </div>}
                    <Form.Control
                        className='form-update-password'
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
                    className='button-update-password'
                    variant='outline-primary'
                    disabled={
                        !oldPassword.inputValid || 
                        !newPassword.inputValid || 
                        !confirmPassword.inputValid
                    }
                    onClick={() => update()}
                >
                    Update
                </Button>
                <Button 
                    className='button-update-password'
                    variant='outline-danger'
                    onClick={close}
                >
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
});

export default UpdatePassword;