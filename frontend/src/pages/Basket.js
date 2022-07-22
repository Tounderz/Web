import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { Card, ModalFooter, Nav, Pagination, Row } from "react-bootstrap";
import { useNavigate } from "react-router";
import { cleanToCart, fetchBaskets, removeToCartItem } from "../http/basketApi";
import { fetchPaymentMethods } from "../http/paymentMethodsApi";
import { Context } from "../index";
import { SHOP_ROUTE, ORDER_ROUTE, PAGE_FIRST } from "../utils/const";

const Basket = observer(() => {
    const {product} = useContext(Context)
    const {user} = useContext(Context)
    const navigate = useNavigate()
    const pages = []
    const [page, setPage] = useState(PAGE_FIRST)

    const paginationClick = async (item) => {
        const data = await fetchBaskets(user.user.login, item);
            product.setBaskets(data.baskets);
            product.setTotalAmount(data.sum);
            product.setCountPages(data.countPages);
            setPage(item);
    }

    const removeItem = async (id) => {
        const data = await removeToCartItem(id, user.user.login, PAGE_FIRST);
            product.setBaskets(data.baskets);
            product.setTotalAmount(data.sum);
            product.setCountPages(data.countPages);
    }

    const cleanCart = async () => {
        const data = await cleanToCart(user.user.login, PAGE_FIRST);
            product.setBaskets(data.baskets);
            product.setTotalAmount(data.sum);
            product.setCountPages(data.countPages);
    }

    const pay = async (prod) => {
        product.setSelectedProduct(prod);
        const data  = await fetchPaymentMethods();
            product.setPaymentMethods(data.paymentMethods);
        navigate(ORDER_ROUTE)
    }

    const payAllImets = async () => {
        product.setSelectedProduct({})
        const data  = await fetchPaymentMethods();
            product.setPaymentMethods(data.paymentMethods);
        navigate(ORDER_ROUTE)
    }

    if (product.countPages > 1) {
        for (let index = 0; index < product.countPages; index++) {
            pages.push(index + 1);
        }
    }

    return (
        <Row className='mt-4 m-3'>
            {product.baskets.map(prod => (
                <Card style={
                    {
                        width: '18rem', 
                    }} 
                    border={'light'}
                    className='mt-3 m-3'
                >
                    <Card.Img width={250} height={250} src={'https://localhost:44315/'+ prod.img}/>
                    <div>
                        {prod.name}
                    </div>
                    <div>
                        Price: {prod.price}$
                    </div>
                    <button 
                        className='btn-primary mt-1'
                        style={{
                            cursor: 'pointer',
                            borderRadius: '5px'
                        }}
                        onClick={() => pay(prod)}
                    >
                        To pay
                    </button>
                    <button
                        className="d-flex justify-content-center btn-danger mt-1"
                        variant={'outline-success'}
                        style={{
                            cursor: 'pointer',
                            borderRadius: '5px'
                        }}
                        onClick={() => removeItem(prod.id)}
                    >
                        Remove
                    </button>
                </Card>
            ))}
            <h1 className='d-flex justify-content-center align-items-center mt-4'>
                Total: {product.totalAmount} $
            </h1>
            <ModalFooter className='d-flex justify-content-betwwen mt-3 pl-3 pr-3'> 
                <button 
                    className='btn-primary'
                    variant={'outline-success'}
                    style={{
                        cursor: 'pointer',
                        borderRadius: '5px'
                    }}
                    onClick={() => payAllImets()}
                >
                    To pay
                </button>
                <button
                    className="btn-danger"
                    variant={'outline-success'}
                    style={{
                        cursor: 'pointer',
                        borderRadius: '5px'
                    }}
                    onClick={() => cleanCart()}
                >
                    Clear Basket
                </button>
            </ModalFooter> 
            <Row className="mt-3">
                <Pagination className='d-flex justify-content-center align-items-center mt-3' size='sm'>
                    {pages.map(item =>
                        <Pagination.Item
                            key={item}
                            active={item === page}
                            onClick={() => paginationClick(item)}
                        >
                            {item}
                        </Pagination.Item>
                    )}
                </Pagination>  
                <Nav.Link
                    onClick={() => navigate(SHOP_ROUTE)}
                >
                    Back to top
                </Nav.Link>
            </Row>
        </Row>
    )
})

export default Basket;