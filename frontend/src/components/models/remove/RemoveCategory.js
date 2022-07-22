import React, { useContext } from 'react';
import { Modal, Form } from 'react-bootstrap';
import { removeCategory } from '../../../http/categoryApi';
import { useInput } from '../../../http/validateApi';
import { Context } from '../../../index';

const RemoveCategory = ({show, onHide}) => {
    const {product} = useContext(Context)
    const categoryId = useInput(0, {isNumberId: {name: 'Category'}})

    const click = async () =>  {
        await removeCategory(categoryId.value);
            categoryId.onChange(0);
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
                    Remove a Category
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {(categoryId.isDirty && categoryId.isNumberError) && <div className='mt-3' style={{color: 'red'}}>{categoryId.messageError}</div>}
                <Form.Select
                    className='mt-3'
                    onChange={e => categoryId.onChange(e)}
                    onBlur={e => categoryId.onBlur(e)}
                >
                    <option value=''>
                        Select a category
                    </option>
                    {product.categories.map(category => (
                        <option
                            value={category.id}
                            key={category.id}
                        >
                            {category.name}
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
                    disabled={!categoryId.inputValid}
                    onClick={() => click()}
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

export default RemoveCategory;