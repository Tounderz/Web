import React, { useContext } from 'react';
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { Context } from '../index';
import { useInput } from '../http/validateApi';
import { ERROR_ROUTE, IS_NUMBER, PAGE_FIRST, PRODUCTS_LIST_ROUTE, SEARCH_ROUTE, USERLIST_ROUTE } from '../utils/const';
import { fetchSearch, fetchSearchUsers, fetchSearchProductAdmin } from '../http/searchApi';

const SearchForm = ({parameter}) => {
    const {product} = useContext(Context);
    const {error} = useContext(Context);
    const {user} = useContext(Context);
    const {general} = useContext(Context);
    const navigate = useNavigate();
    const searchParameter = useInput('', {minLength: {value: 1, name: 'Search'}});

    const search = async () => {
        try {
            let data;
            switch(parameter)
            {
                case 'product':
                    data = await fetchSearch(searchParameter.value, PAGE_FIRST);
                        product.setProducts(data.products);
                        product.setCountPages(data.countPages);
                        product.setSelectedSearchParameter(searchParameter.value);
                        navigate(SEARCH_ROUTE);
                    break;
                case 'user':
                    if (IS_NUMBER.test(searchParameter.value)) {
                        data = await fetchSearchUsers(searchParameter.value, PAGE_FIRST, 'Id');
                            user.setUsersList(data.usersList);
                            user.setCountPages(data.countPages);
                    } else {
                        data = await fetchSearchUsers(searchParameter.value, PAGE_FIRST);
                            user.setUsersList(data.usersList);
                            user.setCountPages(data.countPages);
                    }
                    navigate(USERLIST_ROUTE);
                    
                    break;
                case 'productAdmin':
                    if (IS_NUMBER.test(searchParameter.value)) {
                        data = await fetchSearchProductAdmin(searchParameter.value, PAGE_FIRST, 'Id');
                            product.setProducts(data.products);
                            product.setCountPages(data.countPages);
                    } else {
                        data = await fetchSearchProductAdmin(searchParameter.value, PAGE_FIRST);
                            product.setProducts(data.products);
                            product.setCountPages(data.countPages);
                    }
                        navigate(PRODUCTS_LIST_ROUTE);
                    break;
                default:
                    break;
            }
        } catch (e) {
            error.setMessageError(e.message);
                navigate(ERROR_ROUTE);
        }
        finally{
            searchParameter.onChange('');
            general.setFieldNames([]);
            general.setFieldName('');
            general.setTypeSort('');
        }
    }

    function onKeyPress(e) {
        if (e.key === 'Enter' || e.key === 'NumpadEnter') {
            search();
        }
    }

    return (
        <div className="d-flex">
            <Form.Control
                onKeyPress={onKeyPress}
                type='search'
                className='me-2'
                placeholder='Search'
                value={searchParameter.value}
                onChange={e => searchParameter.onChange(e)}
                onBlur={e => searchParameter.onBlur(e)}
            />
            <button
                className="btn btn-outline-success"
                disabled={!searchParameter.inputValid}
                style={{
                    cursor: 'pointer',
                    borderRadius: '5px',
                }}
                onClick={search}
            >
                Search
            </button>
        </div>
    );
};

export default SearchForm;