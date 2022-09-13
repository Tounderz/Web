import React, { useContext } from 'react';
import { Button, Card, Col } from 'react-bootstrap'
import { Context } from '../index';
import { useNavigate } from 'react-router';
import { PICTURE, PRODUCT_ROUTE } from '../utils/const';
import { fetchInfoProduct } from '../http/infoProductApi';
import '../css/ProductItem.css'

const ProductItem = ({prod}) => {
    const {product} = useContext(Context);
    const {brand} = useContext(Context);
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
            className='colProductItem'
            onClick={() => getProduct()}
        >
            <Card 
                className='cardProductItem'
            >
                <Card.Img 
                    className='cardImgProductItem'
                    src={PICTURE(prod.img)}
                />
                <div>
                    <div>
                        Brand: {brand.brands.filter(brandItem => {
                            return brandItem.id === prod.brandId}).map(brandItem => brandItem.name)}
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
                    <div className='availableProductItem'>
                        {available}
                    </div>
                    
                </div>
                <Button
                    variant='outline-primary' 
                    className='buttonProductItem'
                    onClick={() => getProduct()}
                >
                    Detail
                </Button>
            </Card>
        </Col>       
    );
};

export default ProductItem;