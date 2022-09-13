import React, { useContext } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { removeCategory } from '../../../http/categoryApi';
import { useInput } from '../../../http/validateApi';
import { Context } from '../../../index';
import '../../../css/remove/RemoveCategory.css'

const RemoveCategory = ({show, onHide}) => {
    const {category} = useContext(Context);
    const categoryId = useInput(0, {isNumberId: {name: 'Category'}});

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
                <Modal.Title 
                    id='contained-modal-title-vcenter'
                >
                    Remove a Category
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {(categoryId.isDirty && categoryId.isNumberError) && 
                    <div className='error-message'>
                        {categoryId.messageError}
                    </div>}
                <Form.Select
                    className='form-category-remove'
                    onChange={e => categoryId.onChange(e)}
                    onBlur={e => categoryId.onBlur(e)}
                >
                    <option value=''>
                        Select a category
                    </option>
                    {category.categories.map(category => (
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
                <Button
                    className='button-category-remove'
                    variant='outline-primary'
                    disabled={!categoryId.inputValid}
                    onClick={() => click()}
                >
                    Remove
                </Button>
                <Button 
                    className='button-category-remove'
                    variant='outline-danger'
                    onClick={onHide}
                >
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default RemoveCategory;