import React, { useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import RemoveBrand from './RemoveBrand';
import RemoveCategory from './RemoveCategory';
import RemovePaymentMethod from './RemovePaymentMethod';
import RemoveType from './RemoveType';
import '../../../css/AdminPage.css'
import { useContext } from 'react';
import { Context } from '../../../index';
import { fetchCategories } from '../../../http/categoryApi';
import { fetchBrands } from '../../../http/brandApi';
import { fetchTypes } from '../../../http/typeApi';
import { fetchPaymentMethods } from '../../../http/paymentMethodsApi';
import { observer } from 'mobx-react-lite';

const Remove = observer(() => {
    const {category} = useContext(Context);
    const {brand} = useContext(Context);
    const {type} = useContext(Context);
    const {paymentMethod} = useContext(Context);
    const [categoryRemoveVisible, setCategoryRemoveVisible] = useState(false);
    const [typeRemoveVisible, setTypeRemoveVisible] = useState(false);
    const [brandRemoveVisible, setBrandRemoveVisible] = useState(false);
    const [methodRemoveVisible, setMethodRemoveVisible] = useState(false);

    const removeCategory = async () => {
        const data = await fetchCategories();
            category.setCategories(data.categories);
        setCategoryRemoveVisible(true);
    }

    const removeBrand = async () => {
        const data = await fetchBrands();
            brand.setBrands(data.brands);
        setBrandRemoveVisible(true);
    }

    const removeType = async () => {
        const data = await fetchTypes();
            type.setTypes(data.types);
        setTypeRemoveVisible(true);
    }

    const removePaymentMethod = async () => {
        const data = await fetchPaymentMethods();
            paymentMethod.setPaymentMethods(data.paymentMethods);
        setMethodRemoveVisible(true);
    }

    return (
        <ListGroup
            className='listGroupAdmin'
            key='id'
        >
            <ListGroup.Item 
                className='listGroupItemBasket'
                onClick={removeCategory}
            >
                Remove a Category
            </ListGroup.Item>
            <ListGroup.Item  
                className='listGroupItemBasket'
                onClick={removeType}
            >
                Remove a Type
            </ListGroup.Item>
            <ListGroup.Item
                className='listGroupItemBasket'
                onClick={removeBrand}
            >
                Remove a Brand
            </ListGroup.Item>
            <ListGroup.Item
                className='listGroupItemBasket'
                onClick={removePaymentMethod}
            >
                Remove a Payment Method
            </ListGroup.Item>

            <RemoveCategory show={categoryRemoveVisible} onHide={() => setCategoryRemoveVisible(false)}/>
            <RemoveType show={typeRemoveVisible} onHide={() => setTypeRemoveVisible(false)}/>
            <RemoveBrand show={brandRemoveVisible} onHide={() => setBrandRemoveVisible(false)}/>
            <RemovePaymentMethod show={methodRemoveVisible} onHide={() => setMethodRemoveVisible(false)}/>
        </ListGroup>
    );
});

export default Remove;