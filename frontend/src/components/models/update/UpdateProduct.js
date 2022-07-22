import React, { useContext, useState } from 'react';
import { Form, Modal } from 'react-bootstrap';
import {  formDataProduct, updateProduct } from '../../../http/productApi';
import { Context } from '../../../index';
import { useInput } from '../../../http/validateApi';
import { TRUE_AND_FALSE } from '../../../utils/const';

const UpdateProduct = ({show, onHide}) => {
    const {product} = useContext(Context)
    const name = useInput('', {minLength: {value: 3, name: 'Name'}});
    const categoryId = useInput(0, {isNumberId: {name: 'Category'}})
    const brandId = useInput(0, {isNumberId: {name: 'Brand'}})
    const typeId = useInput(0, {isNumberId: {name: 'Type'}})
    const shortDescription = useInput('', {minLength: {value: 8, name: 'Short Description'}});
    const price = useInput(0, {isPrice: {value: 3, name: 'Price'}});
    const isFavourite = useInput(0, {isNumberId: {name: 'IsFavourite'}})
    const available = useInput(0, {isNumberId: {name: 'Available'}})
    const img = useInput(null)
    const [messageError, setMessageError] = useState('')
    
    const update = async () => {
        try {
            console.log(product.selectedProduct.id)
            const formData = formDataProduct(
                product.selectedProduct.id, name.value, categoryId.value,
                typeId.value, brandId.value, shortDescription.value,
                isFavourite.value, available.value, price.value, img.value
            );

            await updateProduct(formData);
                product.setSelectedProduct({});
                name.onChange('');
                categoryId.onChange(0);
                brandId.onChange(0);
                typeId.onChange(0);
                shortDescription.onChange('');
                isFavourite.onChange(0);
                available.onChange(0);
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
        size="lg"
        centered
    >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                {'Update a Product: ' + product.selectedProduct.name}
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div style={{color: 'red'}}>{messageError}</div>
            <Form>
                {(categoryId.isDirty && categoryId.isNumberError) && <div className='mt-3' style={{color: 'red'}}>{categoryId.messageError}</div>}
                <Form.Select
                    className='mt-2 mb-2' 
                    onChange={e => categoryId.onChange(e)}
                    onBlur={e => categoryId.onBlur(e)}
                >
                    <option value=''>
                        {'Assigned category: ' + product.categories.filter(category => { return category.id === product.selectedProduct.categoryId}).map(category => category.name)}
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

                {(typeId.isDirty && typeId.isNumberError) && <div className='mt-3' style={{color: 'red'}}>{typeId.messageError}</div>}
                <Form.Select
                    className='mt-2 mb-2' 
                    onChange={e => typeId.onChange(e)}
                    onBlur={e => typeId.onBlur(e)}
                >
                    <option value=''>
                        {'Assigned type: ' + product.types.filter(type => { return type.id === product.selectedProduct.typeId}).map(type => type.name)}
                    </option>
                        {product.types.map(type => (
                            <option
                                key={type.id}
                                value={type.id}
                            >
                                {type.name}
                            </option>
                        ))}
                </Form.Select>
                {(brandId.isDirty && brandId.isNumberError) && <div className='mt-3' style={{color: 'red'}}>{brandId.messageError}</div>}
                <Form.Select
                    className='mt-2 mb-2' 
                    onChange={e => brandId.onChange(e)}
                    onBlur={e => brandId.onBlur(e)}
                >
                    <option value=''>
                        {'Assigned brand: ' + product.brands.filter(brand => { return brand.id === product.selectedProduct.brandId}).map(brand => brand.name)}
                    </option>
                        {product.brands.map(brand => (
                            <option
                                key={brand.id}
                                value={brand.id}
                            >
                                {brand.name}
                            </option>
                        ))}
                </Form.Select> 
                {(name.isDirty && name.minLengthError) && <div className='mt-3' style={{color: 'red'}}>{name.messageError}</div>}
                    <Form.Control
                        value={name.value}
                        onChange={e => name.onChange(e)}
                        onBlur={e => name.onBlur(e)}
                        className='mt-3'
                        placeholder={`Update Name: '${product.selectedProduct.name}'`}
                    />
                    {(shortDescription.isDirty && shortDescription.minLengthError) && <div className='mt-3' style={{color: 'red'}}>{shortDescription.messageError}</div>}
                    <Form.Control
                        value={shortDescription.value}
                        onChange={e => shortDescription.onChange(e)}
                        onBlur={e => shortDescription.onBlur(e)}
                        className='mt-3'
                        placeholder={`Update Short Description: '${product.selectedProduct.shortDescription}'`}
                    />
               
                    {(isFavourite.isDirty && isFavourite.isNumberError) && <div className='mt-3' style={{color: 'red'}}>{isFavourite.messageError}</div>}
                    <Form.Select 
                        className='mt-3'
                        onChange={e =>isFavourite.onChange(e)}
                        onBlur={e => isFavourite.onBlur(e)}
                    >
                        <option 
                            key={0}
                            value={0}
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
                    {(available.isDirty && available.isNumberError) && <div className='mt-3' style={{color: 'red'}}>{available.messageError}</div>}
                    <Form.Select 
                        className='mt-3'
                        onChange={e =>available.onChange(e)}
                        onBlur={e => available.onBlur(e)}
                    >
                        <option 
                            key={0}
                            value={0}
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
                    {(price.isDirty && price.priceError) && <div className='mt-3' style={{color: 'red'}}>{price.messageError}</div>}
                    <Form.Control
                        value={price.value}
                        onChange={e => price.onChange(e)}
                        onBlur={e => price.onBlur(e)}
                        className='mt-3'
                        placeholder='Enter the cost of the product'
                        type='number'
                    />
                <Form.Control
                    className='mt-3'
                    type='file'
                    onChange={e => img.saveImg(e)}
                />
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <button
                className="btn-primary m-2"
                style={{
                    cursor: 'pointer',
                    borderRadius: '5px'
                }}
                disabled={!name.inputValid && !categoryId.inputValid && !typeId.inputValid && !brandId.inputValid && !price.inputValid && !isFavourite.inputValid && !available.inputValid && !shortDescription.inputValid}
                onClick={update}
            >
                Update
            </button>
            <button 
                className="btn-danger"
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

export default UpdateProduct;