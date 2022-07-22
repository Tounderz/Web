import React, { useContext, useState } from 'react';
import { Form, Modal } from 'react-bootstrap';
import { Context } from '../../../index';
import { useInput } from '../../../http/validateApi';
import { updateUserByUser } from '../../../http/userApi';

const UpdatePhoto = ({show, onHide}) => {
    const {user} = useContext(Context)
    const img = useInput(null)
    const [messageError, setMessageError] = useState('')

    const update = async () => {
        const formData = new FormData()
        formData.append('UserId', user.idUser)
        formData.append('Img', img.value)

        try {
            const data = await updateUserByUser(formData);
                if (data.user) {
                    user.setSelectedUser(data.user);
                    img.saveImg(null);
                    onHide();
                }
        } catch (error) {
            setMessageError(error.response.data.message)
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
                    <Form.Control
                        className='mt-3'
                        type='file'
                        onChange={e => img.saveImg(e)}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <button
                    className="btn-primary m-2"
                    style={{
                        cursor: 'pointer',
                        borderRadius: '5px'
                    }}
                    onClick={() => update()}
                >
                    Update
                </button>
                <button 
                    className="btn-danger"
                    style={{
                        cursor: 'pointer',
                        borderRadius: '5px'
                    }}
                    onClick={onHide}
                >
                    Close
                </button>
            </Modal.Footer>
        </Modal>
    );
};

export default UpdatePhoto;