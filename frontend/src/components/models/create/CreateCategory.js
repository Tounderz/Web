import React, { useContext, useState } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import { Context } from '../../../index';
import { createCategory, formDataCategory } from '../../../http/categoryApi';
import { Multiselect } from 'multiselect-react-dropdown';
import { useInput } from '../../../http/validateApi';
import { ZERO } from '../../../utils/const';
import '../../../css/create/CreateCategory.css'
import { observer } from 'mobx-react-lite';

const CreateCategory = observer(({show, onHide}) => {
    const {brand} = useContext(Context);
    const {category} = useContext(Context);
    const name = useInput('', {minLength: {value: 3, name: 'Name'}});
    const shortDescription = useInput('', {minLength: {value: 8, name: 'Short Description'}});
    const info = useInput('', {minLength: {value: 8, name: 'Info'}});
    const brandsId = useInput([], {multiSelect: {name: 'Brands'}});
    const img = useInput(null, {isImg: { name: 'Img' }} );
    const [messageError, setMessageError] = useState('');
    
    const click = async () => {
        try {
            const formData = formDataCategory(ZERO, name.value, shortDescription.value, info.value, img.value, brandsId.value);
            const data = await createCategory(formData);
                category.setCategories(data.categories)
                name.onChange('');
                info.onChange('');
                shortDescription.onChange('');
                brandsId.onSelect([]);
                img.saveImg(null);
                onHide();
        } catch (error) {
            setMessageError(error.message);
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
                    New Category
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='error-message'>
                    {messageError}
                </div>
                <Form>
                    {(name.isDirty && name.minLengthError) && 
                        <div className='error-message'>
                            {name.messageError}
                        </div>}
                    <Form.Control
                        value={name.value}
                        onChange={e => name.onChange(e)}
                        onBlur={e => name.onBlur(e)}
                        placeholder={'Enter the category name'}
                    />

                    {(shortDescription.isDirty && shortDescription.minLengthError) && 
                        <div className='error-message'>
                            {shortDescription.messageError}
                        </div>}
                    <Form.Control
                        className='form-control-create-category'
                        value={shortDescription.value}
                        onChange={e => shortDescription.onChange(e)}
                        onBlur={e => shortDescription.onBlur(e)}
                        placeholder={'Short description'}
                    />

                    {(info.isDirty && info.minLengthError) && 
                        <div className='error-message'>
                            {info.messageError}
                        </div>}
                    <Form.Control
                        className='form-control-create-category'
                        value={info.value}
                        onChange={e => info.onChange(e)}
                        onBlur={e => info.onBlur(e)}
                        placeholder={'Info'}
                    />
                    {(img.isDirty && img.imgError) && 
                        <div className='error-message'>
                            {img.messageError}
                        </div>}
                    <Form.Control
                        className='form-control-create-category'
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
                    className='form-control-create-category'
                    placeholder='Brands:'
                    displayValue='name'
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
                    className='button-create-category'
                    variant='outline-primary'
                    disabled={!name.inputValid || !brandsId.inputValid}
                    onClick={click}
                >
                    Create
                </Button>
                <Button 
                    className='button-create-category'
                    variant='outline-danger'
                    onClick={onHide}
                >
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateCategory;