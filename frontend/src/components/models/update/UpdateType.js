import React, { useContext, useState } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import { updateType } from '../../../http/typeApi';
import { useInput } from '../../../http/validateApi';
import { Context } from '../../../index';
import '../../../css/update/UpdateType.css'
import { observer } from 'mobx-react-lite';

const UpdateType = observer(({show, onHide}) => {
    const {type} = useContext(Context);
    const {category} = useContext(Context);
    const typeId = useInput(0, {isNumberId: {name: 'Type'}})
    const name = useInput('', {minLength: {value: 3, name: 'Name'}})
    const categoryId = useInput(0, {isNumberId: {name: 'Category'}});
    const [messageError, setMessageError] = useState('')

    const click = async () => {
        try {
            const data = await updateType(typeId.value, name.value, categoryId.value);
                type.setTypes(data.types);
                close();
        } catch (e) {
            setMessageError(e.response.data.message);
        }
    }

    const close = () => {
        document.getElementById('updateSelectType').value = '0';
        typeId.onChange('');
        name.onChange('');
        document.getElementById('updateSelectCategoryByType').value = '0';
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
                    Update a Type
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div style={{color: 'red'}}>{messageError}</div>
                <Form>
                    {(typeId.isDirty && typeId.isNumberError) && 
                        <div className='error-message'>
                            {typeId.messageError}
                        </div>}
                    <Form.Select
                        id='updateSelectType'
                        className='form-update-type'
                        onChange={e => typeId.onChange(e)}
                        onBlur={e => typeId.onBlur(e)}
                    >
                        <option 
                            key='0'
                            value='0'
                        >
                            Select a type
                        </option>
                        {type.types.map(typeItem => (
                            <option
                                value={typeItem.id}
                                key={typeItem.id}
                            >
                                {typeItem.name}
                            </option>
                        ))}
                    </Form.Select>

                    {(name.isDirty && name.minLengthError) && 
                        <div className='error-message'>
                            {name.messageError}
                        </div>}
                    <Form.Control
                        className='form-update-type'
                        value={name.value}
                        onChange={e => name.onChange(e)}
                        onBlur={e => name.onBlur(e)}
                        placeholder={`Update 'Name': ${type.types.filter(i => { return i.id === typeId}).map(i => i.name)}`}
                    />
                
                     {(categoryId.isDirty && categoryId.isNumberError) && 
                        <div className='error-message'>
                            {categoryId.messageError}
                        </div>}
                    <Form.Select
                        id='updateSelectCategoryByType'
                        className='form-update-type'
                        onChange={e => categoryId.onChange(e)}
                        onBlur={e => categoryId.onBlur(e)}
                    >
                        <option 
                            key='0'
                            value='0'
                        >
                            Update which category the type belongs to
                        </option>
                        {category.categories.map(catetegoryItem => (
                            <option
                                value={catetegoryItem.id}
                                key={catetegoryItem.id}
                            >
                                {catetegoryItem.name}
                            </option>
                        ))}
                    </Form.Select>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    className='button-update-type'
                    variant='outline-primary'
                    disabled={
                        !typeId.inputValid || 
                        (!name.inputValid && 
                        !categoryId.inputValid)
                    }
                    onClick={click}
                >
                    Update
                </Button>
                <Button
                    className='button-update-type'
                    variant='outline-danger'
                    onClick={close}
                >
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
});

export default UpdateType;