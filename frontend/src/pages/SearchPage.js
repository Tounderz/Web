import { observer } from 'mobx-react-lite';
import React, { useContext, useState } from 'react';
import { Col, Container, Nav, Pagination, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { fetchSearch } from '../http/searchApi';
import { Context } from '../index';
import { PAGE_FIRST, SHOP_ROUTE } from '../utils/const';
import ProductItem from '../components/ProductItem';

const SearchPage = observer(() => {
    const {product} = useContext(Context);
    const navigate = useNavigate()
    const pages = []
    const [page, setPage] = useState(PAGE_FIRST)

    if (product.countPages > 1) {
        for (let index = 0; index < product.countPages; index++) {
            pages.push(index + 1);
        }
    }

    const click = async (item) => {
        const data = await fetchSearch(product.selectedSearchParameter, item);
            product.setProducts(data.products);
            setPage(item)
    }

    return (
        <Container className='px-4'>
            <Col>
                <Row>
                    {product.products.map(item => (
                        <ProductItem key={item.id} prod={item}/>
                    ))}
                    
                </Row>
            </Col>
                <Row>
                    <Pagination className='d-flex justify-content-center align-items-center mt-3' size='sm'>
                        {pages.map(item =>
                            <Pagination.Item
                                key={item}
                                active={item === page}
                                onClick={() => click(item)}
                            >
                                {item}
                            </Pagination.Item>
                        )}
                    </Pagination>
                    <Nav.Link onClick={() => navigate(SHOP_ROUTE)}>Back to top</Nav.Link>
                </Row>
        </Container>
    );
});

export default SearchPage;