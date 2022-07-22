import React, { useContext, useState } from 'react';
import { Col, ListGroup, Pagination, Row } from 'react-bootstrap';
import ProductItem from '../components/ProductItem';
import TypeItem from '../components/TypeItem';
import { fetchProductsBrandByCategory } from '../http/brandApi';
import { Context } from '../index';
import { PAGE_FIRST } from '../utils/const';

const CategoriesByBrandPage = () => {
    const {product} = useContext(Context)
    const pages = []
    const [page, setPage] = useState(PAGE_FIRST)

    const paginationClick = async (item) => {
        await fetchProductsBrandByCategory(product.selectedBrand.id, product.categoriesByBrand, item).then(data => {
            product.setProducts(data.products);
            product.setCountPages(data.countPages);
            product.setCategoriesByBrand(data.categoriesByBrand);
            product.setTypes(data.types)
        })
        
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
                <ListGroup>
                    <ListGroup.Item 
                        className='d-flex justify-content-center btn-success'
                        disabled
                        key='id'
                        style={{ 
                            color: 'gray',
                            borderRadius: '5px',
                        }}
                    >
                        Types:
                    </ListGroup.Item>
                    {product.types.map(type => 
                        <TypeItem key={type.id} type={type}/>
                    )}
                </ListGroup >
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

export default CategoriesByBrandPage;