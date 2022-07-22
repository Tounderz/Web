import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Card, Container, Form, FormControl, ModalFooter } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { orderAllItemsBasket, orderDetail } from '../http/orderApi';
import { cleanToCart, removeToCartItem } from '../http/basketApi';
import { Context } from '../index';
import { COMPLETED_ROUTE } from '../utils/const';
import { useInput } from '../http/validateApi';

const Order = observer(() => {
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
        <Container className='d-flex justify-content-center align-items-center'>
            <Card style={{width: 500}} className='p-5'>
                <h1 className="h3 mb-3 fw-normal">Completed orders</h1>
                {(city.isDirty && city.minLengthError) && <div className='mt-3' style={{color: 'red'}}>{city.messageError}</div>}
                <FormControl
                    className='mt-3'
                    placeholder='City'
                    value={city.value}
                    onChange={e => city.onChange(e)}
                    onBlur={e => city.onBlur(e)}
                />

                {(street.isDirty && street.minLengthError) && <div className='mt-3' style={{color: 'red'}}>{street.messageError}</div>}
                <FormControl
                    className='mt-3'
                    placeholder='Street'
                    value={street.value}
                    onChange={e => street.onChange(e)}
                    onBlur={e => street.onBlur(e)}
                />

                {(house.isDirty && house.isNumberError) && <div className='mt-3' style={{color: 'red'}}>{house.messageError}</div>}
                <FormControl
                    className='mt-3'
                    placeholder='House'
                    value={house.value}
                    onChange={e => house.onChange(e)}
                    onBlur={e => house.onBlur(e)}
                />

                {(flat.isDirty && flat.isNumberError) && <div className='mt-3' style={{color: 'red'}}>{flat.messageError}</div>}
                <FormControl
                    className='mt-3'
                    placeholder='Flat'
                    value={flat.value}
                    onChange={e => flat.onChange(e)}
                    onBlur={e => flat.onBlur(e)}
                />

                {(commentsOrder.isDirty && commentsOrder.minLengthError) && <div className='mt-3' style={{color: 'red'}}>{commentsOrder.messageError}</div>}
                <FormControl
                    className='mt-3'
                    placeholder='CommentsOrder'
                    value={commentsOrder.value}
                    onChange={e => commentsOrder.onChange(e)}
                    onBlur={e => commentsOrder.onBlur(e)}
                />

                {(paymentMethod.isDirty && paymentMethod.isNumberError) && <div className='mt-3' style={{color: 'red'}}>{paymentMethod.messageError}</div>}
                <Form.Select 
                    className='mt-3'
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

                <ModalFooter className='d-flex justify-content-betwwen mt-3 pl-3 pr-3'>
                    <button
                        className="btn-primary"
                        variant={'outline-success'}
                        style={{
                            cursor: 'pointer',
                            borderRadius: '5px'
                        }}
                        disabled={!city.inputValid || !street.inputValid || !house.inputValid || !flat.inputValid || !paymentMethod.inputValid}
                        onClick={click}
                    >
                        Place an order
                    </button>

                </ModalFooter>
            </Card>
        </Container>
    );
});

export default Order;