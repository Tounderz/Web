import React, { useContext } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Context } from '../index';
import { useInput } from '../http/validateApi';
import { ERROR_MESSAGE_SEARCH, FIELD_NAMES_PRODUCTS, FIELD_NAMES_USERS, PAGE_FIRST, PRODUCTS_LIST_ROUTE, USERLIST_ROUTE } from '../utils/const';
import { useNavigate } from 'react-router';
import { observer } from 'mobx-react-lite';
import { SearchTableProduct } from '../functions/SearchTableProduct';
import { SearchTableUser } from '../functions/SearchTableUser';

const SearchFormProductAndUserList = observer(({parameter}) => {
    const {page} = useContext(Context);
    const {product} = useContext(Context);
    const {user} = useContext(Context);
    const {sort} = useContext(Context);
    const {error} = useContext(Context);
    const {search} = useContext(Context);
    const navigate = useNavigate();
    const searchParameter = useInput('', {minLength: {value: 1, name: 'Search'}});
    const searchBy = useInput('', { minLength: {value: 2, name: 'Search by'}});

    let searchByArray;
    switch (parameter) {
        case 'productAdmin':
            searchByArray = FIELD_NAMES_PRODUCTS;
            break;
        case 'user':
            searchByArray = FIELD_NAMES_USERS;
            break;
        default:
            break;
    }

    const clean = () => {
        searchParameter.onChange('');
        sort.setFieldNames([]);
        sort.setFieldName('');
        sort.setTypeSort('');
        document.getElementById('selectTag').value = '0';
    }

    const cleaningUpDueToAnErrorProduct = () => {
        product.setProducts([]);
        page.setCurrentPage([]);
        page.setCountPages(0);
    }

    const cleaningUpDueToAnErrorUser = () => {
        user.setUsersList([]);
        page.setCurrentPage([]);
        page.setCountPages(0);
    }

    const saveSearchStote = () => {
        search.setSearchBy(searchBy.value);
        search.setSelectedSearchParameter(searchParameter.value);
        error.setMessageError('');
    }

    const searchClick = async () => {
        switch(parameter) {
            case 'user':
                try {
                    const data = await SearchTableUser(searchBy.value, searchParameter.value);
                    if (data === null) {
                        clean();
                        cleaningUpDueToAnErrorUser();
                        error.setMessageError(ERROR_MESSAGE_SEARCH);
                    } else {
                        user.setUsersList(data.usersList);
                        page.setCurrentPage(PAGE_FIRST);
                        page.setCountPages(data.countPages);
                        saveSearchStote();
                        clean();
                    }
                } catch (e) {
                    clean();
                    cleaningUpDueToAnErrorUser();
                    error.setMessageError(e.message);
                }

                navigate(USERLIST_ROUTE);
                break;
            case 'productAdmin':
                try {
                    const data = await SearchTableProduct(searchBy.value, searchParameter.value);
                    if (data === null) {
                        clean();
                        cleaningUpDueToAnErrorProduct();
                        error.setMessageError(ERROR_MESSAGE_SEARCH);
                    } else {
                        product.setProducts(data.products);
                        page.setCurrentPage(PAGE_FIRST);
                        page.setCountPages(data.countPages);
                        saveSearchStote();
                        clean();
                    }
                } catch (e) {
                    clean();
                    cleaningUpDueToAnErrorProduct();
                    error.setMessageError(e.message);
                }
                
                navigate(PRODUCTS_LIST_ROUTE);
                break;
            default:
                break;
        }   
    }

    function onKeyPress(e) {
        if (e.key === 'Enter' || e.key === 'NumpadEnter') {
            searchClick();
        }
    }

    return (
        <div className="d-flex">
            <Form.Select
                id = 'selectTag' 
                onChange={e => searchBy.onChange(e)}
                onBlur={e => searchBy.onBlur(e)}
                style={{width: '100px', marginRight: '5px'}}
            >
                <option
                    value='0'
                    key='0'
                >
                    Search by
                </option>
                {searchByArray.map(item => 
                     <option
                        value={item}
                        key={item}
                    >
                        {item}
                    </option>
                )}
            </Form.Select>
            <Form.Control
                onKeyPress={onKeyPress}
                type='search'
                className='me-2'
                placeholder='Search'
                value={searchParameter.value}
                onChange={e => searchParameter.onChange(e)}
                onBlur={e => searchParameter.onBlur(e)}
            />
            <Button
                variant='outline-success'
                disabled={!searchParameter.inputValid || !searchBy.inputValid}
                style={{
                    cursor: 'pointer',
                    borderRadius: '5px',
                }}
                onClick={searchClick}
            >
                Search
            </Button>
        </div>
    );
});

export default SearchFormProductAndUserList;