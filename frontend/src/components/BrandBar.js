import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { ListGroup, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { fetchProductsBrand } from '../http/brandApi';
import { fetchCategoriesByBrand } from '../http/categoryApi';
import { Context } from '../index';
import { BRAND_ROUTE, ERROR_ROUTE, PAGE_FIRST, PICTURE } from '../utils/const';
import '../css/HomePage.css'

const BrandBar = observer(({brand}) => {
    const {product} = useContext(Context)
    const {user} = useContext(Context)
    const {error} = useContext(Context)
    const navigate = useNavigate()

    const getBrand = async () => {
        try {
            product.setSelectedBrand(brand);
            const dataProducts = await fetchProductsBrand(product.selectedBrand.id, user.user.role, PAGE_FIRST);
                product.setProducts(dataProducts.products);
                product.setSelectedCategory(dataProducts.categoriesId);
                product.setCountPages(dataProducts.countPages);

            const dataCatgories = await fetchCategoriesByBrand(product.selectedCategory);
                product.setCategoriesByBrand(dataCatgories.categoriesByBrand);

            navigate(BRAND_ROUTE)
        } catch (e) {
            error.setMessageError(e.response.data.message);
            navigate(ERROR_ROUTE);
        }  
    }

    return (
        <ListGroup.Item 
            className='listBrandItemHome'
            onClick={() => getBrand()}
        >
                <Image
                    src={PICTURE(brand.img)}
                    className="listBarndImgHome"
                />
                <h4 className='listBrandNameHome'>
                    {brand.name}
                </h4>
        </ListGroup.Item>
    );
});

export default BrandBar;