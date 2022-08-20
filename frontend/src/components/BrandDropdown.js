import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { fetchProductsBrand } from '../http/brandApi';
import { fetchCategoriesByBrand } from '../http/categoryApi';
import { Context } from '../index';
import { BRAND_ROUTE, ERROR_ROUTE, PAGE_FIRST } from '../utils/const';

const BrandDropdown = observer(({brand}) => {
    const {product} = useContext(Context);
    const {user} = useContext(Context);
    const {error} = useContext(Context);
    const {general} = useContext(Context);
    const navigate = useNavigate();

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
        } finally {
            general.setFieldNames([]);
            general.setFieldName('');
            general.setTypeSort('');
        }
    }

    return (
        <NavDropdown.Item onClick={() => getBrand()}>
            {brand.name}
        </NavDropdown.Item>
    );
});

export default BrandDropdown;