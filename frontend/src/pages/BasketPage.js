import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { Button, Card, ModalFooter, Nav, Row } from "react-bootstrap";
import { useNavigate } from "react-router";
import { fetchBaskets } from "../http/basketApi";
import { fetchPaymentMethods } from "../http/paymentMethodsApi";
import { Context } from "../index";
import { SHOP_ROUTE, ORDER_ROUTE, PICTURE } from "../utils/const";
import '../css/BasketPage.css'
import ConfirmRemoval from "../components/models/remove/ConfirmRemoval";
import PageBar from "../components/PageBar";

const BasketPage = observer(() => {
    const {product} = useContext(Context);
    const {user} = useContext(Context);
    const {remove} = useContext(Context);
    const {cart} = useContext(Context);
    const {paymentMethod} = useContext(Context);
    const {page} = useContext(Context);
    const [removeVisible, setRemoveVisible] = useState(false);
    const navigate = useNavigate();

    const paginationClick = async () => {
        const data = await fetchBaskets(user.user.login, page.currentPage);
            cart.setBaskets(data.baskets);
            cart.setTotalAmount(data.sum);
            page.setCountPages(data.countPages);
    }

    const removeItem = async (item) => {
        setRemoveVisible(true);
        remove.setRemoveObjeck(item);
        remove.setRemoveParameterName('basketItem');
    }

    const cleanCart = async () => {
        setRemoveVisible(true);
        remove.setRemoveParameterName('cleanCart');
    }

    const pay = async (prod) => {
        product.setSelectedProduct(prod);
        const data  = await fetchPaymentMethods();
            paymentMethod.setPaymentMethods(data.paymentMethods);
        navigate(ORDER_ROUTE)
    }

    const payAllImets = async () => {
        product.setSelectedProduct({});
        const data  = await fetchPaymentMethods();
            paymentMethod.setPaymentMethods(data.paymentMethods);
        navigate(ORDER_ROUTE);
    }

    return (
        <Row className='basketfonPage'>
            {cart.baskets.map(prod => (
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
                        onClick={() => removeItem(prod)}
                    >
                        Remove
                    </Button>
                </Card>
            ))}
            <h1 className='totalBasket'>
                Total: {cart.totalAmount} $
            </h1>
            <Row onClick={() => paginationClick()}>
                <PageBar/>
            </Row>
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
                    disabled={cart.baskets.length < 1}
                    onClick={() => payAllImets()}
                >
                    To pay
                </Button>
                <Button
                    className='buttonBasket'
                    variant='outline-danger'
                    disabled={cart.baskets.length < 1}
                    onClick={() => cleanCart()}
                >
                    Clear Basket
                </Button>
            </ModalFooter> 
            <ConfirmRemoval show={removeVisible} onHide={() => setRemoveVisible(false)}/>   
        </Row>
    )
})

export default BasketPage;