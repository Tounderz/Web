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
        <Row className='categoryFonPage'>
            <Col md={2} className='colCategoriesByBrand'>
                <ListGroup className='listGroupCategory'>
                    <ListGroup.Item 
                        style={{ 
                            borderColor: 'white',
                            borderRadius: '5px',
                            background:'none',
                            color: 'white',
                        }}
                        disabled
                        key='id'
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

export default CategoriesByBrandPage;