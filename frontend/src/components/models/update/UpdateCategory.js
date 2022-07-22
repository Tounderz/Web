import Multiselect from 'multiselect-react-dropdown';
import React, { useContext, useState } from 'react';
import { Form, Modal } from 'react-bootstrap';
import { formDataCategory, updateCategory } from '../../../http/categoryApi';
import { useInput } from '../../../http/validateApi';
import { Context } from '../../../index';

const UpdateCategory = ({show, onHide}) => {
    const {product} = useContext(Context)
    const categoryId = useInput(0, {isNumberId: {name: 'Category'}});
    const name = useInput('', {minLength: {value: 3, name: 'Name'}});
    const shortDescription = useInput('', {minLength: {value: 8, name: 'Short Description'}})
    const info = useInput('', {minLength: {value: 8, name: 'Info'}})
    const brandsId = useInput([], {multiSelect: {name: 'Brands'}})
    const img = useInput(null)
    const [messageError, setMessageError] = useState('')

    const click = async () => {
        try {
            const formData = formDataCategory(categoryId.value, name.value, shortDescription.value, info.value, img.value, brandsId.value);
            await updateCategory(formData);
                categoryId.onChange(0);
                name.onChange('');
                info.onChange('');
                shortDescription.onChange('');
                brandsId.onSelect([]);
                img.saveImg(null);
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
                    Update a Category
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div style={{color: 'red'}}>{messageError}</div>
                {(categoryId.isDirty && categoryId.isNumberError) && <div className='mt-3' style={{color: 'red'}}>{categoryId.messageError}</div>}
                <Form.Select 
                    id='selectCategory' 
                    className='mt-3'
                    onChange={e => categoryId.onChange(e)}
                    onBlur={e => categoryId.onBlur(e)}
                >
                    <option value={0}>
                        Select a category
                    </option>
                    {product.categories.map(category => (
                        <option
                            key={category.id}
                            value={category.id}
                        >
                            {category.name}
                        </option>
                    ))}
                </Form.Select>
                <Form>
                    {(name.isDirty && name.minLengthError) && <div className='mt-3' style={{color: 'red'}}>{name.messageError}</div>}
                    <Form.Control
                        className='mt-3'
                        value={name.value}
                        onChange={e => name.onChange(e)}
                        onBlur={e => name.onBlur(e)}
                        placeholder={`Update 'Name': ${product.categories.filter(item => {return item.id === Number(categoryId.value)}).map(item => item.name)}`}
                    />

                    {(shortDescription.isDirty && shortDescription.minLengthError) && <div className='mt-3' style={{color: 'red'}}>{shortDescription.messageError}</div>}
                    <Form.Control
                        className='mt-3'
                        value={shortDescription.value}
                        onChange={e => shortDescription.onChange(e)}
                        onBlur={e => shortDescription.onBlur(e)}
                        placeholder={`Update 'Short description': ${product.categories.filter(item => {return item.id === Number(categoryId.value)}).map(item => item.shortDescription)}`}
                    />

                    {(info.isDirty && info.minLengthError) && <div className='mt-3' style={{color: 'red'}}>{info.messageError}</div>}
                    <Form.Control
                        className='mt-3'
                        value={info.value}
                        onChange={e => info.onChange(e)}
                        onBlur={e => info.onBlur(e)}
                        placeholder={`Update 'Info': ${product.categories.filter(item => {return item.id === Number(categoryId.value)}).map(item => item.info)}`}
                    />

                    <Form.Control
                        className='mt-3'
                        type='file'
                        onChange={e => img.saveImg(e)}
                    />
                </Form>
                <label className='mt-3'>Brands:</label>
                {(brandsId.isDirty && brandsId.multiSelectError) && <div className='mt-3' style={{color: 'red'}}>{brandsId.messageError}</div>}
                <Multiselect 
                    className=' mt-1'
                    displayValue='name'
                    value='id'
                    options={product.brands}
                    onSelect={e => brandsId.onSelect(e)}
                    onRemove={e => brandsId.onRemove(e)}
                    onBlur={e => brandsId.onBlur(e)}
                    showCheckbox
                />

            </Modal.Body>
            <Modal.Footer>
                <button
                    className="btn-primary m-2"
                    variant={'outline-success'}
                    style={{
                        cursor: 'pointer',
                        borderRadius: '5px'
                    }}
                    disabled={!categoryId.inputValid  || (!name.inputValid && !shortDescription.inputValid && !info.inputValid && !brandsId.inputValid)}
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

export default UpdateCategory;