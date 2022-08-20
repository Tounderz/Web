import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { Button, Card, ModalFooter, Nav, Pagination, Row } from "react-bootstrap";
import { useNavigate } from "react-router";
import { cleanToCart, fetchBaskets, removeToCartItem } from "../http/basketApi";
import { fetchPaymentMethods } from "../http/paymentMethodsApi";
import { Context } from "../index";
import { SHOP_ROUTE, ORDER_ROUTE, PAGE_FIRST, PICTURE } from "../utils/const";
import '../css/BasketPage.css'

const BasketPage = observer(() => {
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
        <Row className='basketfonPage'>
            {product.baskets.map(prod => (
                <Card
                    className='cardBasket'
                >
                    <Card.Img 
                        className='cardImgBasket'
                        src={PICTURE(prod.img)}
                    />
                    <div>
                        {prod.name}
                    </div>
                    <div>
                        Price: {prod.price}$
                    </div>
                    <Button 
                        className='buttonProductBasket'
                        variant='outline-success'
                        onClick={() => pay(prod)}
                    >
                        To pay
                    </Button>
                    <Button
                        className='buttonProductBasket'
                        variant='outline-danger'
                        onClick={() => removeItem(prod.id)}
                    >
                        Remove
                    </Button>
                </Card>
            ))}
            <h1 className='totalBasket'>
                Total: {product.totalAmount} $
            </h1>
            <Pagination className='pagination' size='sm'>
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
            <ModalFooter className='modalFooterBasket'> 
                <Nav.Link
                    className='navLinkBasket'
                    onClick={() => navigate(SHOP_ROUTE)}
                >
                    Back to top
                </Nav.Link>
                <Button 
                    className='buttonBasket'
                    variant='outline-primary'
                    onClick={() => payAllImets()}
                >
                    To pay
                </Button>
                <Button
                    className='buttonBasket'
                    variant='outline-danger'
                    onClick={() => cleanCart()}
                >
                    Clear Basket
                </Button>
            </ModalFooter> 
        </Row>
    )
})

export default BasketPage;