import React, { useContext, useState } from 'react';
import { Form, Modal } from 'react-bootstrap';
import { Context } from '../../../index';
import { createInfoProduct } from '../../../http/infoProductApi';
import { useInput } from '../../../http/validateApi';

const CreateInfoProduct = ({show, onHide, productId}) => {
    const {product} = useContext(Context)
    const title = useInput('', {minLength: {value: 1, name: 'Title'}});
    const descriprion = useInput('', {minLength: {value: 3, name: 'Descriprion'}});
    const [messageError, setMessageError] = useState('')

    const click = async () => {
        try {
            const data = await createInfoProduct(productId, title.value, descriprion.value)
                title.onChange('')
                descriprion.onChange('')
                product.setInfoProduct(data.info)
                onHide()
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
                    New Product Info
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div style={{color: 'red'}}>{messageError}</div>
                <Form>
                    {(title.isDirty && title.minLengthError) && <div className='mt-3' style={{color: 'red'}}>{title.messageError}</div>}
                    <Form.Label>Title:</Form.Label>
                    <Form.Control
                        value={title.value}
                        onChange={e => title.onChange(e)}
                        onBlur={e => title.onBlur(e)}
                        placeholder='Title'
                    />
                    {(descriprion.isDirty && descriprion.minLengthError) && <div className='mt-3' style={{color: 'red'}}>{descriprion.messageError}</div>}
                    <Form.Label className='mt-3'>Description:</Form.Label>
                    <Form.Control
                        value={descriprion.value}
                        onChange={e => descriprion.onChange(e)}
                        onBlur={e => descriprion.onBlur(e)}
                        placeholder='Description'
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <button
                    className='btn-primary m-2'
                    style={{
                        cursor: 'pointer',
                        borderRadius: '5px'
                    }}
                    disabled={!title.inputValid || !descriprion.inputValid}
                    onClick={click}
                >
                    Add
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

export default CreateInfoProduct;