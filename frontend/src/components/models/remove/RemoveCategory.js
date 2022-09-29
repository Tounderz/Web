import React, { useContext } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { removeCategory } from '../../../http/categoryApi';
import { useInput } from '../../../http/validateApi';
import { Context } from '../../../index';
import '../../../css/remove/RemoveCategory.css'
import { observer } from 'mobx-react-lite';

const RemoveCategory = observer(({show, onHide}) => {
    const {category} = useContext(Context);
    const categoryId = useInput(0, {isNumberId: {name: 'Category'}});

    const click = async () =>  {
        const data = await removeCategory(categoryId.value);
            category.setCategories(data.categories);
        close();
    }

    const close  =() => {
        document.getElementById('removeSelectCategory').value = '0';
        categoryId.onChange(''); 
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
                    Remove a Category
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {(categoryId.isDirty && categoryId.isNumberError) && 
                    <div className='error-message'>
                        {categoryId.messageError}
                    </div>}
                <Form.Select
                    id='removeSelectCategory'
                    className='form-category-remove'
                    onChange={e => categoryId.onChange(e)}
                    onBlur={e => categoryId.onBlur(e)}
                >
                    <option
                        key='0'
                        value='0'
                    >
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
                    onClick={close}
                >
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
});

export default RemoveCategory;