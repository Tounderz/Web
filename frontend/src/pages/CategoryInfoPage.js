import React, { useContext } from 'react';
import { Col, Row, Image, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { fetchBrandsByCategory } from '../http/brandApi';
import { fetchProductsCategory } from '../http/categoryApi';
import { fetchTypes } from '../http/typeApi';
import { Context } from '../index';
import { CATEGORY_ROUTE, LOCALHOST, NO_IMAGE, PAGE_FIRST } from '../utils/const';

const CategoryInfoPage = () => {
    const {product} = useContext(Context)
    const {user} = useContext(Context)
    const navigate = useNavigate()

    const click = async () => {
        const dataType = await fetchTypes(product.selectedCategory.id, user.user.role, PAGE_FIRST);
            product.setTypes(dataType.types);

        const dataProducts = await fetchProductsCategory(product.selectedCategory.id, user.user.role, PAGE_FIRST);
            product.setProducts(dataProducts.products);
            product.setSelectedBrand(dataProducts.brandsId);
            product.setCountPages(dataProducts.countPages);            

        const dataBrands = await fetchBrandsByCategory(product.selectedBrand)
            product.setBrandsByCategory(dataBrands.brandsByCategory)

        navigate(CATEGORY_ROUTE)
    }

    let img;
    if (product.selectedCategory.img === null) {
        img = (NO_IMAGE)
    } else {
        img = (LOCALHOST + product.selectedCategory.img)
    }

    return (
        <Row className='px-4'>
            <Col md={6} className='mt-3'>
                <h3
                    className='d-flex justify-content-center align-items-center'
                    style={{
                        color: 'green'
                    }}
                >
                    Category: {product.selectedCategory.name}
                </h3>
                <Image width={640} height={640} 
                    key={product.selectedCategory.id}
                    src={img}
                    className="d-block w-100"
                />
            </Col>
            <Col md={6} className='mt-3'>
                <h3 className='d-flex justify-content-center align-items-center' style={{color: 'black'}}>Info</h3>
                {product.selectedCategory.info}
            </Col>
            <Nav.Link
                className='d-flex justify-content-center align-items-center'
                onClick={click}
            >
                Back to {product.selectedCategory.name}
            </Nav.Link>
        </Row>
    );
};

export default CategoryInfoPage;