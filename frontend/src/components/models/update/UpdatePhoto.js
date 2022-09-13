import React, { useContext, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { Context } from '../../../index';
import { useInput } from '../../../http/validateApi';
import { updateUserByUser } from '../../../http/userApi';
import '../../../css/update/UpdatePhoto.css'

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
        } catch (e) {
            setMessageError(e.message);
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
                <Modal.Title 
                    id='contained-modal-title-vcenter'
                >
                    Update Photo
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='error-message'>{messageError}</div>
                <Form>
                    {(img.isDirty && img.imgError) && 
                        <div className='error-message'>
                            {img.messageError}
                        </div>}
                    <Form.Control
                        className='form-update-photo'
                        type='file'
                        onChange={e => img.saveImg(e)}
                        onBlur={e => img.onBlur(e)}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    className='button-update-photo'
                    variant='outline-primary'
                    disabled={!img.inputValid}
                    onClick={update}
                >
                    Update
                </Button>
                <Button
                    className='button-update-photo'
                    variant='outline-danger'
                    onClick={onHide}
                >
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default UpdatePhoto;