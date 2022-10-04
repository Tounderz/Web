import Multiselect from 'multiselect-react-dropdown';
import React, { useContext, useState } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import { updateBrand, formDataBrand } from '../../../http/brandApi';
import { useInput } from '../../../http/validateApi';
import { Context } from '../../../index';
import '../../../css/update/UpdateBrand.css'
import { observer } from 'mobx-react-lite';
import { fetchCategoriesByBrand } from '../../../http/categoryApi';

const UpdateBrand = observer(({show, onHide}) => {
    const {brand} = useContext(Context);
    const {category} = useContext(Context);
    const brandId = useInput(0, {isNumberId: {name: 'Brand'}});
    const name = useInput('', {minLength: {value: 2, name: 'Name'}});
    const img = useInput(null, {isImg: { name: 'Img' }} );
    const categoriesId = useInput([], {multiSelect: {name: 'Categories'}});
    const info = useInput('', {minLength: {value: 3, name: 'Info'}});
    const [messageError, setMessageError] = useState('');

    const click = async () => {
        try {
            const difference = categoriesId.value
                .filter(num => !category.categoriesByBrand.map(i => {return i.id}).includes(num))
                .concat(category.categoriesByBrand.map(i => {return i.id}).filter(num => !categoriesId.value.includes(num)));
                if (difference) {
                    const formData = formDataBrand(
                        brandId.value, name.value, 
                        info.value, categoriesId.value, 
                        img.value
                    );
                    const data = await updateBrand(formData);
                        brand.setBrands(data.brands);
                        close();
                } else {
                    setMessageError('Error')
                }
        } catch (e) {
            setMessageError(e.response.data.message);
        }
    }

    const onChangeBrandId = async (e) => {
        category.setCategoriesByBrand([]);
        categoriesId.onSelect([]);
        if (/^-?\d+$/.test(e?.target?.value) && e?.target?.value > 0) {
            const data = await fetchCategoriesByBrand(e?.target?.value);
                category.setCategoriesByBrand(data.categoriesByBrand);
        }

        brandId.onChange(e)
    }

    const close = () => {
        document.getElementById('updateSelectBrand').value = '0';
        brandId.onChange(0);
        name.onChange('');
        info.onChange('');
        categoriesId.onSelect([]);
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
                    id='updateSelectBrand'
                    className='form-update-brand'
                    onChange={e => onChangeBrandId(e)}
                    onBlur={e => brandId.onBlur(e)}
                >
                    <option
                        key='0'
                        value='0'
                    >
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
                        placeholder={`Update 'Name': ${brand.brands.filter(item => {
                            return item.id === Number(brandId.value)})
                            .map(item => item.name)}`}
                    />
                    {(info.isDirty && info.minLengthError) && 
                        <div className='error-message'>
                            {info.messageError}
                        </div>}
                    <Form.Control
                        className='form-update-brand-info'
                        value={info.value}
                        onChange={e => info.onChange(e)}
                        onBlur={e => info.onBlur(e)}
                        placeholder={`Update 'Info': ${brand.brands.filter(item => {
                            return item.id === Number(brandId.value)})
                            .map(item => item.info)}`}
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
                        selectedValues={category.categoriesByBrand}
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
                    onClick={close}
                >
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
});

export default UpdateBrand;