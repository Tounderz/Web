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
import '../css/HomePage.css'


const HomePage = observer(() => {
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
        <Row className='homeFonPage'>
            <Col 
                md={2}
                className='colListGroupHome'
            >
                <ListGroup 
                    className='listBrandHome'
                >
                    {product.popularBrands.map((brand) => 
                        <BrandBar key={brand.id} brand={brand}/>
                    )}
                </ListGroup>
            </Col>
            <Col 
                md={9}
                className='colCarouselHome'
            >
                <Carousel
                    className='carouselHome'
                    variant='dark'
                >
                    {product.popularCategories.map(category => (
                        <Carousel.Item

                            key={category.id}
                        >
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

export default HomePage;