import { observer } from 'mobx-react-lite';
import React, { useContext, useState } from 'react';
import { Card, Col, ListGroup, Pagination, Row } from 'react-bootstrap';
import { Context } from '../index';
import ProductItem from '../components/ProductItem';
import TypeItem from '../components/TypeItem';
import { fetchProductsCategory, fetchProductsCategoryByBrand } from '../http/categoryApi';
import { BRANDS_BY_CATEGORY_ROUTE, CATEGORY_INFO_ROUTE, ERROR_ROUTE, PAGE_FIRST, ZERO } from '../utils/const';
import Multiselect from 'multiselect-react-dropdown';
import { useNavigate } from 'react-router';
import { fetchProductsType } from '../http/typeApi';
import { useInput } from '../http/validateApi';

const CategoryPage = observer(() => {
    const {product} = useContext(Context);
    const {user} = useContext(Context)
    const {error} = useContext(Context)
    const navigate = useNavigate()
    const pages = []
    const [page, setPage] = useState(PAGE_FIRST)
    const brandsId = useInput([])

    const paginationClick = async (item) => {
        const data = await fetchProductsCategory(product.selectedCategory.id, user.user.role, item);
            product.setProducts(data.products);
            product.setCategoriesByBrand(data.categoriesByBrand);
            product.setCountPages(data.countPages);
        setPage(item);
    }

    const viewBrand = async () => {
        try {
            product.setBrandsByCategory(brandsId.value)
            product.setBrandsByType(brandsId.value)
            const dataProducts = await fetchProductsCategoryByBrand(product.selectedCategory.id, brandsId.value, PAGE_FIRST);
                product.setProducts(dataProducts.products);
                product.setCountPages(dataProducts.countPages);

            const dataType = await fetchProductsType(ZERO, brandsId.value, PAGE_FIRST);
                product.setTypes(dataType.types);

            navigate(BRANDS_BY_CATEGORY_ROUTE)
        } catch (e) {
            error.setMessageError(e.response.data.message);
            navigate(ERROR_ROUTE)
        }
    }

    const infoCategory = () => {
        navigate(CATEGORY_INFO_ROUTE)
    }

    if (product.countPages > 1) {
        for (let index = 0; index < product.countPages; index++) {
            pages.push(index + 1);
        }
    }

    return (
        <Row className='px-4'>
            <Col md={2}>
                <Card
                    style={{
                        maxwidth: '18rem',
                    }}
                    border={'light'}
                >
                    <Multiselect
                        style={{
                            borderRadius: '10px',
                            background: 'red',
                        }}
                        placeholder='Brands:'
                        className='mt-1'
                        displayValue='name'
                        value='id'
                        options={product.brandsByCategory}
                        onSelect={e => brandsId.onSelect(e)}
                        onRemove={e => brandsId.onRemove(e)}
                        onBlur={e => brandsId.onBlur(e)}
                        showCheckbox
                    />
                    <button
                        className='btn-primary mt-1'
                        variant={'outline-success'}
                        onClick={viewBrand}
                        style={{
                            cursor: 'pointer',
                            borderRadius: '5px'
                        }}
                        disabled={brandsId.value.length === 0}
                    >
                        View Brand
                    </button>
                </Card>
                <Row className='mt-3'>
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
                            <TypeItem key={type.id} type={type} brandsId={brandsId.value}/>
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
            <Col md={1}>
                <button
                    className='btn-success mt-1'
                    variant={'outline-success'}
                    onClick={infoCategory}
                    style={{
                        cursor: 'pointer',
                        borderRadius: '5px',
                        maxwidth: '18rem', 
                    }}
                >
                    Info Category: {product.selectedCategory.name}
                </button>
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
});

export default CategoryPage;