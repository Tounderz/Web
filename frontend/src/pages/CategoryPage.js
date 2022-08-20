import { observer } from 'mobx-react-lite';
import React, { useContext, useState } from 'react';
import { Button, Card, Col, ListGroup, Pagination, Row } from 'react-bootstrap';
import { Context } from '../index';
import ProductItem from '../components/ProductItem';
import TypeItem from '../components/TypeItem';
import { fetchProductsCategory, fetchProductsCategoryByBrand } from '../http/categoryApi';
import { BRANDS_BY_CATEGORY_ROUTE, CATEGORY_INFO_ROUTE, ERROR_ROUTE, PAGE_FIRST } from '../utils/const';
import Multiselect from 'multiselect-react-dropdown';
import { useNavigate } from 'react-router';
import { fetchTypesByBrand } from '../http/typeApi';
import { useInput } from '../http/validateApi';
import '../css/CategoryPage.css'
import { SvgSelector } from '../components/Svg/SvgSelector';

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
                product.setSelectedType(dataProducts.typesId);

            const dataTypes = await fetchTypesByBrand(product.selectedType);
                product.setTypes(dataTypes.typesByBrand)

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
        <Row className='categoryFonPage'>
            <Col 
                className='colMultiCategory'
                md={2}
            >
                <Card
                    className='cardMultiCategory'
                >
                    <Multiselect
                        className='multiselectCategory'
                        placeholder='Brands:'
                        displayValue='name'
                        value='id'
                        options={product.brandsByCategory}
                        onSelect={e => brandsId.onSelect(e)}
                        onRemove={e => brandsId.onRemove(e)}
                        onBlur={e => brandsId.onBlur(e)}
                        showCheckbox
                    />
                    <Button
                        className='buttonMultiCategory'
                        variant='outline-primary'
                        disabled={brandsId.value.length === 0}
                        onClick={viewBrand}
                    >
                        View Brand
                    </Button>
                </Card>
                <Row
                    className='rowListGroupCategory'
                >
                    <ListGroup className='listGroupCategory'>
                        <ListGroup.Item 
                            disabled
                            key='id'
                            style={{ 
                                borderColor: 'white',
                                borderRadius: '5px',
                                background:'none',
                                color: 'white',
                            }}
                        >
                            Types:
                        </ListGroup.Item >
                        {product.types.map(type => 
                            <TypeItem key={type.id} type={type} brandsId={brandsId.value}/>
                        )}
                    </ListGroup >
                </Row>
            </Col>
            <Col md={8}>
                <Row>
                    {product.products.map(item => (
                        <ProductItem key={item.id} prod={item}/>
                    ))}
                </Row>
            </Col>
            <Col md={2}>
                <Button
                    className='buttonInfoCategory'
                    // variant='outline-info'
                    variant='link'
                    onClick={infoCategory}
                >
                    {/* Info */}
                    {/* Info Category: {product.selectedCategory.name} */}
                    <SvgSelector id='info'/>
                </Button>
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