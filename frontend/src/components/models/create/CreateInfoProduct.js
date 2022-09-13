import React, { useContext, useState } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import { Context } from '../../../index';
import { createInfoProduct } from '../../../http/infoProductApi';
import { useInput } from '../../../http/validateApi';
import '../../../css/create/CreateInfoProduct.css'

const CreateInfoProduct = ({show, onHide, productId}) => {
    const {product} = useContext(Context);
    const title = useInput('', {minLength: {value: 1, name: 'Title'}});
    const descriprion = useInput('', {minLength: {value: 3, name: 'Descriprion'}});
    const [messageError, setMessageError] = useState('')

    const click = async () => {
        try {
            const data = await createInfoProduct(productId, title.value, descriprion.value)
                title.onChange('');
                descriprion.onChange('');
                product.setInfoProduct(data.info);
                onHide();
        } catch (e) {
            setMessageError(e.message)
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
                <div className='error-message'>{messageError}</div>
                <Form>
                    {(title.isDirty && title.minLengthError) && 
                        <div className='error-message'>
                            {title.messageError}
                        </div>}
                    <Form.Control
                        className='form-control-create-info-product'
                        value={title.value}
                        onChange={e => title.onChange(e)}
                        onBlur={e => title.onBlur(e)}
                        placeholder='Title'
                    />
                    {(descriprion.isDirty && descriprion.minLengthError) && 
                        <div className='error-message'>
                            {descriprion.messageError}
                        </div>}
                    <Form.Control
                        className='form-control-create-info-product'
                        value={descriprion.value}
                        onChange={e => descriprion.onChange(e)}
                        onBlur={e => descriprion.onBlur(e)}
                        placeholder='Description'
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    className='button-create-info-product'
                    variant='outline-primary'
                    disabled={!title.inputValid || !descriprion.inputValid}
                    onClick={click}
                >
                    Create
                </Button>
                <Button
                    className='button-create-info-product'
                    variant='outline-danger'
                    onClick={onHide}
                >
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateInfoProduct;