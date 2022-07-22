import React, { useContext, useState } from 'react';
import { Form, Modal } from 'react-bootstrap';
import { Context } from '../../../index';
import { createCategory, formDataCategory } from '../../../http/categoryApi';
import { Multiselect } from 'multiselect-react-dropdown';
import { useInput } from '../../../http/validateApi';
import { ZERO } from '../../../utils/const';

const CreateCategory = ({show, onHide}) => {
    const {product} = useContext(Context)
    const name = useInput('', {minLength: {value: 3, name: 'Name'}});
    const shortDescription = useInput('', {minLength: {value: 8, name: 'Short Description'}})
    const info = useInput('', {minLength: {value: 8, name: 'Info'}})
    const brandsId = useInput([], {multiSelect: {name: 'Brands'}})
    const img = useInput(null)
    const [messageError, setMessageError] = useState('')
    
    const click = async () => {
        try {
            const formData = formDataCategory(ZERO, name.value, shortDescription.value, info.value, img.value, brandsId.value)
            await createCategory(formData);
                name.onChange('');
                info.onChange('');
                shortDescription.onChange('');
                brandsId.onSelect([]);
                img.saveImg(null);
                onHide()
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
                    New Category
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div style={{color: 'red'}}>{messageError}</div>
                <Form>
                    {(name.isDirty && name.minLengthError) && <div className='mt-3' style={{color: 'red'}}>{name.messageError}</div>}
                    <Form.Control
                        value={name.value}
                        onChange={e => name.onChange(e)}
                        onBlur={e => name.onBlur(e)}
                        placeholder={'Enter the category name'}
                    />

                    {(shortDescription.isDirty && shortDescription.minLengthError) && <div className='mt-3' style={{color: 'red'}}>{shortDescription.messageError}</div>}
                    <Form.Control
                        className='mt-3'
                        value={shortDescription.value}
                        onChange={e => shortDescription.onChange(e)}
                        onBlur={e => shortDescription.onBlur(e)}
                        placeholder={'Short description'}
                    />

                    {(info.isDirty && info.minLengthError) && <div className='mt-3' style={{color: 'red'}}>{info.messageError}</div>}
                    <Form.Control
                        className='mt-3'
                        value={info.value}
                        onChange={e => info.onChange(e)}
                        onBlur={e => info.onBlur(e)}
                        placeholder={'Info'}
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
                    disabled={!name.inputValid || !brandsId.inputValid}
                    onClick={click}
                >
                    Create
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

export default CreateCategory;