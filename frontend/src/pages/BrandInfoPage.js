import React, { useContext } from 'react';
import { Col, Row, Image, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { fetchProductsBrand } from '../http/brandApi';
import { fetchCategoriesByBrand } from '../http/categoryApi';
import { Context } from '../index';
import { BRAND_ROUTE, LOCALHOST, NO_IMAGE, PAGE_FIRST } from '../utils/const';
import '../css/InfoPage.css'

const BrandInfoPage = () => {
    const {product} = useContext(Context)
    const {user} = useContext(Context)
    const navigate = useNavigate()

    const click = async () => {
        const dataProducts = await fetchProductsBrand(product.selectedBrand.id, user.user.role, PAGE_FIRST);
            product.setProducts(dataProducts.products);
            product.setSelectedCategory(dataProducts.categoriesId);
            product.setCountPages(dataProducts.countPages);

        const dataCategories = await fetchCategoriesByBrand(product.selectedCategory)
            product.setCategoriesByBrand(dataCategories.categoriesByBrand)

        navigate(BRAND_ROUTE)
    }

    let img;
    if (product.selectedBrand.img === null) {
        img = (NO_IMAGE)
    } else {
        img = (LOCALHOST + product.selectedBrand.img)
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
                    {product.selectedBrand.name}
                </h3>
                <Image
                    key={product.selectedBrand.id}
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
                {product.selectedBrand.info}
            </Col>
            <Nav.Link 
                className='navLinkInfo'
                onClick={click}
            >
                Back to {product.selectedBrand.name}
            </Nav.Link>
        </Row>
    );
};

export default BrandInfoPage;