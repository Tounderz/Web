import React, { useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import CreateBrand from './CreateBrand';
import CreateCategory from './CreateCategory';
import CreatePaymentMethod from './CreatePaymentMethod';
import CreateProduct from './CreateProduct';
import CreateType from './CreateType';
import '../../../css/AdminPage.css'
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Context } from '../../../index';
import { fetchBrands } from '../../../http/brandApi';
import { fetchCategories } from '../../../http/categoryApi';
import { fetchTypes } from '../../../http/typeApi';

const Create = observer(() => {
    const {category} = useContext(Context);
    const {brand} = useContext(Context);
    const {type} = useContext(Context);
    const [categoryVisible, setCategoryVisible] = useState(false);
    const [typeVisible, setTypeVisible] = useState(false);
    const [brandVisible, setBrandVisible] = useState(false);
    const [productVisible, setProductVisible] = useState(false);
    const [methodVisible, setMethodVisible] = useState(false);

    const createCategory = async () => {
        const data = await fetchBrands();
            brand.setBrands(data.brands);
            
        setCategoryVisible(true);
    }

    const createBrand = async () => {
        const data = await fetchCategories();
            category.setCategories(data.categories);
        setBrandVisible(true);
    }

    const createType = async () => {
        const data = await fetchCategories();
            category.setCategories(data.categories);
        setTypeVisible(true);
    }

    const createProduct = async () => {
        const dataCategories = await fetchCategories();
            category.setCategories(dataCategories.categories);

        const dataBrands = await fetchBrands();
            brand.setBrands(dataBrands.brands);
        
        const dataTypes = await fetchTypes();
            type.setTypes(dataTypes.types);

        setProductVisible(true);
    }

    return (        
        <ListGroup 
            className='listGroupAdmin'
            key='id'
        >
            <ListGroup.Item 
                className='listGroupItemBasket'
                onClick={createCategory}
            >
                Create a Category
            </ListGroup.Item>
            <ListGroup.Item  
                className='listGroupItemBasket'
                onClick={createType}
            >
                 Create a Type
            </ListGroup.Item>
            <ListGroup.Item
                className='listGroupItemBasket'
                onClick={createBrand}
            >
                Create a Brand
            </ListGroup.Item>
            <ListGroup.Item 
                className='listGroupItemBasket'
                onClick={() => setMethodVisible(true)}
            >
                Create a Payment Method
            </ListGroup.Item>
            <ListGroup.Item 
                className='listGroupItemBasket'
                onClick={createProduct}
            >
                Create a Product
            </ListGroup.Item>
            
            <CreateCategory show={categoryVisible} onHide={() => setCategoryVisible(false)}/>
            <CreateType show={typeVisible} onHide={() => setTypeVisible(false)}/>
            <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)}/>
            <CreateProduct show={productVisible} onHide={() => setProductVisible(false)}/>
            <CreatePaymentMethod show={methodVisible} onHide={() => setMethodVisible(false)}/>
        </ListGroup>
    );
});

export default Create;