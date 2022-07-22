import React, { useContext, useState } from 'react';
import { Form, Modal } from 'react-bootstrap';
import { Context } from '../../../index';
import { updateInfoProduct } from '../../../http/infoProductApi';
import { useInput } from '../../../http/validateApi';

const UpdateInfoProduct = ({info, show, onHide}) => {
    const {product} = useContext(Context)
    const title = useInput('', {minLength: {value: 3, name: 'Title'}});
    const descriprion = useInput('', {minLength: {value: 3, name: 'Descriprion'}});
    const [messageError, setMessageError] = useState('')

    const click = async () => {
        try {
            const data = await updateInfoProduct(info.id, title.value, descriprion.value);
                product.setInfoProduct(data.info)
                title.onChange('');
                descriprion.onChange('');
                onHide();
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
                    Update Product Info
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div style={{color: 'red'}}>{messageError}</div>
                <Form>
                    <Form.Label>Title:</Form.Label>
                    <Form.Control
                        value={title.value}
                        onChange={e => title.onChange(e)}
                        onBlur={e => title.onBlur(e)}
                        placeholder={info.title}
                    />
                    <Form.Label className='mt-3'>Description:</Form.Label>
                    <Form.Control
                        value={descriprion.value}
                        onChange={e => descriprion.onChange(e)}
                        onBlur={e => descriprion.onBlur(e)}
                        placeholder={info.description}
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
                    onClick={click}
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

export default UpdateInfoProduct;