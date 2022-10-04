import React, { useContext, useState } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import {  formDataProduct, updateProduct } from '../../../http/productApi';
import { Context } from '../../../index';
import { useInput } from '../../../http/validateApi';
import { PAGE_FIRST, TRUE_AND_FALSE } from '../../../utils/const';
import '../../../css/update/UpdateProduct.css'
import { observer } from 'mobx-react-lite';

const UpdateProduct = observer(({show, onHide}) => {
    const {product} = useContext(Context);
    const {category} = useContext(Context);
    const {brand} = useContext(Context);
    const {type} = useContext(Context);
    const {page} = useContext(Context);
    const name = useInput('', {minLength: {value: 3, name: 'Name'}});
    const categoryId = useInput(0, {isNumberId: {name: 'Category'}})
    const brandId = useInput(0, {isNumberId: {name: 'Brand'}})
    const typeId = useInput(0, {isNumberId: {name: 'Type'}})
    const shortDescription = useInput('', {minLength: {value: 8, name: 'Short Description'}});
    const price = useInput(0, {isPrice: {value: 3, name: 'Price'}});
    const isFavourite = useInput(0, {isNumberId: {name: 'IsFavourite'}})
    const available = useInput(0, {isNumberId: {name: 'Available'}})
    const img = useInput(null, {isImg: { name: 'Img' }} )
    const [messageError, setMessageError] = useState('')
    
    const update = async () => {
        try {
            const formData = formDataProduct(
                product.selectedProduct.id, name.value, categoryId.value,
                typeId.value, brandId.value, shortDescription.value,
                isFavourite.value, available.value, price.value, img.value
            );

            const data = await updateProduct(formData);
                product.setProducts(data.products);
                page.setCurrentPage(PAGE_FIRST);
                page.setCountPages(data.countPages);
                product.setSelectedProduct({});
                close();
        } catch (e) {
            setMessageError(e.response.data.message);
        }
    }

    const close = () => {
        name.onChange('');
        document.getElementById('updateProductSelectCategory').value = '0';
        categoryId.onChange('');
        document.getElementById('updateProductSelectType').value = '0';
        typeId.onChange('');
        document.getElementById('updateProductSelectBrand').value = '0';
        brandId.onChange('');
        document.getElementById('updateProductSelectIsFavourite').value = '0';
        isFavourite.onChange('');
        document.getElementById('updateProductSelectAvailable').value = '0';
        available.onChange('');
        shortDescription.onChange('');
        price.onChange('');
        img.saveImg(null);
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
                    {'Update a Product: ' + product.selectedProduct.name}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='error-message'>{messageError}</div>
                <Form>
                    {(categoryId.isDirty && categoryId.isNumberError) && 
                        <div className='error-message'>
                            {categoryId.messageError}
                        </div>}
                    <Form.Select
                        className='form-update-product'
                        id='updateProductSelectCategory'
                        onChange={e => categoryId.onChange(e)}
                        onBlur={e => categoryId.onBlur(e)}
                    >
                        <option
                            key='0'
                            value='0'
                        >
                            {'Assigned category: ' + category.categories.filter(categoryItem => {
                                return categoryItem.id === product.selectedProduct.categoryId})
                                .map(categoryItem => categoryItem.name)}
                        </option>
                            {category.categories.map(categoryItem => (
                                <option
                                    key={categoryItem.id}
                                    value={categoryItem.id}
                                >
                                    {categoryItem.name}
                                </option>
                            ))}
                    </Form.Select>

                    {(typeId.isDirty && typeId.isNumberError) && 
                        <div className='error-message'>
                            {typeId.messageError}
                        </div>}
                    <Form.Select
                        id='updateProductSelectType'
                        className='form-update-product' 
                        onChange={e => typeId.onChange(e)}
                        onBlur={e => typeId.onBlur(e)}
                    >
                        <option
                            key='0'
                            value='0'
                        >
                            {'Assigned type: ' + type.types.filter(typeImet => { 
                                return typeImet.id === product.selectedProduct.typeId})
                                .map(typeImet => typeImet.name)}
                        </option>
                            {type.types.map(typeImet => (
                                <option
                                    key={typeImet.id}
                                    value={typeImet.id}
                                >
                                    {typeImet.name}
                                </option>
                            ))}
                    </Form.Select>

                    {(brandId.isDirty && brandId.isNumberError) && 
                        <div className='error-message'>
                            {brandId.messageError}
                        </div>}
                    <Form.Select
                        id='updateProductSelectBrand'
                        className='form-update-product' 
                        onChange={e => brandId.onChange(e)}
                        onBlur={e => brandId.onBlur(e)}
                    >
                        <option
                            key='0'
                            value='0'
                        >
                            {'Assigned brand: ' + brand.brands.filter(brandItem => { 
                                return brandItem.id === product.selectedProduct.brandId})
                                .map(brandItem => brandItem.name)}
                        </option>
                            {brand.brands.map(brandItem => (
                                <option
                                    key={brandItem.id}
                                    value={brandItem.id}
                                >
                                    {brandItem.name}
                                </option>
                            ))}
                    </Form.Select> 
                    
                    {(name.isDirty && name.minLengthError) && 
                        <div className='error-message'>
                            {name.messageError}
                        </div>}
                    <Form.Control
                        className='form-update-product' 
                        value={name.value}
                        onChange={e => name.onChange(e)}
                        onBlur={e => name.onBlur(e)}
                        placeholder={`Update Name: '${product.selectedProduct.name}'`}
                    />
                    {(shortDescription.isDirty && shortDescription.minLengthError) && 
                        <div className='error-message'>
                            {shortDescription.messageError}
                        </div>}
                    <Form.Control
                        className='form-update-product' 
                        value={shortDescription.value}
                        onChange={e => shortDescription.onChange(e)}
                        onBlur={e => shortDescription.onBlur(e)}
                        placeholder={`Update Short Description: '${product.selectedProduct.shortDescription}'`}
                    />
                
                    {(isFavourite.isDirty && isFavourite.isNumberError) && 
                        <div className='error-message'>
                            {isFavourite.messageError}
                        </div>}
                    <Form.Select
                        id='updateProductSelectIsFavourite'
                        className='form-update-product' 
                        onChange={e =>isFavourite.onChange(e)}
                        onBlur={e => isFavourite.onBlur(e)}
                    >
                        <option 
                            key='0'
                            value='0'
                        >
                            IsFavourite
                        </option>
                        {TRUE_AND_FALSE.map((item, id) => (
                            <option
                                key={id + 1}
                                value={id + 1}
                            >
                                {item}
                            </option>
                        ))}
                    </Form.Select>

                    {(available.isDirty && available.isNumberError) && 
                        <div className='error-message'>
                            {available.messageError}
                        </div>}
                    <Form.Select
                        id='updateProductSelectAvailable'
                        className='form-update-product' 
                        onChange={e =>available.onChange(e)}
                        onBlur={e => available.onBlur(e)}
                    >
                        <option 
                            key='0'
                            value='0'
                        >
                            Available
                        </option>
                        {TRUE_AND_FALSE.map((item, id) => (
                            <option
                                key={id + 1}
                                value={id + 1}
                            >
                                {item}
                            </option>
                        ))}
                    </Form.Select>

                    {(price.isDirty && price.priceError) && 
                        <div className='error-message'>
                            {price.messageError}
                        </div>}
                    <Form.Control
                        className='form-update-product' 
                        value={price.value}
                        onChange={e => price.onChange(e)}
                        onBlur={e => price.onBlur(e)}
                        placeholder='Enter the cost of the product'
                        type='number'
                    />
                    {(img.isDirty && img.imgError) && 
                        <div className='error-message'>
                            {img.messageError}
                        </div>}
                    <Form.Control
                        className='form-update-product' 
                        type='file'
                        onChange={e => img.saveImg(e)}
                        onBlur={e => img.onBlur(e)}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    className='button-update-product'
                    variant='outline-primary'
                    disabled={
                        !name.inputValid && 
                        !categoryId.inputValid && 
                        !typeId.inputValid && 
                        !brandId.inputValid && 
                        !price.inputValid && 
                        !isFavourite.inputValid && 
                        !available.inputValid && 
                        !shortDescription.inputValid && 
                        !img.inputValid
                    }
                    onClick={update}
                >
                    Update
                </Button>
                <Button 
                    className='button-update-product'
                    variant='outline-danger'
                    onClick={close}
                >
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
});

export default UpdateProduct;