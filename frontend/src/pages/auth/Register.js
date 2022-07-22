import React, { useState } from "react";
import { Card, Container, FormControl, ModalFooter } from "react-bootstrap";
import { LOGIN_ROUTE, ZERO } from "../../utils/const";
import { NavLink } from 'react-router-dom';
import { formDataUser, register } from "../../http/userApi";
import { useNavigate } from "react-router";
import { useInput } from "../../http/validateApi";

const Register = () => {
    const name = useInput('', { minLength: {value: 3, name: 'Name'}});
    const surname = useInput('', {minLength: {value: 4, name: 'Surname'}});
    const email = useInput('', {minLength: {value: 4, name: 'Email'}, isEmail: true});
    const phone = useInput('', {isPhone: true});
    const login = useInput('', {minLength: {value: 3, name: 'Login'}});
    const password = useInput('', {minLength: {value: 6, name: 'Password'}});
    const confirmPassword = useInput('', {minLength: {value: 6, name: 'Confirm Password'}, isConfirmPassword: password.value});
    const img = useInput(null);
    const [messageError, setMessageError] = useState('')
    const navigate = useNavigate()

    const click = async () => {
        try {
            const formData = formDataUser(ZERO, name.value, surname.value, email.value, phone.value, login.value, password.value, img.value);
            await register(formData);
            navigate(LOGIN_ROUTE);
        } catch (error) {
            setMessageError(error.response.data.message)
        }
        finally{
            name.onChange('');
            surname.onChange('');
            email.onChange('');
            phone.onChange('');
            login.onChange('');
            password.onChange('');
            confirmPassword.onChange('');
            img.saveImg(null);
        } 
    }
    
    return (
        <Container className='d-flex justify-content-center align-items-center'>
            <Card style={{width: 500}} className='p-5'>
                <h1 className="h3 mb-3 fw-normal">Please register</h1>

                <div style={{color: 'red'}}>{messageError}</div>
                {(name.isDirty && name.minLengthError) && <div className='mt-3' style={{color: 'red'}}>{name.messageError}</div>}
                <FormControl
                    className='mt-3'
                    placeholder='Name'
                    value={name.value}
                    onChange={e => name.onChange(e)}
                    onBlur={e => name.onBlur(e)}
                />

                {(surname.isDirty && surname.minLengthError) && <div className='mt-3' style={{color: 'red'}}>{surname.messageError}</div>}
                <FormControl
                    className='mt-3'
                    placeholder='Surname'
                    value={surname.value}
                    onChange={e => surname.onChange(e)}
                    onBlur={e => surname.onBlur(e)}
                />

                {((email.isDirty && email.emailError) || (email.isDirty && email.isEmpty)) && <div className='mt-3' style={{color: 'red'}}>{email.messageError}</div>}
                <FormControl
                    className='mt-3'
                    type='email' 
                    placeholder='Email address'
                    value={email.value}
                    onChange={e => email.onChange(e)}
                    onBlur={e => email.onBlur(e)}
                />

                {((phone.isDirty && phone.isEmpty) || (phone.isDirty && phone.phoneError)) && 
                    <div className='mt-3' style={{color: 'red'}}>{phone.messageError}</div>
                }
                <FormControl
                    className='mt-3'
                    type='tel' 
                    placeholder='Phone number'
                    value={phone.value}
                    onChange={e => phone.onChange(e)}
                    onBlur={e => phone.onBlur(e)}
                />

                {(login.isDirty && login.minLengthError) && 
                    <div className='mt-3' style={{color: 'red'}}>{login.messageError}</div>
                }
                <FormControl
                    className='mt-3'
                    placeholder='Login'
                    value={login.value}
                    onChange={e => login.onChange(e)}
                    onBlur={e => login.onBlur(e)}
                />

                {((password.isDirty && password.minLengthError) || (password.isDirty && password.passwordSecurityError)) && 
                    <div className='mt-3' style={{color: 'red'}}>{password.messageError}</div>
                }
                <FormControl
                    className='mt-3'
                    type='password'
                    placeholder='Password'
                    value={password.value}
                    onChange={e => password.onChange(e)}
                    onBlur={e => password.onBlur(e)}
                />

                {((confirmPassword.isDirty && confirmPassword.minLengthError) || (confirmPassword.isDirty && confirmPassword.confirmPasswordError)) && 
                    <div className='mt-3' style={{color: 'red'}}>{confirmPassword.messageError}</div>
                }
                <FormControl
                    className='mt-3'
                    type='password'
                    placeholder='ConfirmPassword'
                    value={confirmPassword.value}
                    onChange={e => confirmPassword.onChange(e)}
                    onBlur={e => confirmPassword.onBlur(e)}
                />

                <FormControl
                    className='mt-3'
                    type='file'
                    onChange={e => img.saveImg(e)}
                />

                <ModalFooter className='d-flex justify-content-betwwen mt-3 pl-3 pr-3'>
                    There is an account? <NavLink to={LOGIN_ROUTE}>Sign in</NavLink>
                    <button
                        disabled={!name.inputValid || !surname.inputValid || !phone.inputValid || !email.inputValid || !login.inputValid || !password.inputValid}
                        className='btn-primary'
                        variant={'outline-success'}
                        style={{
                            cursor: 'pointer',
                            borderRadius: '5px'
                        }}
                        type='submit'
                        
                        onClick={click}
                    >
                        Register
                    </button>

                </ModalFooter>
            </Card>
        </Container>
    );
}

export default Register;