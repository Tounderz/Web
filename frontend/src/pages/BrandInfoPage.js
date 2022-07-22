import React, { useContext } from 'react';
import { Col, Row, Image, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { fetchProductsBrand } from '../http/brandApi';
import { fetchCategoriesByBrand } from '../http/categoryApi';
import { Context } from '../index';
import { BRAND_ROUTE, LOCALHOST, NO_IMAGE, PAGE_FIRST } from '../utils/const';

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
        <Row className='px-4'>
            <Col md={6} className='mt-3'>
                <h3 className='d-flex justify-content-center align-items-center' style={{color: 'green'}}>Brand: {product.selectedBrand.name}</h3>
                <Image width={640} height={640} 
                    key={product.selectedBrand.id}
                    src={img}
                    className="d-block w-100"
                />
            </Col>
            <Col md={6} className='mt-3'>
                <h3 className='d-flex justify-content-center align-items-center' style={{color: 'black'}}>Info</h3>
                {product.selectedBrand.info}
            </Col>
            <Nav.Link 
                className='d-flex justify-content-center align-items-center'
                onClick={click}
            >
                Back to {product.selectedBrand.name}
            </Nav.Link>
        </Row>
    );
};

export default BrandInfoPage;