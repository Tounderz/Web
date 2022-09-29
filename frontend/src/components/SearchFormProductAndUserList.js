import React, { useContext } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Context } from '../index';
import { useInput } from '../http/validateApi';
import { ERROR_MESSAGE_SEARCH, PAGE_FIRST, PRODUCTS_LIST_ROUTE, USERLIST_ROUTE } from '../utils/const';
import { useNavigate } from 'react-router';
import { observer } from 'mobx-react-lite';
import { SearchTableProduct } from '../functions/SearchTableProduct';
import { SearchTableUser } from '../functions/SearchTableUser';
import '../css/SearchFormProductAndUserList.css'

const SearchFormProductAndUserList = observer(({parameter}) => {
    const {page} = useContext(Context);
    const {product} = useContext(Context);
    const {user} = useContext(Context);
    const {sort} = useContext(Context);
    const {messages} = useContext(Context);
    const {search} = useContext(Context);
    const navigate = useNavigate();
    const searchParameter = useInput('', {minLength: {value: 1, name: 'Search'}});
    const searchBy = useInput('', { minLength: {value: 2, name: 'Search by'}});

    const clean = () => {
        searchParameter.onChange('');
        sort.setFieldNames([]);
        sort.setFieldName('');
        sort.setTypeSort('');
        document.getElementById('selectSearchBy').value = '0';
        searchBy.onChange('');
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
        messages.setMessageError('');
    }

    const searchClick = async () => {
        switch(parameter) {
            case 'user':
                try {
                    const data = await SearchTableUser(searchBy.value, searchParameter.value);
                    if (data === null) {
                        clean();
                        cleaningUpDueToAnErrorUser();
                        messages.setMessageError(ERROR_MESSAGE_SEARCH);
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
                    messages.setMessageError(e.message);
                }

                navigate(USERLIST_ROUTE);
                break;
            case 'productAdmin':
                try {
                    const data = await SearchTableProduct(searchBy.value, searchParameter.value);
                    if (data === null) {
                        clean();
                        cleaningUpDueToAnErrorProduct();
                        messages.setMessageError(ERROR_MESSAGE_SEARCH);
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
                    messages.setMessageError(e.message);
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
        <div className='div-search'>
            <Form.Select
                id = 'selectSearchBy' 
                className='form-select-search'
                onChange={e => searchBy.onChange(e)}
                onBlur={e => searchBy.onBlur(e)}
            >
                <option
                    value='0'
                    key='0'
                >
                    Search by
                </option>
                {search.fieldNames.map(item => 
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
                className='form-control-search'
                placeholder='Search'
                value={searchParameter.value}
                onChange={e => searchParameter.onChange(e)}
                onBlur={e => searchParameter.onBlur(e)}
            />
            <Button
                className='button-search-list'
                variant='outline-success'
                disabled={!searchParameter.inputValid || !searchBy.inputValid}
                onClick={searchClick}
            >
                Search
            </Button>
        </div>
    );
});

export default SearchFormProductAndUserList;