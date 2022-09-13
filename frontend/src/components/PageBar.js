import { observer } from 'mobx-react-lite';
import React from 'react';
import { useContext } from 'react';
import { Pagination } from 'react-bootstrap';
import { Context } from '../index';
import '../css/PageBar.css'

const PageBar = observer(() => {
    const {page} = useContext(Context);
    const pages = [];

    const paginationClick = (item) => {
        page.setCurrentPage(item);
    }

    if (page.countPages > 1) {
        for (let index = 0; index < page.countPages; index++) {
            pages.push(index + 1);
        }
    }

    return (
        <Pagination className='pagination' size='sm'>
            {pages.map(item =>
                <Pagination.Item
                    key={item}
                    active={item === page.currentPage}
                    onClick={() => paginationClick(item)}
                >
                    {item}
                </Pagination.Item>
            )}
        </Pagination>
    );
});

export default PageBar;