import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Context } from '../index';
import { fetchProductsCategoryByBrand } from '../http/categoryApi';
import { fetchTypes } from '../http/typeApi';
import { CATEGORY_ROUTE, PAGE_FIRST } from '../utils/const';
import { useNavigate } from 'react-router';
import { ListGroup } from 'react-bootstrap';

const CategoriesByBrand = observer(({category}) => {
    const {product} = useContext(Context)
    const {user} = useContext(Context)
    const navigate = useNavigate()


    const getCategory = async () => {
        product.setCountPages(PAGE_FIRST);
        product.setSelectedCategory(category);
        await fetchProductsCategoryByBrand(category.id, product.selectedBrand.id, user.user.role, PAGE_FIRST ).then(data => {
            product.setProducts(data.products);
            product.setCountPages(data.countPages);
        });
        await fetchTypes(category.id).then(data => {product.setTypes(data.types)})
        navigate(CATEGORY_ROUTE)
    }

    return (
        <ListGroup.Item 
            className="d-flex justify-content-center btn-primary" 
            variant={'outline-success'}
            onClick={() => getCategory()}
            style={{
                cursor: 'pointer',
                borderRadius: '7px'
            }}
        >
            {category.name}
        </ListGroup.Item>
    );
});

export default CategoriesByBrand;