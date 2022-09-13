import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { Context } from '../index';
import { CATEGORY_ROUTE, ERROR_ROUTE, PAGE_FIRST } from '../utils/const';
import { fetchProductsCategory } from '../http/categoryApi';
import { fetchTypes } from '../http/typeApi';
import { fetchBrandsByCategory } from '../http/brandApi';
import '../css/NavBar.css'

const CategoryDropdown = observer(({categoryItem}) => {
    const {product} = useContext(Context);
    const {category} = useContext(Context);
    const {brand} = useContext(Context);
    const {type} = useContext(Context);
    const {user} = useContext(Context);
    const {error} = useContext(Context);
    const {page} = useContext(Context);
    const navigate = useNavigate();

    const getCategory = async () => {
        try {
            const dataType = await fetchTypes(categoryItem.id, user.user.role, PAGE_FIRST);
                type.setTypes(dataType.types);
            
            const dataProducts = await fetchProductsCategory(categoryItem.id, user.user.role, PAGE_FIRST);
                product.setProducts(dataProducts.products);
                brand.setSelectedBrand(dataProducts.brandsId);
                page.setCurrentPage(PAGE_FIRST);
                page.setCountPages(dataProducts.countPages);
                category.setSelectedCategory(categoryItem);

            const dataBrands = await fetchBrandsByCategory(brand.selectedBrand);
                brand.setBrandsByCategory(dataBrands.brandsByCategory);

            navigate(CATEGORY_ROUTE)
        } catch (e) {
            error.setMessageError(e.message)
            navigate(ERROR_ROUTE)
        }
    }

    return (
        <Dropdown.Item onClick={() => getCategory()}>
            {categoryItem.name}
        </Dropdown.Item>
    );
});

export default CategoryDropdown;