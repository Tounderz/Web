import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { fetchProductsBrand } from '../http/brandApi';
import { fetchCategoriesByBrand } from '../http/categoryApi';
import { Context } from '../index';
import { BRAND_ROUTE, ERROR_ROUTE, PAGE_FIRST } from '../utils/const';
import '../css/NavBar.css'

const BrandDropdown = observer(({brandItem}) => {
    const {product} = useContext(Context);
    const {category} = useContext(Context);
    const {brand} = useContext(Context);
    const {user} = useContext(Context);
    const {messages} = useContext(Context);
    const {page} = useContext(Context);
    const navigate = useNavigate();

    const getBrand = async () => {
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
            // messages.setMessageError(e.message);
            messages.setMessageError(e.response.data.message);
                navigate(ERROR_ROUTE);
        }
    }

    return (
        <NavDropdown.Item className='navDropdown-item' onClick={() => getBrand()}>
            {brandItem.name}
        </NavDropdown.Item>
    );
});

export default BrandDropdown;