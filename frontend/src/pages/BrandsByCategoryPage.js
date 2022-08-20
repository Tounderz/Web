import React, { useContext, useState } from 'react';
import { Col, ListGroup, Pagination, Row } from 'react-bootstrap';
import { Context } from '../index';
import ProductItem from '../components/ProductItem';
import { fetchProductsCategoryByBrand } from '../http/categoryApi';
import { PAGE_FIRST } from '../utils/const';
import TypeItem from '../components/TypeItem';
import '../css/BrandPage.css'

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
        <Row className='brandFonPage'>
            <Col md={2} className='colBrandsByCategory'>
                <ListGroup className='listGroupBrand'>
                    <ListGroup.Item 
                        key='id'
                        disabled
                        style={{ 
                            borderColor: 'white',
                            borderRadius: '5px',
                            background:'none',
                            color: 'white',
                        }}
                    >
                        Types:
                    </ListGroup.Item>
                    {product.types.map(type => 
                        <TypeItem key={type.id} type={type} brandsId={product.brandsByCategory}/>
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
                <Pagination className='pagination' size='sm'>
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