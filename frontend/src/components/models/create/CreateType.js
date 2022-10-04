import React, { useContext, useState } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import { Context } from '../../../index';
import { createType } from '../../../http/typeApi';
import { useInput } from '../../../http/validateApi';
import '../../../css/create/CreateType.css'

const CreateType = ({show, onHide}) => {
    const {category} = useContext(Context);
    const name = useInput('', {minLength: {value: 3, name: 'Name'}});
    const categoryId = useInput(0, {isNumberId: {name: 'Category'}});
    const [messageError, setMessageError] = useState('')

    const click = async () => {
        try {
            createType(name.value, categoryId.value);
                close();
        } catch (e) {
            setMessageError(e.response.data.message);
        }
    }

    const close = () => {
        name.onChange('');
        document.getElementById('createSelectTypeCategory').value = '0';
        categoryId.onChange('');
        setMessageError('');
        onHide();
    }

    return (
        <Modal
            show={show}
            onHide={close}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title 
                    id='contained-modal-title-vcenter'
                >
                    New Type
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div style={{color: 'red'}}>{messageError}</div>
                <Form>
                    {(name.isDirty && name.minLengthError) && 
                        <div className='error-message'>
                            {name.messageError}
                        </div>}
                    <Form.Control
                        className='form-control-create-type'
                        value={name.value}
                        onChange={e => name.onChange(e)}
                        onBlur={e => name.onBlur(e)}
                        placeholder={'Enter the type name'}
                    />
                </Form>
                
                {(categoryId.isDirty && categoryId.isNumberError) && 
                    <div className='error-message'>
                        {categoryId.messageError}
                    </div>}
                <Form.Select
                    id='createSelectTypeCategory'
                    className='form-control-create-type' 
                    onChange={e => categoryId.onChange(e)}
                    onBlur={e => categoryId.onBlur(e)}
                >
                    <option 
                        key='0'
                        value='0'
                    >
                        Select a category
                    </option>
                    {category.categories.map(item => (
                        <option
                            key={item.id}
                            value={item.id}
                        >
                            {item.name}
                        </option>
                    ))}
                </Form.Select>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    className='button-create-type'
                    variant='outline-primary'
                    disabled={!name.inputValid || !categoryId.inputValid}
                    onClick={click}
                >
                    Create
                </Button>
                <Button
                    className='button-create-type'
                    variant='outline-danger'
                    onClick={close}
                >
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateType;