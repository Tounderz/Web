import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { Context } from '../index';
import { CATEGORY_ROUTE, ERROR_ROUTE, PAGE_FIRST } from '../utils/const';
import { fetchProductsCategory } from '../http/categoryApi';
import { fetchTypes } from '../http/typeApi';
import { fetchBrandsByCategory } from '../http/brandApi';

const CategoryDropdown = observer(({category}) => {
    const {product} = useContext(Context);
    const {user} = useContext(Context);
    const {error} = useContext(Context);
    const {general} = useContext(Context);
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
        } finally {
            general.setFieldNames([]);
            general.setFieldName('');
            general.setTypeSort('');
        }
    }

    return (
        <Dropdown.Item onClick={() => getCategory()}>
            {category.name}
        </Dropdown.Item>
    );
});

export default CategoryDropdown;