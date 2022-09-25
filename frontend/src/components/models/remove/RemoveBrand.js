import React, { useContext } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import { removeBrand } from '../../../http/brandApi';
import { useInput } from '../../../http/validateApi';
import { Context } from '../../../index';
import '../../../css/remove/RemoveBrand.css'
import { observer } from 'mobx-react-lite';

const RemoveBrand = observer(({show, onHide}) => {
    const {brand} = useContext(Context);
    const brandId = useInput(0, {isNumberId: {name: 'Brand'}});

    const click = async () => {
        const data = await removeBrand(brandId.value);
            brand.setBrands(data.brands);
            document.getElementById('removeSelectBrand').value = '0';
        onHide();
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
                    Remove a Brand
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            {(brandId.isDirty && brandId.isNumberError) && 
                <div className='error-message'>
                    {brandId.messageError}
                </div>}
                    <Form.Select
                        id='removeSelectBrand'
                        className='form-brand-remove'
                        onChange={e => brandId.onChange(e)}
                        onBlur={e => brandId.onBlur(e)}
                    >
                        <option 
                            key='0'
                            value='0'
                        >
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
            </Modal.Body>
            <Modal.Footer>
                <Button
                    className='button-brand-remove'
                    variant='outline-primary'
                    disabled={!brandId.inputValid}
                    onClick={click}
                >
                    Remove
                </Button>
                <Button 
                    className='button-brand-remove'
                    variant='outline-danger'
                    onClick={onHide}
                >
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
});

export default RemoveBrand;