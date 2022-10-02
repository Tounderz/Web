import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap';
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
import PageBar from '../components/PageBar';

const CategoryPage = observer(() => {
    const {product} = useContext(Context);
    const {category} = useContext(Context);
    const {brand} = useContext(Context);
    const {type} = useContext(Context);
    const {user} = useContext(Context);
    const {messages} = useContext(Context);
    const {page} = useContext(Context);
    const navigate = useNavigate();
    const brandsId = useInput([]);

    const paginationClick = async () => {
        const data = await fetchProductsCategory(category.selectedCategory.id, user.user.role, page.currentPage);
            product.setProducts(data.products);
            category.setCategoriesByBrand(data.categoriesByBrand);
            page.setCountPages(data.countPages);
    }

    const viewBrand = async () => {
        try {
            brand.setBrandsByCategory(brandsId.value)
            brand.setBrandsByType(brandsId.value)
            const dataProducts = await fetchProductsCategoryByBrand(category.selectedCategory.id, brandsId.value, PAGE_FIRST);
                product.setProducts(dataProducts.products);
                page.setCountPages(dataProducts.countPages);
                page.setCurrentPage(PAGE_FIRST);
                type.setSelectedType(dataProducts.typesId);

            const dataTypes = await fetchTypesByBrand(type.selectedType);
                type.setTypes(dataTypes.typesByBrand)

            navigate(BRANDS_BY_CATEGORY_ROUTE)
        } catch (e) {
            // messages.setMessageError(e.message);
            messages.setMessageError(e.response.data.message);
            navigate(ERROR_ROUTE)
        }
    }

    const infoCategory = () => {
        navigate(CATEGORY_INFO_ROUTE)
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
                        options={brand.brandsByCategory}
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
                        {type.types.map(typeItem => 
                            <TypeItem key={typeItem.id} typeItem={typeItem} brandsId={brandsId.value}/>
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
                    variant='link'
                    onClick={infoCategory}
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

export default CategoryPage;