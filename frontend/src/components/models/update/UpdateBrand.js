import Multiselect from 'multiselect-react-dropdown';
import React, { useContext, useState } from 'react';
import { Form, Modal } from 'react-bootstrap';
import { updateBrand, formDataBrand } from '../../../http/brandApi';
import { useInput } from '../../../http/validateApi';
import { Context } from '../../../index';

const UpdateBrand = ({show, onHide}) => {
    const {product} = useContext(Context)
    const brandId = useInput(0, {isNumberId: {name: 'Brand'}});
    const name = useInput('', {minLength: {value: 3, name: 'Name'}});
    const img = useInput(null)
    const categoriesId = useInput([], {multiSelect: {name: 'Categories'}})
    const info = useInput('', {minLength: {value: 3, name: 'Info'}});
    const [messageError, setMessageError] = useState('')

    const click = async () => {
        try {
            const formData = formDataBrand(brandId.value, name.value, info.value, categoriesId.value, img.value);
            await updateBrand(formData);
                brandId.onChange(0);
                name.onChange('');
                info.onChange('');
                categoriesId.onSelect([]);
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
                    Update a Brand
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div style={{color: 'red'}}>{messageError}</div>
                {(brandId.isDirty && brandId.isNumberError) && <div className='mt-3' style={{color: 'red'}}>{brandId.messageError}</div>}
                <Form.Select
                    className='mt-3'
                    onChange={e => brandId.onChange(e)}
                    onBlur={e => brandId.onBlur(e)}
                >
                    <option value={0}>
                        Select a Brand
                    </option>
                    {product.brands.map(item => (
                        <option
                            value={item.id}
                            key={item.id}
                        >
                            {item.name}
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
                        placeholder={`Update 'Name': ${product.brands.filter(item => {return item.id === Number(brandId.value)}).map(item => item.name)}`}
                    />
                    {(info.isDirty && info.minLengthError) && <div className='mt-3' style={{color: 'red'}}>{info.messageError}</div>}
                    <Form.Control
                        className='mt-3'
                        value={info.value}
                        onChange={e => info.onChange(e)}
                        onBlur={e => info.onBlur(e)}
                        placeholder={`Update 'Info': ${product.brands.filter(item => {return item.id === Number(brandId.value)}).map(item => item.info)}`}
                    />
                    <Form.Control
                        className='mt-3'
                        type='file'
                        onChange={e => img.saveImg(e)}
                    />

                    <label className='mt-3'>Categories:</label>
                    <Multiselect 
                        className=' mt-1'
                        displayValue='name'
                        value='id'
                        options={product.categories}
                        onSelect={e => categoriesId.onSelect(e)}
                        onRemove={e => categoriesId.onRemove(e)}
                        onBlur={e => categoriesId.onBlur(e)}
                        showCheckbox
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <button
                    className="btn-primary m-2"
                    variant={'outline-success'}
                    style={{
                        cursor: 'pointer',
                        borderRadius: '5px'
                    }}
                    disabled={!brandId.inputValid || (!name.inputValid && !info.inputValid && !categoriesId.inputValid)}
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

export default UpdateBrand;