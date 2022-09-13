import Multiselect from 'multiselect-react-dropdown';
import React, { useContext, useState } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import { updateBrand, formDataBrand } from '../../../http/brandApi';
import { useInput } from '../../../http/validateApi';
import { Context } from '../../../index';
import '../../../css/update/UpdateBrand.css'

const UpdateBrand = ({show, onHide}) => {
    const {brand} = useContext(Context);
    const {category} = useContext(Context);
    const brandId = useInput(0, {isNumberId: {name: 'Brand'}});
    const name = useInput('', {minLength: {value: 3, name: 'Name'}});
    const img = useInput(null, {isImg: { name: 'Img' }} );
    const categoriesId = useInput([], {multiSelect: {name: 'Categories'}})
    const info = useInput('', {minLength: {value: 3, name: 'Info'}});
    const [messageError, setMessageError] = useState('');

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
        } catch (e) {
            setMessageError(e.message);
        }
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title 
                    id='contained-modal-title-vcenter'
                >
                    Update a Brand
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='error-message'>
                    {messageError}
                </div>
                {(brandId.isDirty && brandId.isNumberError) && 
                    <div className='error-message'>
                        {brandId.messageError}
                    </div>}
                <Form.Select
                    className='form-update-brand'
                    
                    onChange={e => brandId.onChange(e)}
                    onBlur={e => brandId.onBlur(e)}
                >
                    <option value={0}>
                        Select a Brand
                    </option>
                    {brand.brands.map(item => (
                        <option
                            value={item.id}
                            key={item.id}
                        >
                            {item.name}
                        </option>
                    ))}
                </Form.Select>

                <Form>
                {(name.isDirty && name.minLengthError) && 
                    <div className='error-message'>
                        {name.messageError}
                    </div>}
                    <Form.Control
                        className='form-update-brand'
                        value={name.value}
                        onChange={e => name.onChange(e)}
                        onBlur={e => name.onBlur(e)}
                        placeholder={`Update 'Name': ${brand.brands.filter(item => {return item.id === Number(brandId.value)}).map(item => item.name)}`}
                    />
                    {(info.isDirty && info.minLengthError) && 
                        <div className='error-message'>
                            {info.messageError}
                        </div>}
                    <Form.Control
                        className='form-update-brand'
                        value={info.value}
                        onChange={e => info.onChange(e)}
                        onBlur={e => info.onBlur(e)}
                        placeholder={`Update 'Info': ${brand.brands.filter(item => {return item.id === Number(brandId.value)}).map(item => item.info)}`}
                    />
                    {(img.isDirty && img.imgError) && 
                        <div className='error-message'>
                            {img.messageError}
                        </div>}
                    <Form.Control
                        className='form-update-brand'
                        type='file'
                        onChange={e => img.saveImg(e)}
                        onBlur={e => img.onBlur(e)}
                    />

                    {(categoriesId.isDirty && categoriesId.multiSelectError) && 
                        <div className='error-message'>
                            {categoriesId.messageError}
                        </div>}
                    <Multiselect 
                        className='form-update-brand'
                        placeholder='Categories: '
                        displayValue='name'
                        value='id'
                        options={category.categories}
                        onSelect={e => categoriesId.onSelect(e)}
                        onRemove={e => categoriesId.onRemove(e)}
                        onBlur={e => categoriesId.onBlur(e)}
                        showCheckbox
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    className='button-update-brand'
                    variant='outline-primary'
                    disabled={
                        !brandId.inputValid || (
                            !name.inputValid && 
                            !info.inputValid && 
                            !categoriesId.inputValid && 
                            !img.inputValid)
                        }
                    onClick={click}
                >
                    Update
                </Button>
                <Button
                    className='button-update-brand'
                    variant='outline-danger'
                    onClick={onHide}
                >
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default UpdateBrand;