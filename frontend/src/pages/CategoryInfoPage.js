import React, { useContext } from 'react';
import { Col, Row, Image, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { fetchBrandsByCategory } from '../http/brandApi';
import { fetchProductsCategory } from '../http/categoryApi';
import { fetchTypes } from '../http/typeApi';
import { Context } from '../index';
import { CATEGORY_ROUTE, LOCALHOST, NO_IMAGE, PAGE_FIRST } from '../utils/const';
import '../css/InfoPage.css'

const CategoryInfoPage = () => {
    const {product} = useContext(Context);
    const {category} = useContext(Context);
    const {type} = useContext(Context);
    const {page} = useContext(Context);
    const {brand} = useContext(Context);
    const {user} = useContext(Context);
    const navigate = useNavigate();

    const click = async () => {
        const dataType = await fetchTypes(category.selectedCategory.id, user.user.role, PAGE_FIRST);
            type.setTypes(dataType.types);

        const dataProducts = await fetchProductsCategory(category.selectedCategory.id, user.user.role, page.currentPage);
            product.setProducts(dataProducts.products);
            brand.setSelectedBrand(dataProducts.brandsId);
            page.setCountPages(dataProducts.countPages);            

        const dataBrands = await fetchBrandsByCategory(brand.selectedBrand)
            brand.setBrandsByCategory(dataBrands.brandsByCategory)

        navigate(CATEGORY_ROUTE)
    }

    let img;
    if (category.selectedCategory.img === null) {
        img = (NO_IMAGE)
    } else {
        img = (LOCALHOST + category.selectedCategory.img)
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
                    {category.selectedCategory.name}
                </h3>
                <Image
                    className='imgInfoPage'
                    key={category.selectedCategory.id}
                    src={img}
                />
            </Col>
            <Col 
                md={6} 
                className='colInfoPage'
            >
                <h3 className='textInfo'>Info</h3>
                {category.selectedCategory.info}
            </Col>
            <Nav.Link
                className='navLinkInfo'
                onClick={click}
            >
                Back to {category.selectedCategory.name}
            </Nav.Link>
        </Row>
    );
};

export default CategoryInfoPage;