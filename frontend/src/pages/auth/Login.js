import React, { useContext, useState } from "react";
import { REGISTER_ROUTE, PERSONAL_ACCOUNT_ROUTE } from "../../utils/const";
import { NavLink } from 'react-router-dom';
import { Button, Container, Form, ModalFooter, Row } from "react-bootstrap";
import { Context } from "../../index";
import { useNavigate } from "react-router";
import {  fetchUser, signIn } from "../../http/userApi";
import { useInput } from "../../http/validateApi";
import '../../css/Auth.css'
import RetrieveYourPasswordModel from "../../components/models/RetrieveYourPasswordModel";
import { observer } from "mobx-react-lite";

const Login = observer(() => {
    const {user} = useContext(Context);
    const {messages} = useContext(Context);
    const [messageError, setMessageError] = useState('');
    const login = useInput('', {minLength: {value: 3, name: 'login'}});
    const password = useInput('', {minLength: {value: 4, name: 'password'}});
    const navigate = useNavigate();
    const [retrievePasswordVisible, setRetrievePasswordVisible] = useState(false);

    const click = async () => {
        try {
            const data = await signIn(login.value, password.value);
                const accessToken = data.accessToken;
                localStorage.setItem('accessToken', accessToken);
                user.setUser(data.user);
            const dataUser = await fetchUser(user.user.login);
                user.setSelectedUser(dataUser.user);
                login.onChange('');
                password.onChange('');
            navigate(PERSONAL_ACCOUNT_ROUTE);
        } catch (e) {
            setMessageError(e.message);
        } finally {
            messages.setMessage('');
        }
    }

    return (
        <Row className='loginFonPage'>
            <Container className='containerAuth'>
                <Form
                    className='formAuth'
                >
                    <h1 style={{ textName: 'italic' }}>Please Sign In</h1>
                    <h5 style={{ textName: 'italic' }}>{messages.message}</h5>
                    <div className='errorAuth'>{messageError}</div>
                    {(login.isDirty && login.minLengthError) && <div className='errorAuth'>{login.messageError}</div>}
                    <Form.Control
                        className='formControlAuth'
                        placeholder='Login'
                        value={login.value}
                        onChange={e => login.onChange(e)}
                        onBlur={e => login.onBlur(e)}
                    />

                    {((password.isDirty && password.minLengthError)) && <div className='errorAuth'>{password.messageError}</div>}
                    <Form.Control
                        className='formControlAuth'
                        type="password"
                        placeholder="Password"
                        value={password.value}
                        onChange={e => password.onChange(e)}
                        onBlur={e => password.onBlur(e)}
                    />
                    
                    <div 
                        className='checkboxLogin'
                    >
                        Remembre me 
                        <input 
                            className='input-checkbox-auth'
                            type='checkbox' 
                            value='remember-me'
                        />
                        <Button
                            variant='outline-primary'
                            className='forgot-your-password-auth'
                            onClick={() => setRetrievePasswordVisible(true)}
                        >
                            Forgot your password?
                        </Button>
                    </div>
                    
                    <ModalFooter 
                        className='modalFooterAuth'
                    >
                        Not an account? 
                        <NavLink 
                            className='nav-link-sign-up'
                            to={REGISTER_ROUTE}
                        >
                            Sign Up
                        </NavLink>
                        <Button 
                            className='buttonAuth'
                            variant='outline-primary'
                            disabled={!login.inputValid || !password.inputValid}
                            onClick={click}
                        >
                            Sign in
                        </Button>
                    </ModalFooter>
                </Form>
            </Container>
            <RetrieveYourPasswordModel  show={retrievePasswordVisible} onHide={() => setRetrievePasswordVisible(false)}/>
        </Row>
    );
});

export default Login;