import React, { useContext, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { Context } from '../../../index';
import { useInput } from '../../../http/validateApi';
import { updateUserByUser } from '../../../http/userApi';

const UpdatePhoto = ({show, onHide}) => {
    const {user} = useContext(Context);
    const img = useInput(null, {isImg: { name: 'Img' }} );
    const [messageError, setMessageError] = useState('');

    const update = async () => {
        try {
            const formData = new FormData();
                formData.append('UserId', user.user.userId);
                formData.append('Img', img.value);
            const data = await updateUserByUser(formData);
                user.setSelectedUser(data.user);
                img.saveImg(null);
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
                    Update Photo
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div style={{color: 'red'}}>{messageError}</div>
                <Form>
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
                    onClick={update}
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

export default UpdatePhoto;