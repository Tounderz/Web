import React, { useContext, useState } from "react";
import { REGISTER_ROUTE, WELCOME_ROUTE } from "../../utils/const";
import { NavLink } from 'react-router-dom';
import { Card, Container, FormControl, ModalFooter } from "react-bootstrap";
import { Context } from "../../index";
import { useNavigate } from "react-router";
import { fetchUser, signIn } from "../../http/userApi";
import { useInput } from "../../http/validateApi";

const Login = () => {
    const {user} = useContext(Context)
    const [message, setMessage] = useState('')
    const login = useInput('', {minLength: {value: 3, name: 'login'}});
    const password = useInput('', {minLength: {value: 4, name: 'password'}});
    const navigate = useNavigate();

    

    const click = async () => {
        try {
            const data = await signIn(login.value, password.value);
                const accessToken = data?.accessToken;
                localStorage.setItem('accessToken', accessToken);
                user.setUser(data.user);
            const dataUser = await fetchUser(user.user.login);
                user.setSelectedUser(dataUser.user);
                login.onChange('');
                password.onChange('');
            navigate(WELCOME_ROUTE);
        } catch (error) {
            setMessage(error.response.data.message);
        }
    }

    return (
        <Container className='d-flex justify-content-center align-items-center' >
            <Card
                style={{
                    width: 500
                    }}
                    className='p-5'
                >
                <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
                <div style={{color: 'red'}}>{message}</div>
                {(login.isDirty && login.minLengthError) && <div className='mt-3' style={{color: 'red'}}>{login.messageError}</div>}
                <FormControl
                    className='mt-3'
                    placeholder='Login'
                    value={login.value}
                    onChange={e => login.onChange(e)}
                    onBlur={e => login.onBlur(e)}
                />

                {((password.isDirty && password.minLengthError)) && <div className='mt-3' style={{color: 'red'}}>{password.messageError}</div>}
                <FormControl
                    className='mt-3'
                    type="password"
                    placeholder="Password"
                    value={password.value}
                    onChange={e => password.onChange(e)}
                    onBlur={e => password.onBlur(e)}
                />
                <div>Remembre me <input type="checkbox" value="remember-me"/></div>
                <ModalFooter className='d-flex justify-content-betwwen mt-3 pl-3 pr-3'>
                    Not an account? <NavLink to={REGISTER_ROUTE}>Register</NavLink>
                    <button 
                        disabled={!login.inputValid || !password.inputValid}
                        className="btn-primary"
                        variant={'outline-success'}
                        onClick={click}
                        style={{
                            cursor: 'pointer',
                            borderRadius: '5px',
                        }}
                    >
                        Sign in
                    </button>
                </ModalFooter>
            </Card>
        </Container>
    );
}

export default Login;