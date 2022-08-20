import React, { useContext } from 'react';
import { Context } from '../index';
import { useNavigate } from 'react-router';
import { Carousel, Col, Image } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { CATEGORY_ROUTE, ERROR_ROUTE, PAGE_FIRST, PICTURE } from '../utils/const';
import { fetchProductsCategory } from '../http/categoryApi';
import { fetchTypes } from '../http/typeApi';
import { fetchBrandsByCategory } from '../http/brandApi';
import '../css/HomePage.css'

const CategoryItem = observer(({category}) => {
    const {product} = useContext(Context)
    const {user} = useContext(Context)
    const {error} = useContext(Context)
    const navigate = useNavigate();
    
    const getCategory = async () => {
        try {
            const dataType = await fetchTypes(category.id, user.user.role, PAGE_FIRST);
                product.setTypes(dataType.types);
            
            const dataProducts = await fetchProductsCategory(category.id, user.user.role, PAGE_FIRST);
                product.setProducts(dataProducts.products);
                product.setSelectedBrand(dataProducts.brandsId);
                product.setCountPages(dataProducts.countPages);
                product.setSelectedCategory(category);

            const dataBrands = await fetchBrandsByCategory(product.selectedBrand);
                product.setBrandsByCategory(dataBrands.brandsByCategory);

            navigate(CATEGORY_ROUTE)
        } catch (e) {
            error.setMessageError(e.response.data.message)
            navigate(ERROR_ROUTE)
        }
    }

    return (
        <Col
            onClick={() => getCategory()}
        >
            <Image
                className='imgCarouselHome'
                key={category.id}
                src={PICTURE(category.img)}
                alt={category.name}
                
            />
            <Carousel.Caption>
                <h1 className='category-nameHome' >{category.name}</h1>
                <h3 className='category-shortDescriptionHome'>{category.shortDescription}</h3>
            </Carousel.Caption>
        </Col > 
    );
});

export default CategoryItem;