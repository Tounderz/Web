import { observer } from 'mobx-react-lite';
import Multiselect from 'multiselect-react-dropdown';
import React, { useContext } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import ProductItem from '../components/ProductItem';
import { fetchProductsBrand, fetchProductsBrandByCategory } from '../http/brandApi';
import { fetchTypesByBrand } from '../http/typeApi';
import { useInput } from '../http/validateApi';
import { Context } from '../index';
import { BRAND_INFO_ROUTE, CATEGORIES_BY_BRAND_ROUTE, ERROR_ROUTE, PAGE_FIRST } from '../utils/const';
import '../css/BrandPage.css'
import { SvgSelector } from '../components/Svg/SvgSelector';
import PageBar from '../components/PageBar';

const BrandPage = observer(() => {
    const {product} = useContext(Context);
    const {brand} = useContext(Context);
    const {category} = useContext(Context);
    const {type} = useContext(Context);
    const {user} = useContext(Context);
    const {messages} = useContext(Context);
    const {page} = useContext(Context);
    const navigate = useNavigate();
    const categoriesId = useInput([]);
    
    const paginationClick = async () => {
        const data = await fetchProductsBrand(brand.selectedBrand.id, user.user.role, page.currentPage);
            product.setProducts(data.products);
            page.setCountPages(data.countPages);
    }

    const viewCategory = async () => {
        try {
            category.setCategoriesByBrand(categoriesId.value);
            const dataProducts = await fetchProductsBrandByCategory(brand.selectedBrand.id, category.categoriesByBrand, PAGE_FIRST);
                product.setProducts(dataProducts.products);
                page.setCountPages(dataProducts.countPages);
                page.setCurrentPage(PAGE_FIRST);
                type.setSelectedType(dataProducts.typesId);

            const dataTypes = await fetchTypesByBrand(type.selectedType)
                type.setTypes(dataTypes.typesByBrand)
        
            navigate(CATEGORIES_BY_BRAND_ROUTE)
        } catch (e) {
            // messages.setMessageError(e.message);
            messages.setMessageError(e.response.data.message);
            navigate(ERROR_ROUTE)
        }
    }

    const infoBrand = () => {
        navigate(BRAND_INFO_ROUTE)
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
                        options={category.categoriesByBrand}
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
                </Button>
            </Col>
            <Row onClick={() => paginationClick()}>
                <PageBar/>
            </Row> 
        </Row>
    );
});

export default BrandPage;