import { observer } from 'mobx-react-lite';
import React, { useContext, useState } from 'react';
import { Col, Container, Nav, Pagination, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { fetchSearch } from '../http/searchApi';
import { Context } from '../index';
import { PAGE_FIRST, SHOP_ROUTE } from '../utils/const';
import ProductItem from '../components/ProductItem';
import '../css/SearchPage.css'

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
        <Row className='searchFonPage'>
            <Container className='px-4'>
                <Col md={9}>
                    <Row>
                        {product.products.map(item => (
                            <ProductItem key={item.id} prod={item}/>
                        ))}
                        
                    </Row>
                </Col>
                    <Row>
                        <Pagination
                            className='pagination'
                            size='sm'
                        >
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
        </Row>
    );
});

export default SearchPage;