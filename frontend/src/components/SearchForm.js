import React, { useContext } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { Context } from '../index';
import { useInput } from '../http/validateApi';
import { ERROR_ROUTE, PAGE_FIRST, SEARCH_ROUTE } from '../utils/const';
import { fetchSearch } from '../http/searchApi';
import { observer } from 'mobx-react-lite';

const SearchForm = observer(() => {
    const {product} = useContext(Context);
    const {search} = useContext(Context);
    const {messages} = useContext(Context);
    const {page} = useContext(Context);
    const navigate = useNavigate();
    const searchParameter = useInput('', {minLength: {value: 1, name: 'Search'}});

    const searchClick = async () => {
        try {
            const data = await fetchSearch(searchParameter.value, PAGE_FIRST);
                product.setProducts(data.products);
                page.setCurrentPage(PAGE_FIRST);
                page.setCountPages(data.countPages);
                search.setSelectedSearchParameter(searchParameter.value);
                navigate(SEARCH_ROUTE);
        } catch (e) {
            messages.setMessageError(e.response.data.message);
                navigate(ERROR_ROUTE);
        } finally {
            searchParameter.onChange('');
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
});

export default SearchForm;