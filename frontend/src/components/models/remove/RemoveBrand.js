import React, { useContext } from 'react';
import { Form, Modal } from 'react-bootstrap';
import { removeBrand } from '../../../http/brandApi';
import { useInput } from '../../../http/validateApi';
import { Context } from '../../../index';

const RemoveBrand = ({show, onHide}) => {
    const {product} = useContext(Context)
    const brandId = useInput(0, {isNumberId: {name: 'Brand'}})

    const click = async () => {
        await removeBrand(brandId.value);
            brandId.onChange(0);
            onHide();
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Remove a Brand
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            {(brandId.isDirty && brandId.isNumberError) && <div className='mt-3' style={{color: 'red'}}>{brandId.messageError}</div>}
                    <Form.Select
                        className='mt-2 mb-2'
                        onChange={e => brandId.onChange(e)}
                        onBlur={e => brandId.onBlur(e)}
                    >
                        <option key={0} value=''>
                            Select a brand
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
            </Modal.Body>
            <Modal.Footer>
                <button
                    className="btn-primary m-2"
                    variant={'outline-success'}
                    style={{
                        cursor: 'pointer',
                        borderRadius: '5px'
                    }}
                    disabled={!brandId.inputValid}
                    onClick={click}
                >
                    Remove
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

export default RemoveBrand;