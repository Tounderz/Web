import React, { useContext, useState } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import { createProduct, formDataProduct } from '../../../http/productApi';
import { useInput } from '../../../http/validateApi';
import { Context } from '../../../index';
import { TRUE_AND_FALSE, ZERO } from '../../../utils/const';
import '../../../css/create/CreateProduct.css'

const CreateProduct = ({show, onHide}) => {
    const {category} = useContext(Context);
    const {brand} = useContext(Context);
    const {type} = useContext(Context);
    const name = useInput('', {minLength: {value: 3, name: 'Name'}});
    const categoryId = useInput(0, {isNumberId: {name: 'Category'}});
    const brandId = useInput(0, {isNumberId: {name: 'Brand'}});
    const typeId = useInput(0, {isNumberId: {name: 'Type'}});
    const shortDescription = useInput('', {minLength: {value: 8, name: 'Short Description'}});
    const isFavourite = useInput(0, {isNumberId: {name: 'IsFavourite'}});
    const available = useInput(0, {isNumberId: {name: 'Available'}});
    const price = useInput(0, {isPrice: {value: 3, name: 'Price'}});
    const img = useInput(null, {isImg: { name: 'Img' }} );
    const [messageError, setMessageError] = useState('');

    const click = async () => {
        try {
            const formData = formDataProduct(
                ZERO, name.value, categoryId.value,
                typeId.value, brandId.value, shortDescription.value,
                isFavourite.value, available.value, price.value, img.value
            );

            await createProduct(formData);
                name.onChange('');
                categoryId.onChange(0);
                brandId.onChange(0);
                typeId.onChange(0);
                shortDescription.onChange('');
                img.saveImg(null);
                available.saveImg(0);
                isFavourite.onChange(0);
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
                <Modal.Title 
                    id='contained-modal-title-vcenter'
                >
                    New Product
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
                        className='form-control-create-product'
                        onChange={e => categoryId.onChange(e)}
                        onBlur={e => categoryId.onBlur(e)}
                    >
                        <option value={0}>
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

                    {(typeId.isDirty && typeId.isNumberError) && 
                        <div className='error-message'>
                            {typeId.messageError}
                        </div>}
                    <Form.Select
                        className='form-control-create-product'
                        onChange={e => typeId.onChange(e)}
                        onBlur={e => typeId.onBlur(e)}
                    >
                        <option value={0}>
                            Select a type
                        </option>
                            {type.types.map(type => (
                                <option
                                    key={type.id}
                                    value={type.id}
                                >
                                    {type.name}
                                </option>
                            ))}
                    </Form.Select>

                    {(brandId.isDirty && brandId.isNumberError) && 
                        <div className='error-message'>
                            {brandId.messageError}
                        </div>}
                    <Form.Select
                        className='form-control-create-product'
                        onChange={e => brandId.onChange(e)}
                        onBlur={e => brandId.onBlur(e)}
                    >
                        <option key={0} value={0}>
                            Select a brand
                        </option>
                            {brand.brands.map(brand => (
                                <option
                                    key={brand.id}
                                    value={brand.id}
                                >
                                    {brand.name}
                                </option>
                            ))}
                    </Form.Select>

                    {(name.isDirty && name.minLengthError) && 
                        <div className='error-message'>
                            {name.messageError}
                        </div>}
                    <Form.Control
                        className='form-control-create-product'
                        value={name.value}
                        onChange={e => name.onChange(e)}
                        onBlur={e => name.onBlur(e)}
                        placeholder='Enter the product name'
                    />
                    {(shortDescription.isDirty && shortDescription.minLengthError) && 
                        <div className='error-message'>
                            {shortDescription.messageError}
                        </div>}
                    <Form.Control
                        className='form-control-create-product'
                        value={shortDescription.value}
                        onChange={e => shortDescription.onChange(e)}
                        onBlur={e => shortDescription.onBlur(e)}
                        placeholder='Short Description'
                    />

                    {(isFavourite.isDirty && isFavourite.isNumberError) && 
                        <div className='error-message'>
                            {isFavourite.messageError}
                        </div>}
                    <Form.Select 
                        className='form-control-create-product'
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

                    {(available.isDirty && available.isNumberError) && 
                        <div className='error-message'>
                            {available.messageError}
                        </div>}
                    <Form.Select 
                        className='form-control-create-product'
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

                    {(price.isDirty && price.priceError) && 
                        <div className='error-message'>
                            {price.messageError}
                        </div>}
                    <Form.Control
                        className='form-control-create-product'
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
                        className='form-control-create-product'
                        type='file'
                        onChange={e => img.saveImg(e)}
                        onBlur={e => img.onBlur(e)}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    className='button-create-product'
                    variant='outline-primary'
                    disabled={
                        !name.inputValid || 
                        !categoryId.inputValid || 
                        !typeId.inputValid || 
                        !brandId.inputValid || 
                        !price.inputValid
                    }
                    onClick={click}
                >
                    Create
                </Button>
                <Button
                    className='button-create-product'
                    variant='outline-danger'
                    onClick={onHide}
                >
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateProduct;