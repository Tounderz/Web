import React, { useContext, useState } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import { formDataUser, updateUserByAdmin, updateUserByUser } from '../../../http/userApi';
import { useInput } from '../../../http/validateApi';
import { Context } from '../../../index';
import { ADMIN_NAME, CABINET_NAME, ROLE_ARRAY } from '../../../utils/const';
import '../../../css/update/UpdateUser.css'
import { observer } from 'mobx-react-lite';

const UpdateUser = observer(({show, onHide}) => {
    const {user} = useContext(Context);
    const {page} = useContext(Context);
    const {updates} = useContext(Context);
    const name = useInput('', {minLength: {value: 3, name: 'Name'}});
    const surname = useInput('', {minLength: {value: 3, name: 'Surname'}});
    const email = useInput('', {minLength: {value: 4, name: 'Email'}, isEmail: true});
    const phone = useInput('', {isPhone: false});
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
            setMessageError('');
            let formData;
            if (user.user.role === 'admin' || user.user.role === 'moderator') {
                formData = formDataUser({id: user.user.userId, name: name.value, 
                    surname: surname.value, email: email.value, 
                    phone: phone.value, login: login.value, password: '', img: 
                    img.value, role: role.value
                });
            } else {
                formData = formDataUser({id: user.user.userId, name: name.value, 
                    surname: surname.value, email: email.value, 
                    phone: phone.value, login: login.value, password: '', img: 
                    img.value, role: ''
                });
            }
            
            if (updates.updateParameter === CABINET_NAME) {
                const data = await updateUserByUser(formData);
                    user.setSelectedUser(data.user);
                    onHide();

            } else if (updates.updateParameter === ADMIN_NAME) {
                const data = await updateUserByAdmin(formData);
                    user.setUsersList(data.usersList);
                    page.setCountPages(data.countPages);
                    user.setSelectedUser({});
                    onHide();
            }
        } catch (e) {
            setMessageError(e.message);
        } finally {
            name.onChange('');
            surname.onChange('');
            email.onChange('');
            phone.onChange('');
            login.onChange('');
            document.getElementById('roleTag').value = '0';
            role.onChange(0);
            img.saveImg(null);
        }
    }

    let updateRole;
    if (user.user.role === 'admin' || user.user.role === 'moderator') {
        updateRole = (
            <Form>
                {(role.isDirty && role.minLengthError) && 
                        <div className='error-message'>
                            {role.messageError}
                        </div>}
                 <Form.Select
                    id = 'roleTag' 
                    className='form-update-user' 
                    onChange={e => role.onChange(e)}
                    onBlur={e => role.onBlur(e)}
                >
                    <option 
                        key='0'
                        value='0'
                    >
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
                    id='contained-modal-title-vcenter'
                >
                    Update User : {user.selectedUser.login}
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
                        className='form-update-user'
                        value={name.value}
                        onChange={e => name.onChange(e)}
                        onBlur={e => name.onBlur(e)}
                        placeholder={`Name: ${user.selectedUser.name}`}
                    />

                    {(surname.isDirty && surname.minLengthError) && 
                        <div className='error-message'>
                            {surname.messageError}
                        </div>}
                    <Form.Control
                        className='form-update-user'
                        value={surname.value}
                        onChange={e => surname.onChange(e)}
                        onBlur={e => surname.onBlur(e)}
                        placeholder={`Surname: ${user.selectedUser.surname}`}
                    />

                    {(email.isDirty && email.minLengthError) && 
                        <div className='error-message'>
                            {email.messageError}
                        </div>}
                    <Form.Control
                        className='form-update-user'
                        value={email.value}
                        onChange={e => email.onChange(e)}
                        onBlur={e => email.onBlur(e)}
                        placeholder={`Email: ${user.selectedUser.email}`}
                    />

                    {(phone.isDirty && phone.phoneError) && 
                        <div className='error-message'>
                            {phone.messageError}
                        </div>}
                    <Form.Control
                        className='form-update-user'
                        value={phone.value}
                        onChange={e => phone.onChange(e)}
                        onBlur={e => phone.onBlur(e)}
                        placeholder={`Phone: ${user.selectedUser.phone}`}
                    />

                    {(login.isDirty && login.minLengthError) && 
                        <div className='error-message'>
                            {login.messageError}
                        </div>}
                    <Form.Control
                        className='form-update-user'
                        value={login.value}
                        onChange={e => login.onChange(e)}
                        onBlur={e => login.onBlur(e)}
                        placeholder={`Login: ${user.selectedUser.login}`}
                    />
                    {updateRole}

                    {(img.isDirty && img.imgError) && 
                        <div className='error-message'>
                            {img.messageError}
                        </div>}
                    <Form.Control
                        className='form-update-user'
                        type='file'
                        onChange={e => img.saveImg(e)}
                        onBlur={e => img.onBlur(e)}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    className='button-update-user'
                    variant='outline-primary'
                    disabled={
                        !name.inputValid && 
                        !surname.inputValid && 
                        !email.inputValid && 
                        !phone.inputValid && 
                        !login.inputValid && 
                        !role.inputValid && 
                        !img.inputValid
                    }
                    onClick={() => update()}
                >
                    Update
                </Button>
                <Button
                    className='button-update-user'
                    variant='outline-danger'
                    onClick={onHide}
                >
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
});

export default UpdateUser;