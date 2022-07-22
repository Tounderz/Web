import React, { useContext } from 'react';
import { Card, Col } from 'react-bootstrap'
import { Context } from '../index';
import { useNavigate } from 'react-router';
import { PICTURE, PRODUCT_ROUTE } from '../utils/const';
import { fetchInfoProduct } from '../http/infoProductApi';

const ProductItem = ({prod}) => {
    const{product} = useContext(Context)
    const navigate = useNavigate()

    const getProduct = async () => {
        product.setSelectedProduct(prod);
        const data = await fetchInfoProduct(product.selectedProduct.id);
        product.setInfoProduct(data.infoProducts)
        navigate(PRODUCT_ROUTE)
    }

    let available;
    if (prod.available) {
        available = 'Available in stock'
    } else {
        available = 'Out of stock'
    }
    
    return (
        <Col 
            md={3} 
            className='mt-3'
        >
            <Card style={
                {
                    maxwidth: '18rem', 
                }} 
                border={'light'}
            >
                <Card.Img width={250} height={250} src={PICTURE(prod.img)}/>
                <div>
                    <div>
                        Brand: {product.brands.filter(brand => {return brand.id === prod.brandId}).map(brand => brand.name)}
                    </div>
                    <div>
                        Model: {prod.name}
                    </div>
                    <div>
                        Short Description: {prod.shortDescription}
                    </div>
                    <div>
                        Price: {prod.price}$
                    </div>
                    <div className='d-flex justify-content-center align-items-center'>
                        {available}
                    </div>
                    
                </div>
                <button
                    className="btn-primary" 
                    variant={'outline-success'} 
                    onClick={() => getProduct()}
                    style={{
                        cursor: 'pointer',
                        borderRadius: '5px',
                        marginTop: '15px'
                    }}
                >
                    Detail
                </button>
            </Card>
        </Col>       
    );
};

export default ProductItem;