import React, { useContext, useEffect } from 'react';
import { Context } from '../index';
import { fetchBrandsPopular, fetchProductsPopular, fetchCategoriesPopular } from '../http/homeApi';
import { fetchBrands } from '../http/brandApi';
import { fetchCategories } from '../http/categoryApi';
import { observer } from 'mobx-react-lite';
import { Carousel, Col, ListGroup, Row } from 'react-bootstrap';
import CategoryItem from '../components/CategoryItem';
import ProductItem from '../components/ProductItem';
import BrandBar from '../components/BrandBar';


const Home = observer(() => {
    const {product} = useContext(Context)

    useEffect(async () => {
        const dataPopularCategories = await fetchCategoriesPopular();
            product.setPopularCategories(dataPopularCategories.popularCategories);

        const dataCategories = await fetchCategories();
            product.setCategories(dataCategories.categories);

        const dataPopularBrands = await fetchBrandsPopular();
            product.setPopularBrands(dataPopularBrands.popularBrands);
        const dataBrands = await fetchBrands();
            product.setBrands(dataBrands.brands);
        
        const dataProducts = await fetchProductsPopular();
            product.setPopularProducts(dataProducts.popularProducts);
    }, [])

    return (
        <Row className='mt-2'>
            <Col md={2}>
                <ListGroup 
                    style={{ 
                        cursor: 'pointer' 
                    }}
                >
                    {product.popularBrands.map((brand) => 
                        <BrandBar key={brand.id} brand={brand}/>
                    )}
                </ListGroup>
            </Col>
            <Col md={9}>
                <Carousel variant="dark" className="d-block w-100">
                        {product.popularCategories.map(category => (
                        <Carousel.Item key={category.id}>
                            <CategoryItem key={category.id} category={category}/>
                        </Carousel.Item>
                    ))}
                </Carousel>
                <Row>
                    {product.popularProducts.map(prod => (
                        <ProductItem key={prod.id} prod={prod}/>
                    ))}
                </Row>
            </Col>      
        </Row>
    );
});

export default Home;