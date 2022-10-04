import { observer } from 'mobx-react-lite';
import React, { useContext, useState } from 'react';
import { Card, Col, Container, Row, Image, Button, Table } from 'react-bootstrap';
import { Context } from '../index';
import ProductInfoItem from '../components/ProductInfoItem';
import { useNavigate } from 'react-router';
import { LOCALHOST, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/const';
import { addToCart } from '../http/basketApi';
import CreateInfoProduct from '../components/models/create/CreateInfoProduct';
import { SvgSelector } from '../components/Svg/SvgSelector';
import '../css/ProductPage.css'

const ProductPage = observer(() => {
    const {user} = useContext(Context);
    const {product} = useContext(Context);
    const navigate = useNavigate();
    const [createInfoProduct, setCreateInfoProduct] = useState(false);

    const onClick = async () => {
        if(user.user.isAuth) {
            await addToCart(product.selectedProduct.id, user.user.login);
            navigate(SHOP_ROUTE);
        } else {
            navigate(LOGIN_ROUTE);
        }
    }

    let admin;
    if (user.user.role !== 'user' && user.user.isAuth) {
        admin =(
            <Button 
                className='button-create-info'
                variant='outline-success'
                onClick={() => {setCreateInfoProduct(true)}}
            >
                Create Info
            </Button>
        )
    }

    return (
        <div className='fonPageProduct'>
            <Container className='containerProduct'>
                <Row>
                    <Col md={3}>
                        <Row className='rowImgProduct'>
                            <Image
                                className='imgProduct'
                                src={LOCALHOST + product.selectedProduct.img}
                            />
                        </Row>
                    </Col>
                    <Col 
                        className='colModalProduct'
                        md={5}
                    >
                        <h2>Modal: </h2>
                        <h2>{product.selectedProduct.name}</h2>
                    </Col>
                    <Col 
                        md={3}                    
                        className='colCartProduct'
                    >
                        <Card
                            className='cardProduct'
                        >
                            <h1 className='addToCartProduct'>Price: {product.selectedProduct.price} $</h1>
                            <Row 
                                className='button-addToCartProduct'
                                disabled={!product.selectedProduct.available} 
                                onClick={onClick}
                            >
                                <SvgSelector id='addToCart'/>
                            </Row>
                        </Card>
                    </Col>
                </Row>
                <Row className='rowSpecificationsProduct'>
                    <h2>
                        Specifications:
                    </h2>
                    <Table 
                        key='id'
                        className='tableProduct'
                    >
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Title</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {product.infoProduct.map((info, id) => (
                                <ProductInfoItem key={id} info={info} id={id + 1}/>
                            ))}
                        </tbody>
                    </Table>
                </Row>
                {admin}
                <CreateInfoProduct show={createInfoProduct} onHide={() => setCreateInfoProduct(false)} productId={product.selectedProduct.id}/>
            </Container>
        </div>
    );
});

export default ProductPage;