import React, { useState } from "react";
import { Button, Container, Form, ModalFooter, Row } from "react-bootstrap";
import { LOGIN_ROUTE, ZERO } from "../../utils/const";
import { NavLink } from 'react-router-dom';
import { formDataUser, register } from "../../http/userApi";
import { useNavigate } from "react-router";
import { useInput } from "../../http/validateApi";
import { observer } from "mobx-react-lite";
import '../../css/Auth.css'

const Register = observer(() => {
    const name = useInput('', { minLength: {value: 3, name: 'Name'}});
    const surname = useInput('', {minLength: {value: 4, name: 'Surname'}});
    const email = useInput('', {minLength: {value: 4, name: 'Email'}, isEmail: true});
    const phone = useInput('', {isPhone: true});
    const login = useInput('', {minLength: {value: 3, name: 'Login'}});
    const password = useInput('', {minLength: {value: 6, name: 'Password'}});
    const confirmPassword = useInput('', {minLength: {value: 6, name: 'Confirm Password'}, isConfirmPassword: {value: password.value}});
    const img = useInput(null);
    const [messageError, setMessageError] = useState('')
    const navigate = useNavigate()

    const click = async () => {
        try {
            const formData = formDataUser(ZERO, name.value, surname.value, email.value, phone.value, login.value, password.value, img.value);
            await register(formData);
            navigate(LOGIN_ROUTE);
        } catch (e) {
            setMessageError(e.message)
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
        <Row className='loginFonPage'>
            <Container className='containerAuth'>
                <Form
                    className='formAuth'
                >
                    <h1 className="h3 mb-3 fw-normal">Please Sign Up</h1>

                    <div className='errorAuth'>{messageError}</div>
                    {(name.isDirty && name.minLengthError) && <div className='errorAuth'>{name.messageError}</div>}
                    <Form.Control
                        className='formControlAuth'
                        placeholder='Name'
                        value={name.value}
                        onChange={e => name.onChange(e)}
                        onBlur={e => name.onBlur(e)}
                    />

                    {(surname.isDirty && surname.minLengthError) && <div className='errorAuth'>{surname.messageError}</div>}
                    <Form.Control
                        className='formControlAuth'
                        placeholder='Surname'
                        value={surname.value}
                        onChange={e => surname.onChange(e)}
                        onBlur={e => surname.onBlur(e)}
                    />

                    {((email.isDirty && email.emailError) || (email.isDirty && email.isEmpty)) && <div className='errorAuth'>{email.messageError}</div>}
                    <Form.Control
                        className='formControlAuth'
                        type='email' 
                        placeholder='Email address'
                        value={email.value}
                        onChange={e => email.onChange(e)}
                        onBlur={e => email.onBlur(e)}
                    />

                    {((phone.isDirty && phone.isEmpty) || (phone.isDirty && phone.phoneError)) && 
                        <div className='errorAuth'>{phone.messageError}</div>
                    }
                    <Form.Control
                        className='formControlAuth'
                        type='tel' 
                        placeholder='Phone number'
                        value={phone.value}
                        onChange={e => phone.onChange(e)}
                        onBlur={e => phone.onBlur(e)}
                    />

                    {(login.isDirty && login.minLengthError) && 
                        <div className='errorAuth'>{login.messageError}</div>
                    }
                    <Form.Control
                        className='formControlAuth'
                        placeholder='Login'
                        value={login.value}
                        onChange={e => login.onChange(e)}
                        onBlur={e => login.onBlur(e)}
                    />

                    {((password.isDirty && password.minLengthError) || (password.isDirty && password.passwordSecurityError)) && 
                        <div className='errorAuth'>{password.messageError}</div>
                    }
                    <Form.Control
                        className='formControlAuth'
                        type='password'
                        placeholder='Password'
                        value={password.value}
                        onChange={e => password.onChange(e)}
                        onBlur={e => password.onBlur(e)}
                    />

                    {((confirmPassword.isDirty && confirmPassword.minLengthError) || (confirmPassword.isDirty && confirmPassword.confirmPasswordError)) && 
                        <div className='errorAuth'>{confirmPassword.messageError}</div>
                    }
                    <Form.Control
                        className='formControlAuth'
                        type='password'
                        placeholder='ConfirmPassword'
                        value={confirmPassword.value}
                        onChange={e => confirmPassword.onChange(e)}
                        onBlur={e => confirmPassword.onBlur(e)}
                    />

                    {(img.isDirty && img.imgError) && <div className='errorAuth'>{img.messageError}</div>}
                    <Form.Control
                        className='formControlAuth'
                        type='file'
                        onChange={e => img.saveImg(e)}
                        onBlur={e => img.onBlur(e)}
                    />

                    <ModalFooter className='modalFooterAuth'>
                        There is an account? <NavLink to={LOGIN_ROUTE}>Sign in</NavLink>
                        <Button
                            className='buttonAuth'
                            variant='outline-primary'
                            disabled={
                                !name.inputValid || 
                                !surname.inputValid || 
                                !phone.inputValid || 
                                !email.inputValid || 
                                !login.inputValid || 
                                !password.inputValid
                            }
                            onClick={click}
                        >
                            Register
                        </Button>

                    </ModalFooter>
                </Form>
            </Container>
        </Row>
    );
})

export default Register;