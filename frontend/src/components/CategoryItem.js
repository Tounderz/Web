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

const CategoryItem = observer(({categoryItem}) => {
    const {product} = useContext(Context);
    const {category} = useContext(Context);
    const {brand} = useContext(Context);
    const {type} = useContext(Context);
    const {user} = useContext(Context);
    const {sort} = useContext(Context);
    const {page} = useContext(Context);
    const {error} = useContext(Context);
    const navigate = useNavigate();
    
    const getCategory = async () => {
        try {
            const dataType = await fetchTypes(categoryItem.id, user.user.role, PAGE_FIRST);
                type.setTypes(dataType.types);
            
            const dataProducts = await fetchProductsCategory(categoryItem.id, user.user.role, PAGE_FIRST);
                product.setProducts(dataProducts.products);
                brand.setSelectedBrand(dataProducts.brandsId);
                page.setCountPages(dataProducts.countPages);
                page.setCurrentPage(PAGE_FIRST);
                category.setSelectedCategory(categoryItem);

            const dataBrands = await fetchBrandsByCategory(brand.selectedBrand);
                brand.setBrandsByCategory(dataBrands.brandsByCategory);

            navigate(CATEGORY_ROUTE)
        } catch (e) {
            error.setMessageError(e.message)
            navigate(ERROR_ROUTE)
        } finally {
            sort.setFieldNames([]);
            sort.setFieldName('');
            sort.setTypeSort('');
        }
    }

    return (
        <Col
            onClick={() => getCategory()}
        >
            <Image
                className='imgCarouselHome'
                key={categoryItem.id}
                src={PICTURE(categoryItem.img)}
                alt={categoryItem.name}
                
            />
            <Carousel.Caption>
                <h1 className='category-nameHome' >{categoryItem.name}</h1>
                <h3 className='category-shortDescriptionHome'>{categoryItem.shortDescription}</h3>
            </Carousel.Caption>
        </Col > 
    );
});

export default CategoryItem;