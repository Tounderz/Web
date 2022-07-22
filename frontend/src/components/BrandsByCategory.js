import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Context } from '../index';
import { fetchProductsBrand } from '../http/brandApi';
import { BRAND_ROUTE, PAGE_FIRST } from '../utils/const';
import { useNavigate } from 'react-router';
import { ListGroup } from 'react-bootstrap';

const BrandsByCategory = observer(({brand}) => {
    const {product} = useContext(Context)
    const {user} = useContext(Context)
    const navigate = useNavigate()

    const getBrand = async () => {
        product.setSelectedBrand(brand);
        await fetchProductsBrand(product.selectedBrand.id, user.user.role, PAGE_FIRST).then(data => {
            product.setProducts(data.products);
            product.setCategoriesByBrand(data.categoriesByBrand);
            product.setCountPages(data.countPages)
        });
        navigate(BRAND_ROUTE)
    }
    
    return (
        <ListGroup.Item 
            className="d-flex justify-content-center btn-primary" 
            variant={'outline-success'}
            onClick={() => getBrand()}
            style={{
                cursor: 'pointer',
                borderRadius: '7px'
            }}
        >
            {brand.name}
        </ListGroup.Item >
    );
});

export default BrandsByCategory;