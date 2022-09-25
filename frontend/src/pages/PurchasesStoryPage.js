import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Col, Image, Nav, Row, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { Context } from '..';
import PageBar from '../components/PageBar';
import { ordersList } from '../http/orderApi';
import { LOCALHOST, NO_IMAGE, PERSONAL_ACCOUNT_ROUTE } from '../utils/const';

const PurchasesStoryPage = observer(() => {
    const {page} = useContext(Context);
    const {order} = useContext(Context);
    const {user} = useContext(Context);
    const {messages} = useContext(Context);
    const navigate = useNavigate();

    const paginationClick = async () => {
        const data = await ordersList(user.user.login, page.currentPage);
            order.setOrdersList(data.orders);
            order.setTotalAmount(data.totalAmount);
    }

    const imgProduct = (productImg) => {
        let img;
        if (productImg === null) {
            img = NO_IMAGE
        } else {
            img = LOCALHOST + productImg
        }
        
        return img;
    }

    return (
        <Row className='tableFonPage'>
            <Col className='containerTable'>
                {order.ordersList.length > 0 ? 
                    <Table className='tableTable'>
                        <thead>
                            <tr>
                                <th scope='col'>Order Id</th>
                                <th scope='col'>Order Time</th>
                                <th scope='col'>Product Name</th>
                                <th scope='col'>Product Img</th>
                                <th scope='col'>Product Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order.ordersList.map(item => 
                                <tr key={item.orderId}>
                                    <th scope='row'>{item.orderId}</th>
                                    <td>{item.orderTime}</td>
                                    <td>{item.productName}</td>
                                    <td>
                                        <Image 
                                            className='imgTable'
                                            src={imgProduct(item.productImg)}
                                        />
                                    </td>
                                    <td>{item.productPrice}$</td>
                                </tr>
                            )}
                            <tr>
                                <th colSpan={4}>Total amount:</th>
                                <th>{order.totalAmount}$</th>
                            </tr>
                        </tbody>
                    </Table>
                    : 
                    <h1 className='errorTable'>{messages.messageError}</h1>
                }
                <Row onClick={() => paginationClick()}>
                    <PageBar/>
                </Row>
                <Nav.Link 
                        className='navigateTable'
                        onClick={() => navigate(PERSONAL_ACCOUNT_ROUTE)}
                    >
                        Cabinet
                    </Nav.Link>
            </Col>
        </Row>
    );
});

export default PurchasesStoryPage;