import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Col, Nav, Row } from 'react-bootstrap';
import { Context } from '../index';
import ProductItem from '../components/ProductItem';
import { useNavigate } from 'react-router';
import { SHOP_ROUTE } from '../utils/const';
import { fetchProductsType } from '../http/typeApi';
import '../css/TypePage.css'
import PageBar from '../components/PageBar';

const TypePage = observer(() => {
    const {product} = useContext(Context);
    const {page} = useContext(Context);
    const {type} = useContext(Context);
    const {brand} = useContext(Context);
    const navigate = useNavigate();


    const paginationClick = async () => {
        const data = await fetchProductsType(type.selectedType.id, brand.brandsByType, page.currentPage);
            product.setProducts(data.products);
    }

    return (
        <Row className='typeFonPage'>
            <Col md={9}>
                <Row>
                    {product.products.map(item => (
                        <ProductItem key={item.id} prod={item}/>
                    ))}
                </Row>
            </Col>
            <Row onClick={() => paginationClick()}>
                <PageBar/>
            </Row>
            <Nav.Link onClick={() => navigate(SHOP_ROUTE)}>Back to top</Nav.Link>
        </Row>
    );
});

export default TypePage;