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
    const {product} = useContext(Context);
    const {category} = useContext(Context);
    const {brand} = useContext(Context);

    useEffect(async () => {
        const dataPopularCategories = await fetchCategoriesPopular();
            category.setPopularCategories(dataPopularCategories.popularCategories);

        const dataCategories = await fetchCategories();
            category.setCategories(dataCategories.categories);

        const dataPopularBrands = await fetchBrandsPopular();
            brand.setPopularBrands(dataPopularBrands.popularBrands);
        const dataBrands = await fetchBrands();
            brand.setBrands(dataBrands.brands);
        
        const dataProducts = await fetchProductsPopular();
            product.setPopularProducts(dataProducts.popularProducts);
    }, [brand, category, product])

    return (
        <Row className='homeFonPage'>
            <Col 
                md={2}
                className='colListGroupHome'
            >
                <ListGroup 
                    className='listBrandHome'
                >
                    {brand.popularBrands.map(brandItem => 
                        <BrandBar key={brandItem.id} brandItem={brandItem}/>
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
                    {category.popularCategories.map(categoryItem => (
                        <Carousel.Item

                            key={categoryItem.id}
                        >
                            <CategoryItem key={categoryItem.id} categoryItem={categoryItem}/>
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