import React, { useContext, useState } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import { Context } from '../../../index';
import { updateInfoProduct } from '../../../http/infoProductApi';
import { useInput } from '../../../http/validateApi';
import '../../../css/update/UpdateInfoProduct.css'

const UpdateInfoProduct = ({info, show, onHide}) => {
    const {product} = useContext(Context);
    const title = useInput('', {minLength: {value: 1, name: 'Title'}});
    const descriprion = useInput('', {minLength: {value: 3, name: 'Descriprion'}});
    const [messageError, setMessageError] = useState('');

    const click = async () => {
        try {
            const data = await updateInfoProduct(info.id, title.value, descriprion.value);
                product.setInfoProduct(data.info)
                close();
        } catch (e) {
            // setMessageError(e.message)
            setMessageError(e.response.data.message);
        }
    }

    const close = () => {
        title.onChange('');
        descriprion.onChange('');
        setMessageError('');
        onHide();
    }

    return (
        <Modal
            show={show}
            onHide={close}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title 
                    id='contained-modal-title-vcenter'
                >
                    Update Product Info
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='error-message'>
                    {messageError}
                </div>
                <Form>
                    {(title.isDirty && title.minLengthError) && 
                        <div className='error-message'>
                            {title.messageError}
                        </div>}
                    <Form.Control
                        className='form-update-info'
                        value={title.value}
                        onChange={e => title.onChange(e)}
                        onBlur={e => title.onBlur(e)}
                        placeholder={`Title: ${info.title}`}
                    />

                    {(descriprion.isDirty && descriprion.minLengthError) && 
                        <div className='error-message'>
                            {descriprion.messageError}
                        </div>}
                    <Form.Control
                        className='form-update-info'
                        value={descriprion.value}
                        onChange={e => descriprion.onChange(e)}
                        onBlur={e => descriprion.onBlur(e)}
                        placeholder={`Description: ${info.description}`}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    className='button-update-info'
                    variant='outline-primary'
                    disabled={
                        !title.inputValid && 
                        !descriprion.inputValid
                    }
                    onClick={click}
                >
                    Update
                </Button>
                <Button 
                    className='button-update-info'
                    variant='outline-danger'
                    onClick={close}
                >
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default UpdateInfoProduct;