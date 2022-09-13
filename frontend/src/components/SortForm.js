import React, { useContext } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { Context } from '../index';
import { sortProducts, sortUsers } from '../http/sortApi';
import { useInput } from '../http/validateApi';
import { ERROR_ROUTE, PAGE_FIRST, PRODUCTS_LIST_ROUTE, TYPES_SORT, USERLIST_ROUTE } from '../utils/const';
import { useNavigate } from 'react-router';

const SortForm = ({show, onHide, parameter}) => {
    const {product} = useContext(Context);
    const {error} = useContext(Context);
    const {user} = useContext(Context);
    const {sort} = useContext(Context);
    const {page} = useContext(Context);
    const navigate = useNavigate();
    const fieldName = useInput('', {minLength: {value: 2, name: 'Field Name'}});
    const typeSort = useInput('', {minLength: {value: 2, name: 'Type Sort'}});

    const sortClick = async () => {
        try {
            let data;
            switch(parameter) {
                case 'product':
                    data = await sortProducts(fieldName.value, typeSort.value, PAGE_FIRST);
                        product.setProducts(data.products);
                        page.setCurrentPage(PAGE_FIRST);
                        page.setCountPages(data.countPages);
                        sort.setFieldName(fieldName.value);
                        sort.setTypeSort(typeSort.value);
                        onHide();
                        
                        navigate(PRODUCTS_LIST_ROUTE);
                    break;
                case 'user':
                    data = await sortUsers(fieldName.value, typeSort.value, PAGE_FIRST);
                        user.setUsersList(data.usersList);
                        page.setCurrentPage(PAGE_FIRST);
                        page.setCountPages(data.countPages);
                        sort.setFieldName(fieldName.value);
                        sort.setTypeSort(typeSort.value);
                        onHide();

                        navigate(USERLIST_ROUTE);
                    break;
                default:
                    break;
            }
        } catch (e) {
            error.setMessageError(e.message);
            navigate(ERROR_ROUTE)
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
                    Sort
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Select
                    onChange={e => fieldName.onChange(e)}
                    onBlur={e => fieldName.onBlur(e)}
                    className='m-2'
                >
                    <option
                        key=''
                        value=''
                    >
                        Select a field name
                    </option>
                    {sort.fieldNames.map(item =>
                        <option
                            key={item}
                            value={item}
                        >
                            {item}
                        </option>
                    )}
                </Form.Select>
                <Form.Select
                    onChange={e => typeSort.onChange(e)}
                    onBlur={e => typeSort.onBlur(e)}
                    className='m-2'
                >
                    <option
                        key=''
                        value=''
                    >
                        Select a type sort
                    </option>
                    {TYPES_SORT.map(item =>
                        <option
                            key={item}
                            value={item}
                        >
                            {item}
                        </option>
                    )}
                </Form.Select>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant='outline-primary'
                    className='m-2'
                    style={{
                        cursor: 'pointer',
                        borderRadius: '5px',
                    }}
                    disabled={!typeSort.inputValid || !fieldName.inputValid}
                    onClick={sortClick}
                >
                    Sort
                </Button>
                <Button
                    variant='outline-danger'
                    className='m-2'
                    style={{
                        cursor: 'pointer',
                        borderRadius: '5px'
                    }}
                    onClick={onHide}
                >
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default SortForm;