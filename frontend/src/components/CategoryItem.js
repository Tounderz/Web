import React, { useContext } from 'react';
import { Context } from '../index';
import { useNavigate } from 'react-router';
import { Carousel, Col, Image } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { CATEGORY_ROUTE, ERROR_ROUTE, PAGE_FIRST, PICTURE } from '../utils/const';
import { fetchProductsCategory } from '../http/categoryApi';
import { fetchTypes } from '../http/typeApi';
import { fetchBrandsByCategory } from '../http/brandApi';

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
            className="d-flex justify-content-center btn-primary" 
            variant={'outline-success'} 
            onClick={() => getCategory()}
        >
            <Image width={360} height={640} 
                key={category.id}
                src={PICTURE(category.img)}
                className="d-block w-100"
                alt={category.name}
            />
                <Carousel.Caption>
                    <h1 style={{color: '#490005'}}>{category.name}</h1>
                    <h3 style={{color: '#0E294B'}}>{category.shortDescription}</h3>
                </Carousel.Caption>
        </Col > 
    );
});

export default CategoryItem;