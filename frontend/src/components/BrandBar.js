import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { ListGroup, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { fetchProductsBrand } from '../http/brandApi';
import { fetchCategoriesByBrand } from '../http/categoryApi';
import { Context } from '../index';
import { BRAND_ROUTE, ERROR_ROUTE, PAGE_FIRST, PICTURE } from '../utils/const';
import '../css/HomePage.css'

const BrandBar = observer(({brandItem}) => {
    const {product} = useContext(Context);
    const {category} = useContext(Context);
    const {brand} = useContext(Context);
    const {user} = useContext(Context);
    const {messages} = useContext(Context);
    const {page} = useContext(Context);
    const {loading} = useContext(Context);
    const navigate = useNavigate();

    const getBrand = async () => {
        loading.setIsLoading(true)
        try {
            brand.setSelectedBrand(brandItem);
            const dataProducts = await fetchProductsBrand(brand.selectedBrand.id, user.user.role, PAGE_FIRST);
                product.setProducts(dataProducts.products);
                page.setCurrentPage(PAGE_FIRST);
                page.setCountPages(dataProducts.countPages);

            const dataCatgories = await fetchCategoriesByBrand(brand.selectedBrand.id);
                category.setCategoriesByBrand(dataCatgories.categoriesByBrand);

                navigate(BRAND_ROUTE)
        } catch (e) {
            messages.setMessageError(e.message);
                navigate(ERROR_ROUTE);
        } finally {
            loading.setIsLoading(false)
        }
    }

    return (
        <ListGroup.Item 
            className='listBrandItemHome'
            onClick={() => getBrand()}
        >
                <Image
                    src={PICTURE(brandItem.img)}
                    className="listBarndImgHome"
                />
                <h4 className='listBrandNameHome'>
                    {brandItem.name}
                </h4>
        </ListGroup.Item>
    );
});

export default BrandBar;