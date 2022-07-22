import { observer } from 'mobx-react-lite';
import React, { useContext, useState } from 'react';
import { Container, Nav, Pagination, Row } from 'react-bootstrap';
import { Context } from '../index';
import ProductItem from '../components/ProductItem';
import { useNavigate } from 'react-router';
import { PAGE_FIRST, SHOP_ROUTE } from '../utils/const';
import { fetchProductsType } from '../http/typeApi';

const TypePage = observer(() => {
    const {product} = useContext(Context);
    const navigate = useNavigate()
    const pages = []
    const [page, setPage] = useState(PAGE_FIRST)

    const paginationClick = async (item) => {
        const data = await fetchProductsType(product.selectedType.id, product.BrandsByType, item);
            product.setProducts(data.products);
            setPage(item)
    }

    if (product.countPages > 1) {
        for (let index = 0; index < product.countPages; index++) {
            pages.push(index + 1);
        }
    }

    return (
        <Container>
            <h1 className='d-flex justify-content-center align-items-center'>
                {product.selectedType.name}
            </h1>
                <Row>
                    {product.products.map(item => (
                        <ProductItem key={item.id} prod={item}/>
                    ))}
                </Row>
                <Row>
                    <Pagination
                        className='d-flex justify-content-center align-items-center mt-3'
                        size='sm'
                    >
                        {pages.map(item =>
                            <Pagination.Item
                                key={item}
                                active={item === page}
                                onClick={() => paginationClick(item)}
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

export default TypePage;