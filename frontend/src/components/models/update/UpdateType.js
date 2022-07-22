import React, { useContext, useState } from 'react';
import { Form, Modal } from 'react-bootstrap';
import { updateType } from '../../../http/typeApi';
import { useInput } from '../../../http/validateApi';
import { Context } from '../../../index';

const UpdateType = ({show, onHide}) => {
    const {product} = useContext(Context)
    const typeId = useInput(0, {isNumberId: {name: 'Type'}})
    const name = useInput('', {minLength: {value: 3, name: 'Name'}})
    const categoryId = useInput(0, {isNumberId: {name: 'Category'}});
    const [messageError, setMessageError] = useState('')

    const click = async () => {
        try {
            await updateType(typeId.value, name.value, categoryId.value);
                typeId.onChange(0);
                name.onChange('');
                categoryId.onChange(0);
                onHide();
        } catch (error) {
            setMessageError(error.response.data.message)
        }
        
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Update a Type
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div style={{color: 'red'}}>{messageError}</div>
                {(typeId.isDirty && typeId.isNumberError) && <div className='mt-3' style={{color: 'red'}}>{typeId.messageError}</div>}
                <Form.Select
                    className='mt-3'
                    onChange={e => typeId.onChange(e)}
                    onBlur={e => typeId.onBlur(e)}
                >
                    <option value={0}>
                        Select a type
                    </option>
                    {product.types.map(type => (
                        <option
                            value={type.id}
                            key={type.id}
                        >
                            {type.name}
                        </option>
                    ))}
                </Form.Select>
                <Form className='mt-3'>
                    <Form.Control
                        value={name.value}
                        onChange={e => name.onChange(e)}
                        onBlur={e => name.onBlur(e)}
                        placeholder={`Update 'Name': ${product.types.filter(i => { return i.id === typeId}).map(i => i.name)}`}
                    />
                </Form>
                <Form.Select 
                    className='mt-3'
                    onChange={e => categoryId.onChange(e)}
                    onBlur={e => categoryId.onBlur(e)}
                >
                    <option value=''>
                        Update which category the type belongs to
                    </option>
                    {product.categories.map(catetegory => (
                        <option
                            value={catetegory.id}
                            key={catetegory.id}
                        >
                            {catetegory.name}
                        </option>
                    ))}
                </Form.Select>
            </Modal.Body>
            <Modal.Footer>
                <button
                    className="btn-primary m-2"
                    variant={'outline-success'}
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
                    variant={'outline-success'}
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

export default UpdateType;