import Multiselect from 'multiselect-react-dropdown';
import React, { useContext, useState } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import { formDataCategory, updateCategory } from '../../../http/categoryApi';
import { useInput } from '../../../http/validateApi';
import { Context } from '../../../index';
import '../../../css/update/UpdateCategory.css'
import { observer } from 'mobx-react-lite';
import { fetchBrandsByCategory } from '../../../http/brandApi';

const UpdateCategory = observer(({show, onHide}) => {
    const {category} = useContext(Context);
    const {brand} = useContext(Context);
    const categoryId = useInput(0, {isNumberId: {name: 'Category'}});
    const name = useInput('', {minLength: {value: 3, name: 'Name'}});
    const shortDescription = useInput('', {minLength: {value: 8, name: 'Short Description'}});
    const info = useInput('', {minLength: {value: 8, name: 'Info'}});
    const brandsId = useInput([], {multiSelect: {name: 'Brands'}});
    const img = useInput(null, {isImg: { name: 'Img' }} );
    const [messageError, setMessageError] = useState('');

    const click = async () => {
        try {
            const formData = formDataCategory(categoryId.value, name.value, shortDescription.value, info.value, img.value, brandsId.value);
            const data = await updateCategory(formData);
                category.setCategories(data.categories);
                close();
        } catch (e) {
            setMessageError(e.response.data.message);
        }
    }

    const onChangeCategoryId = async (e) => {
        brand.setBrandsByCategory([]);
        brandsId.onSelect([]);
        if (/^-?\d+$/.test(e?.target?.value) && e?.target?.value > 0) {
            const data = await fetchBrandsByCategory(e?.target?.value);
                brand.setBrandsByCategory(data.brandsByCategory);
        }

        categoryId.onChange(e)
    }

    const close = () => {
        document.getElementById('updateSelectCategory').value = '0';
        categoryId.onChange(0);
        name.onChange('');
        info.onChange('');
        shortDescription.onChange('');
        brandsId.onSelect([]);
        img.saveImg(null);
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
                    Update a Category
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='error-message'>
                    {messageError}
                </div>
                {(categoryId.isDirty && categoryId.isNumberError) && 
                    <div className='error-message'>
                        {categoryId.messageError}
                    </div>}
                <Form.Select 
                    id='updateSelectCategory'
                    className='form-update-category'
                    onChange={e => onChangeCategoryId(e)}
                    onBlur={e => categoryId.onBlur(e)}
                >
                    <option 
                        key='0'
                        value='0'
                    >
                        Select a category
                    </option>
                    {category.categories.map(category => (
                        <option
                            key={category.id}
                            value={category.id}
                        >
                            {category.name}
                        </option>
                    ))}
                </Form.Select>
                <Form>
                    {(name.isDirty && name.minLengthError) && 
                        <div className='error-message'>
                            {name.messageError}
                        </div>}
                    <Form.Control
                        className='form-update-category'
                        value={name.value}
                        onChange={e => name.onChange(e)}
                        onBlur={e => name.onBlur(e)}
                        placeholder={`Update 'Name': ${category.categories.filter(item => {
                            return item.id === Number(categoryId.value)}).map(item => item.name)}`
                        }
                    />

                    {(shortDescription.isDirty && shortDescription.minLengthError) && 
                        <div className='error-message'>
                            {shortDescription.messageError}
                        </div>}
                    <Form.Control
                        className='form-update-category'
                        value={shortDescription.value}
                        onChange={e => shortDescription.onChange(e)}
                        onBlur={e => shortDescription.onBlur(e)}
                        placeholder={`Update 'Short description': ${category.categories.filter(item => {
                            return item.id === Number(categoryId.value)}).map(item => item.shortDescription)}`
                        }
                    />

                    {(info.isDirty && info.minLengthError) && 
                        <div className='error-message'>
                            {info.messageError}
                        </div>}
                    <Form.Control
                        className='form-update-category'
                        value={info.value}
                        onChange={e => info.onChange(e)}
                        onBlur={e => info.onBlur(e)}
                        placeholder={`Update 'Info': ${category.categories.filter(item => {
                            return item.id === Number(categoryId.value)}).map(item => item.info)}`
                        }
                    />

                    {(img.isDirty && img.imgError) && 
                        <div className='error-message'>
                            {img.messageError}
                        </div>}
                    <Form.Control
                        className='form-update-category'
                        type='file'
                        onChange={e => img.saveImg(e)}
                        onBlur={e => img.onBlur(e)}
                    />
                </Form>
                {(brandsId.isDirty && brandsId.multiSelectError) && 
                    <div className='error-message'>
                        {brandsId.messageError}
                    </div>}
                <Multiselect 
                    className='form-update-category'
                    placeholder='Brands: '
                    displayValue='name'
                    selectedValues={brand.brandsByCategory}
                    value='id'
                    options={brand.brands}
                    onSelect={e => brandsId.onSelect(e)}
                    onRemove={e => brandsId.onRemove(e)}
                    onBlur={e => brandsId.onBlur(e)}
                    showCheckbox
                />

            </Modal.Body>
            <Modal.Footer>
                <Button
                    className='button-update-category'
                    variant='outline-primary'
                    disabled={
                        !categoryId.inputValid  || (
                            !name.inputValid && 
                            !shortDescription.inputValid && 
                            !info.inputValid && 
                            !brandsId.inputValid && 
                            !img.inputValid
                        )
                    }
                    onClick={click}
                >
                    Update
                </Button>
                <Button 
                    className='button-update-category'
                    variant='outline-danger'
                    onClick={close}
                >
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
});

export default UpdateCategory;