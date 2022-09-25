import React, { useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import UpdateBrand from './UpdateBrand';
import UpdateCategory from './UpdateCategory';
import UpdatePaymentMethod from './UpdatePaymentMethod';
import UpdateType from './UpdateType';
import '../../../css/AdminPage.css'
import { fetchCategories } from '../../../http/categoryApi';
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Context } from '../../../index';
import { fetchBrands } from '../../../http/brandApi';
import { fetchTypes } from '../../../http/typeApi';
import { fetchPaymentMethods } from '../../../http/paymentMethodsApi';

const Update = observer(() => {
    const {category} = useContext(Context);
    const {brand} = useContext(Context);
    const {type} = useContext(Context);
    const {paymentMethod} = useContext(Context);
    const [categoryUpdateVisible, setCategoryUpdateVisible] = useState(false);
    const [typeUpdateVisible, setTypeUpdateVisible] = useState(false);
    const [brandUpdateVisible, setBrandUpdateVisible] = useState(false);
    const [methodUpdateVisible, setMethodUpdateVisible] = useState(false);

    const categoriesAndBrands = async () => {
        const dataCategories = await fetchCategories();
            category.setCategories(dataCategories.categories);
        const dataBrands = await fetchBrands();
            brand.setBrands(dataBrands.brands);
    }

    const updateCategory = async () => {
        categoriesAndBrands();
        brand.setBrandsByCategory([]);
        setCategoryUpdateVisible(true);
    }

    const updateBrand = async () => {
        categoriesAndBrands();
        category.setCategoriesByBrand([]);
        setBrandUpdateVisible(true);
    }

    const updateType = async () => {
        const dataTypes = await fetchTypes();
            type.setTypes(dataTypes.types);
        const dataCategories = await fetchCategories();
            category.setCategories(dataCategories.categories);
        setTypeUpdateVisible(true);
    }

    const updatePaymentMethod = async () => {
        const data = await fetchPaymentMethods();
            paymentMethod.setPaymentMethods(data.paymentMethods);
        setMethodUpdateVisible(true);
    }

    return (
        <ListGroup
            className='listGroupAdmin'
            key='id'
        >
            <ListGroup.Item 
                className='listGroupItemBasket'
                onClick={updateCategory}
            >
                Update a Category
            </ListGroup.Item>
            <ListGroup.Item  
                className='listGroupItemBasket'
                onClick={updateType}
            >
                Update a Type
            </ListGroup.Item>
            <ListGroup.Item
                className='listGroupItemBasket'
                onClick={updateBrand}
            >
                Update a Brand
            </ListGroup.Item>

            <ListGroup.Item
                className='listGroupItemBasket'
                onClick={updatePaymentMethod}
            >
                Update a Payment Method
            </ListGroup.Item>

            <UpdateCategory show={categoryUpdateVisible} onHide={() => setCategoryUpdateVisible(false)}/>
            <UpdateBrand show={brandUpdateVisible} onHide={() => setBrandUpdateVisible(false)}/>
            <UpdateType show={typeUpdateVisible} onHide={() => setTypeUpdateVisible(false)}/>
            <UpdatePaymentMethod show={methodUpdateVisible} onHide={() => setMethodUpdateVisible(false)}/>
        </ListGroup>
    );
});

export default Update;