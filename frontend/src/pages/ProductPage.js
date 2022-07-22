import { observer } from 'mobx-react-lite';
import React, { useContext, useState } from 'react';
import { Card, Col, Container, Row, Image } from 'react-bootstrap';
import { Context } from '../index';
import ProductInfoItem from '../components/ProductInfoItem';
import { useNavigate } from 'react-router';
import { LOCALHOST, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/const';
import { addToCart } from '../http/basketApi';
import CreateInfoProduct from '../components/models/create/CreateInfoProduct';

const ProductPage = observer(() => {
    const {user} = useContext(Context)
    const {product} = useContext(Context)
    const navigate = useNavigate()
    const [createInfoProduct, setCreateInfoProduct] = useState(false)

    const onClick = async () => {
        if(user.user.isAuth) {
            await addToCart(product.selectedProduct.id, user.user.login);
            navigate(SHOP_ROUTE)
        } else {
            navigate(LOGIN_ROUTE)
        }
    }

    let admin;
    if (user.user.role !== 'user' && user.user.isAuth) {
        admin =(
            <button 
                className='btn-success'
                variant={'outline-success'} 
                onClick={() => {setCreateInfoProduct(true)}}
                style={{
                    cursor: 'pointer',
                    borderRadius: '5px'
                }}
            >
                Create Info
            </button>
        )
    }

    return (
        <Container className='mt-3'>
            <Row>
                <Col md={3}>
                    <Row className='d-flex flex-column align-items-center mt-3'>
                        <Image
                            width={300}
                            height={300} 
                            src={LOCALHOST + product.selectedProduct.img}
                        />
                    </Row>
                </Col>
                <Col className='d-flex flex-column align-items-center mt-5' md={5}>
                    <h2>Modal: </h2>
                    <h2>{product.selectedProduct.name}</h2>
                </Col>
                <Col 
                    md={3}                    
                    className='d-flex flex-column m-3'
                >
                    <Card
                        className='d-flex flex-column align-items-center justify-content-around'
                        style={{
                            width: 350,
                            height: 350,
                            fontSize: 32,
                            border: '5px solid lightgray',
                        }}
                    >
                        <h3>{product.selectedProduct.price} $</h3>
                        <button
                            className="btn-primary"
                            variant={'outline-dark'}
                            onClick={onClick}
                        >
                            In the basket
                        </button>
                    </Card>
                </Col>
            </Row>
            <Row className='d-flex flex-column m-3'>
                <h2>
                    Specifications:
                </h2>
                {product.infoProduct.map((info, id) => (
                    <Row 
                        key={info.id} 
                        style={{
                            background: id % 2 === 0 ? 'lightgray' : 'transparent', padding: 10
                        }}
                        >
                            <ProductInfoItem info={info} id={id + 1}/>
                    </Row>
                ))}
            </Row>
            {admin}
            <CreateInfoProduct show={createInfoProduct} onHide={() => setCreateInfoProduct(false)} productId={product.selectedProduct.id}/>
        </Container>
    );
});

export default ProductPage;