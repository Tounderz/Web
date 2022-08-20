import { observer } from 'mobx-react-lite';
import Multiselect from 'multiselect-react-dropdown';
import React, { useContext, useState } from 'react';
import { Button, Card, Col, Pagination, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import ProductItem from '../components/ProductItem';
import { fetchProductsBrand, fetchProductsBrandByCategory } from '../http/brandApi';
import { fetchTypesByBrand } from '../http/typeApi';
import { useInput } from '../http/validateApi';
import { Context } from '../index';
import { BRAND_INFO_ROUTE, CATEGORIES_BY_BRAND_ROUTE, ERROR_ROUTE, PAGE_FIRST } from '../utils/const';
import '../css/BrandPage.css'
import { SvgSelector } from '../components/Svg/SvgSelector';

const BrandPage = observer(() => {
    const {product} = useContext(Context)
    const {user} = useContext(Context)
    const {error} = useContext(Context)
    const navigate = useNavigate()
    const pages = []
    const [page, setPage] = useState(PAGE_FIRST)
    const categoriesId = useInput([])

    const paginationClick = async (item) => {
        product.setCountPages(PAGE_FIRST);
        const data = await fetchProductsBrand(product.selectedBrand.id, user.user.role, item);
            product.setProducts(data.products);
            product.setCountPages(data.countPages);

        setPage(item)
    }

    const viewCategory = async () => {
        try {
            product.setCategoriesByBrand(categoriesId.value);

            const dataProducts = await fetchProductsBrandByCategory(product.selectedBrand.id, product.categoriesByBrand, PAGE_FIRST);
                product.setProducts(dataProducts.products);
                product.setCountPages(dataProducts.countPages);
                product.setCategoriesByBrand(dataProducts.categoriesByBrand);
                product.setSelectedType(dataProducts.typesId);

            const dataTypes = await fetchTypesByBrand(product.selectedType)
                product.setTypes(dataTypes.typesByBrand)
        
            navigate(CATEGORIES_BY_BRAND_ROUTE)
        } catch (e) {
            error.setMessageError(e.response.data.message);
            navigate(ERROR_ROUTE)
        }
    }

    const infoBrand = () => {
        navigate(BRAND_INFO_ROUTE)
    }

    if (product.countPages > 1) {
        for (let index = 0; index < product.countPages; index++) {
            pages.push(index + 1);
        }
    }

    return (
        <Row className='brandFonPage'>         
            <Col 
                md={2}
                className='colMultiBrand'
            >
                <Card
                    className='cardBrand'
                >
                    <Multiselect
                        className='multiBrand'
                        placeholder='Categories:'
                        displayValue='name'
                        value='id'
                        options={product.categoriesByBrand}
                        onSelect={e => categoriesId.onSelect(e)}
                        onRemove={e => categoriesId.onRemove(e)}
                        onBlur={e => categoriesId.onBlur(e)}
                        showCheckbox
                    />
                    <Button
                        className='buttonBrand'
                        variant='outline-primary'
                        disabled={categoriesId.value.length === 0}
                        onClick={viewCategory}
                    >
                        View Category
                    </Button>
                </Card>
            </Col>
            <Col 
                md={8}
            >
                <Row>
                    {product.products.map(item => (
                        <ProductItem key={item.id} prod={item}/>
                    ))}
                </Row>
            </Col>
            <Col md={2}>
                <Button
                    className='buttonInfoBrand'
                    variant='link'
                    onClick={infoBrand}
                >
                    <SvgSelector id='info'/>
                    {/* Info */}
                    {/* Info Brand: {product.selectedBrand.name} */}
                </Button>
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
});

export default BrandPage;