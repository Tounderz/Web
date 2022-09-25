import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Context } from '../../index';
import { confirmEmail } from '../../http/userApi';
import { LOGIN_ROUTE, VERIFY_EMAIL_ROUTE } from '../../utils/const';
import { Button, Card, Container, Form, ModalFooter, Row, Spinner } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { useInput } from '../../http/validateApi';

const VerifyEmail = observer(() => {
    const navigate = useNavigate();
    const {messages} = useContext(Context);
    const email = useInput('', {minLength: {value: 4, name: 'Email'}, isEmail: true});
    const search = useLocation().search;
    const token = new URLSearchParams(search).get('token');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(async () => {
            const data = await verifyEmail();
            if (data.confirmEmail === 'true') {
                messages.setMessage(data.message);
                navigate(LOGIN_ROUTE);
            } else {
                messages.setMessageError('You have not confirmed the email address!');
                navigate(VERIFY_EMAIL_ROUTE);
            }
            
            setLoading(false);
        }, 1000)
    }, )

    const verifyEmail = async () => {
        try {
            const data = await confirmEmail(token);
            return data;
        } catch (e) {
            messages.setMessageError(e.data.request.message);
            navigate(VERIFY_EMAIL_ROUTE);
        }
    }

    if (loading) {
        return <Spinner animation={'grow'}/>
    }

    const click = () => {
        
    }

    return (
        <Row className='orderFonPage'>
            <Container className='containerOrder'>
                <Card className='cardOrder'>
                    <h2>Send an email again</h2>
                    <div className='error-message'>{messages.messageError}</div>
                    {(email.isDirty && email.minLengthError) && <div className='error-message'>{email.messageError}</div>}
                    {(email.isDirty && email.emailError) && <div className='error-message'>{email.messageError}</div>}
                    <Form.Control
                        className='formControlOrder'
                        placeholder='Email'
                        value={email.value}
                        onChange={e => email.onChange(e)}
                        onBlur={e => email.onBlur(e)}
                    />

                    <ModalFooter
                        className='modalFooterOrder'
                    >
                        <Button
                            className='buttonOrder'
                            variant='outline-primary'
                            disabled={!email.inputValid}
                            onClick={click}
                        >
                            Send
                        </Button>
                    </ModalFooter>
                </Card>
            </Container>
        </Row>
    );
});

export default VerifyEmail;