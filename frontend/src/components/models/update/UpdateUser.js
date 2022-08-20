import React, { useContext, useState } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import { formDataUser, updateUserByAdmin, updateUserByUser } from '../../../http/userApi';
import { useInput } from '../../../http/validateApi';
import { Context } from '../../../index';
import { ROLE_ARRAY } from '../../../utils/const';

const UpdateUser = ({show, onHide}) => {
    const {user} = useContext(Context);
    const name = useInput('', {minLength: {value: 3, name: 'Name'}});
    const surname = useInput('', {minLength: {value: 3, name: 'Surname'}});
    const email = useInput('', {minLength: {value: 4, name: 'surname'}, isEmail: true});
    const phone = useInput('', {isPhone: true});
    const login = useInput('', {minLength: {value: 3, name: 'Login'}});
    const role = useInput('', {minLength: {value: 4, name: 'Role'}, isRole: user.role});
    const img = useInput(null, {isImg: { name: 'Img' }} );
    const [messageError, setMessageError] = useState('');
    const roleArray = [];

    for (let index = 0; index < ROLE_ARRAY.length; index++) {
        if (user.user.role === 'admin' && ROLE_ARRAY[index] !== 'admin') {
            roleArray.push(ROLE_ARRAY[index])
        } else if (user.user.role === 'moderator' && ROLE_ARRAY[index] !== 'admin' && ROLE_ARRAY[index] !== 'moderator') {
            roleArray.push(ROLE_ARRAY[index])
        }
    }
    
    const update = async () => {
        try {
            let formData;
            if (user.user.role === 'user' || user.user.role === 'moderator') {
                formData = formDataUser(user.user.userId, name.value, surname.value, email.value, phone.value, login.value, img.value)
                const data = await updateUserByUser(formData);
                    user.setSelectedUser(data.user);
            } else {
                formData = formDataUser(user.selectedUser.id, name.value, surname.value, email.value, phone.value, login.value, role.value, img.value)
                await updateUserByAdmin(formData);
                    user.setSelectedUser({});
            }
                name.onChange('');
                surname.onChange('');
                email.onChange('');
                phone.onChange('');
                login.onChange('');
                role.onChange('');
                img.saveImg(null);                    
                onHide();
        } catch (error) {
            setMessageError(error.response.data.message);
        }
    }

    let updateRole;
    if (user.user.role === 'admin' || user.user.role === 'moderator') {
        updateRole = (
            <Form>
                 <Form.Select
                    className='mt-2 mb-2' 
                    onChange={e => role.onChange(e)}
                    onBlur={e => role.onBlur(e)}
                >
                    <option value=''>
                        {`Now role: '${user.selectedUser.role}'`}
                    </option>
                        {roleArray.map((item) => (
                            <option
                                key={item}
                                value={item}
                            >
                                {item}
                            </option>
                        ))}
                </Form.Select> 
            </Form>
        )
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title
                    id='contained-modal-title-center'
                    style={{
                        
                    }}
                >
                    Update User : {user.selectedUser.login}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div style={{color: 'red'}}>{messageError}</div>
                <Form>
                    <Form.Label>Name:</Form.Label>
                    <Form.Control
                        value={name.value}
                        onChange={e => name.onChange(e)}
                        onBlur={e => name.onBlur(e)}
                        placeholder={user.selectedUser.name}
                    />
                    <Form.Label className='mt-3'>Surname:</Form.Label>
                    <Form.Control
                        value={surname.value}
                        onChange={e => surname.onChange(e)}
                        onBlur={e => surname.onBlur(e)}
                        placeholder={user.selectedUser.surname}
                    />
                    <Form.Label className='mt-3'>Email:</Form.Label>
                    <Form.Control
                        value={email.value}
                        onChange={e => email.onChange(e)}
                        onBlur={e => email.onBlur(e)}
                        placeholder={user.selectedUser.email}
                    />
                    <Form.Label className='mt-3'>Phone:</Form.Label>
                    <Form.Control
                        value={phone.value}
                        onChange={e => phone.onChange(e)}
                        onBlur={e => phone.onBlur(e)}
                        placeholder={user.selectedUser.phone}
                    />
                    <Form.Label className='mt-3'>Login:</Form.Label>
                    <Form.Control
                        value={login.value}
                        onChange={e => login.onChange(e)}
                        onBlur={e => login.onBlur(e)}
                        placeholder={user.selectedUser.login}
                    />
                    {updateRole}

                    {(img.isDirty && img.imgError) && <div className='mt-3' style={{color: 'red'}}>{img.messageError}</div>}
                    <Form.Control
                        className='mt-3'
                        type='file'
                        onChange={e => img.saveImg(e)}
                        onBlur={e => img.onBlur(e)}
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
                    disabled={
                        !name.inputValid && !surname.inputValid && !email.inputValid && 
                        !phone.inputValid && !login.inputValid && !role.inputValid && 
                        !img.inputValid
                    }
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

export default UpdateUser;