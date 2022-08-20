import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Button, Card, Container, Form, FormControl, ModalFooter, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { orderAllItemsBasket, orderDetail } from '../http/orderApi';
import { cleanToCart, removeToCartItem } from '../http/basketApi';
import { Context } from '../index';
import { COMPLETED_ROUTE } from '../utils/const';
import { useInput } from '../http/validateApi';
import '../css/OrderPage.css'

const OrderPage = observer(() => {
    const {product} = useContext(Context)
    const {user} = useContext(Context)
    const city = useInput('', {minLength: {value: 3, name: 'City'}});
    const street = useInput('', {minLength: {value: 3, name: 'Street'}});
    const house = useInput(0, {isNumberId: {name: 'House'}});
    const flat = useInput(0, {isNumberId: {name: 'Flat'}});
    const commentsOrder = useInput('', {minLength: {value: 3, name: 'Comments Order'}});
    const paymentMethod = useInput(0, {isNumberId: {name: 'Payment Method'}});
    const navigate = useNavigate()

    const click = async () => {
        if (product.selectedProduct.id) {
            const data = await orderDetail(
                user.user.login, product.selectedProduct.id, product.selectedProduct.price, 
                city.value, street.value, house.value, flat.value, 
                commentsOrder.value, paymentMethod.value
            );
                product.setSelectedOrderId(data.orderId);

            await removeToCartItem(product.selectedProduct.id, user.user.login);
        } else {
            const data = await orderAllItemsBasket(
                user.user.login, city.value, street.value, 
                house.value, flat.value, commentsOrder.value, paymentMethod.value
            );
                product.setSelectedOrderId(data.orderId);

            await cleanToCart(user.user.login)
        }

        navigate(COMPLETED_ROUTE)
    }

    return (
        <Row className='orderFonPage'>
            <Container className='containerOrder'>
                <Card className='cardOrder'>
                    <h1>Completed orders</h1>
                    {(city.isDirty && city.minLengthError) && <div className='error'>{city.messageError}</div>}
                    <FormControl
                        className='formControlOrder'
                        placeholder='City'
                        value={city.value}
                        onChange={e => city.onChange(e)}
                        onBlur={e => city.onBlur(e)}
                    />

                    {(street.isDirty && street.minLengthError) && <div className='error'>{street.messageError}</div>}
                    <FormControl
                        className='formControlOrder'
                        placeholder='Street'
                        value={street.value}
                        onChange={e => street.onChange(e)}
                        onBlur={e => street.onBlur(e)}
                    />

                    {(house.isDirty && house.isNumberError) && <div className='error'>{house.messageError}</div>}
                    <FormControl
                        className='formControlOrder'
                        placeholder='House'
                        value={house.value}
                        onChange={e => house.onChange(e)}
                        onBlur={e => house.onBlur(e)}
                    />

                    {(flat.isDirty && flat.isNumberError) && <div className='error'>{flat.messageError}</div>}
                    <FormControl
                        className='formControlOrder'
                        placeholder='Flat'
                        value={flat.value}
                        onChange={e => flat.onChange(e)}
                        onBlur={e => flat.onBlur(e)}
                    />

                    {(commentsOrder.isDirty && commentsOrder.minLengthError) && <div className='error'>{commentsOrder.messageError}</div>}
                    <FormControl
                        className='formControlOrder'
                        placeholder='CommentsOrder'
                        value={commentsOrder.value}
                        onChange={e => commentsOrder.onChange(e)}
                        onBlur={e => commentsOrder.onBlur(e)}
                    />

                    {(paymentMethod.isDirty && paymentMethod.isNumberError) && <div className='error'>{paymentMethod.messageError}</div>}
                    <Form.Select 
                        className='formControlOrder'
                        onChange={e => paymentMethod.onChange(e)}
                        onBlur={e => paymentMethod.onBlur(e)}
                    >
                        <option value=''>
                            Payment Method
                        </option>
                        {product.paymentMethods.map(item => (
                            <option key={item.id} value={item.name}>{item.name}</option>
                        ))}
                    </Form.Select>

                    <ModalFooter
                        className='modalFooterOrder'
                    >
                        <Button
                            className='buttonOrder'
                            variant='outline-primary'
                            disabled={!city.inputValid || !street.inputValid || !house.inputValid || !flat.inputValid || !paymentMethod.inputValid}
                            onClick={click}
                        >
                            Place an order
                        </Button>
                    </ModalFooter>
                </Card>
            </Container>
        </Row>
    );
});

export default OrderPage;