import React, { useContext } from 'react';
import { Form, Modal } from 'react-bootstrap';
import { Context } from '../../../index';
import { createBrand, formDataBrand } from '../../../http/brandApi';
import Multiselect from 'multiselect-react-dropdown';
import { useInput } from '../../../http/validateApi';
import { ZERO } from '../../../utils/const';

const CreateBrand = ({show, onHide}) => {
    const {product} = useContext(Context)
    const name = useInput('', {minLength: {value: 3, name: 'Name'}});
    const categoriesId = useInput([], {multiselect: {name: 'Categories'}})
    const info = useInput('', {minLength: {value: 8, name: "Info"}})
    const img = useInput(null)

    const click = async () => {
        const formData = formDataBrand(ZERO, name.value, info.value, categoriesId.value, img.value)
        await createBrand(formData).then(data => {
            name.onChange('')
            categoriesId.onChange([])
            info.onSelect('')
            img.saveImg(null)
            onHide()
        })
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    New Brand
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    {(name.isDirty && name.minLengthError) && <div className='mt-3' style={{color: 'red'}}>{name.messageError}</div>}
                    <Form.Control
                        className='mt-3'
                        value={name.value}
                        onChange={e => name.onChange(e)}
                        onBlur={e => name.onBlur(e)}
                        placeholder={'Enter the brand name'}
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
                {(categoriesId.isDirty && categoriesId.multiSelectError) && <div className='mt-3' style={{color: 'red'}}>{categoriesId.messageError}</div>}
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
                    disabled={!name.inputValid || !categoriesId.inputValid}
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

export default CreateBrand;