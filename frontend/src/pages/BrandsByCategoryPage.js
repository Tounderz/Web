import React, { useContext, useState } from 'react';
import { Col, ListGroup, Pagination, Row } from 'react-bootstrap';
import { Context } from '../index';
import ProductItem from '../components/ProductItem';
import { fetchProductsCategoryByBrand } from '../http/categoryApi';
import { PAGE_FIRST } from '../utils/const';
import TypeItem from '../components/TypeItem';

const BrandsByCategoryPage = () => {
    const {product} = useContext(Context)
    const pages = []
    const [page, setPage] = useState(PAGE_FIRST)

    const paginationClick = async (item) => {
        const data =await fetchProductsCategoryByBrand(product.selectedCategory.id, product.brandsByCategory, item);
            product.setProducts(data.products);
        
        setPage(item)
    }

    if (product.countPages > 1) {
        for (let index = 0; index < product.countPages; index++) {
            pages.push(index + 1);
        }
    }

    return (
        <Row className='px-4'>
            <h3 className='d-flex justify-content-center align-items-center'>{product.selectedBrand.name}</h3>
            <Col md={2} className='mt-3'>
                <Row className='mt-3'>
                    <ListGroup>
                        <ListGroup.Item 
                            className='d-flex justify-content-center btn-success'
                            key='id'
                            disabled
                            style={{ 
                                color: 'gray',
                                borderRadius: '5px',
                            }}
                        >
                            Types:
                        </ListGroup.Item>
                        {product.types.map(type => 
                            <TypeItem key={type.id} type={type} brandsId={product.brandsByCategory}/>
                        )}
                    </ListGroup >
                </Row>
            </Col>
            <Col md={9}>
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
                            onClick={() => paginationClick(item)}
                        >
                            {item}
                        </Pagination.Item>
                    )}
                </Pagination>
            </Row>          
        </Row>
    );
};

export default BrandsByCategoryPage;