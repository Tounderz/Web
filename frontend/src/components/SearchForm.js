import React, { useContext } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { Context } from '../index';
import { useInput } from '../http/validateApi';
import { ERROR_ROUTE, IS_NUMBER, PAGE_FIRST, SEARCH_ROUTE, USERLIST_ROUTE } from '../utils/const';
import { fetchSearch, fetchSearchUsers } from '../http/searchApi';

const SearchForm = ({parameter, searchBy}) => {
    const {product} = useContext(Context);
    const {search} = useContext(Context);
    const {error} = useContext(Context);
    const {user} = useContext(Context);
    const {sort} = useContext(Context);
    const {page} = useContext(Context);
    const navigate = useNavigate();
    const searchParameter = useInput('', {minLength: {value: 1, name: 'Search'}});

    const searchClick = async () => {
        try {
            let data;
            switch(parameter)
            {
                case 'product':
                    data = await fetchSearch(searchParameter.value, PAGE_FIRST);
                        product.setProducts(data.products);
                        page.setCurrentPage(PAGE_FIRST);
                        page.setCountPages(data.countPages);
                        search.setSelectedSearchParameter(searchParameter.value);
                        navigate(SEARCH_ROUTE);
                    break;
                case 'user':
                    if (IS_NUMBER.test(searchParameter.value)) {
                        data = await fetchSearchUsers(searchParameter.value, PAGE_FIRST, 'Id');
                            user.setUsersList(data.usersList);
                            page.setCurrentPage(PAGE_FIRST);
                            page.setCountPages(data.countPages);
                    } else {
                        data = await fetchSearchUsers(searchParameter.value, PAGE_FIRST);
                            user.setUsersList(data.usersList);
                            page.setCurrentPage(PAGE_FIRST);
                            page.setCountPages(data.countPages);
                    }
                    navigate(USERLIST_ROUTE);
                    
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
            sort.setFieldNames([]);
            sort.setFieldName('');
            sort.setTypeSort('');
        }
    }

    function onKeyPress(e) {
        if (e.key === 'Enter' || e.key === 'NumpadEnter') {
            searchClick();
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
            <Button
                variant='outline-success'
                disabled={!searchParameter.inputValid}
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
};

export default SearchForm;