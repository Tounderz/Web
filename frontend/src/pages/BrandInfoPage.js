import React, { useContext } from 'react';
import { Col, Row, Image, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { fetchProductsBrand } from '../http/brandApi';
import { fetchCategoriesByBrand } from '../http/categoryApi';
import { Context } from '../index';
import { BRAND_ROUTE, LOCALHOST, NO_IMAGE } from '../utils/const';
import '../css/InfoPage.css'

const BrandInfoPage = () => {
    const {product} = useContext(Context);
    const {brand} = useContext(Context);
    const {category} = useContext(Context);
    const {page} = useContext(Context);
    const {user} = useContext(Context);
    const navigate = useNavigate();

    const click = async () => {
        const dataProducts = await fetchProductsBrand(brand.selectedBrand.id, user.user.role, page.currentPage);
            product.setProducts(dataProducts.products);
            category.setSelectedCategory(dataProducts.categoriesId);
            page.setCountPages(dataProducts.countPages);

        const dataCategories = await fetchCategoriesByBrand(category.selectedCategory)
            category.setCategoriesByBrand(dataCategories.categoriesByBrand)

        navigate(BRAND_ROUTE)
    }

    let img;
    if (brand.selectedBrand.img === null) {
        img = (NO_IMAGE)
    } else {
        img = (LOCALHOST + brand.selectedBrand.img)
    }

    return (
        <Row className='rowInfo'>
            <Col 
                md={6} 
                className='colInfoPage'
            >
                <h3 
                    className='textInfo'
                >
                    {brand.selectedBrand.name}
                </h3>
                <Image
                    key={brand.selectedBrand.id}
                    src={img}
                    className='imgInfoPage'
                />
            </Col>
            <Col 
                md={6} 
                className='colInfoPage'
            >
                <h3 
                    className='textInfo'
                >
                    Info
                </h3>
                {brand.selectedBrand.info}
            </Col>
            <Nav.Link 
                className='navLinkInfo'
                onClick={click}
            >
                Back to {brand.selectedBrand.name}
            </Nav.Link>
        </Row>
    );
};

export default BrandInfoPage;