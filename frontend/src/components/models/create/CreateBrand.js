import React, { useContext } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import { Context } from '../../../index';
import { createBrand, formDataBrand } from '../../../http/brandApi';
import Multiselect from 'multiselect-react-dropdown';
import { useInput } from '../../../http/validateApi';
import { ZERO } from '../../../utils/const';
import '../../../css/create/CreateBrand.css'
import { useState } from 'react';
import { observer } from 'mobx-react-lite';

const CreateBrand = observer(({show, onHide}) => {
    const {category} = useContext(Context);
    const {brand} = useContext(Context);
    const name = useInput('', {minLength: {value: 3, name: 'Name'}});
    const categoriesId = useInput([], {multiselect: {name: 'Categories'}});
    const info = useInput('', {minLength: {value: 8, name: "Info"}});
    const img = useInput(null, {isImg: { name: 'Img' }} );
    const [messageError, setMessageError] = useState('');

    const click = async () => {
        try {
            const formData = formDataBrand(ZERO, name.value, info.value, categoriesId.value, img.value);
            const data = await createBrand(formData);
                brand.setBrands(data.brands);
                close();
        } catch (e) {
            setMessageError(e.message);
        }
    }

    const close = () => {
        name.onChange('');
        categoriesId.onChange([]);
        info.onSelect('');
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
                    New Brand
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
                        className='form-control-create-brand'
                        value={name.value}
                        onChange={e => name.onChange(e)}
                        onBlur={e => name.onBlur(e)}
                        placeholder={'Enter the brand name'}
                    />

                    {(info.isDirty && info.minLengthError) && 
                        <div className='error-message'>
                            {info.messageError}
                        </div>}
                    <Form.Control
                        className='form-control-create-brand'
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
                        className='form-control-create-brand'
                        type='file'
                        onChange={e => img.saveImg(e)}
                        onBlur={e => img.onBlur(e)}
                    />
                {(categoriesId.isDirty && categoriesId.multiSelectError) && 
                    <div className='error-message'>
                        {categoriesId.messageError}
                    </div>}
                <Multiselect 
                    className='form-control-create-brand'
                    displayValue='name'
                    placeholder='Categories:'
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
                    className='button-create-brand'
                    variant='outline-primary'
                    disabled={!name.inputValid || !categoriesId.inputValid}
                    onClick={click}
                >
                    Create
                </Button>
                <Button 
                    className='button-create-brand'
                    variant='outline-danger'
                    onClick={close}
                >
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateBrand;