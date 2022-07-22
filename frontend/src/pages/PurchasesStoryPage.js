import { observer } from 'mobx-react-lite';
import React, { useContext, useState } from 'react';
import { Container, Image, Nav, Pagination, Row, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { Context } from '..';
import { ordersList } from '../http/orderApi';
import { LOCALHOST, NO_IMAGE, PAGE_FIRST, WELCOME_ROUTE } from '../utils/const';

const PurchasesStoryPage = observer(() => {
    const {product} = useContext(Context)
    const {user} = useContext(Context)
    const {error} = useContext(Context)
    const navigate = useNavigate()
    const pages = []
    const [page, setPage] = useState(PAGE_FIRST)

    const paginationClick = async (item) => {
        const data = await ordersList(user.user.login, item);
            product.setOrdersList(data.orders);
            product.setTotalAmount(data.totalAmount);
            setPage(item)
    }

    if (product.countPages > 1) {
        for (let index = 0; index < product.countPages; index++) {
            pages.push(index + 1);
        }
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
        <Container className='table-responsive mt-5'>
            {product.ordersList.length > 0 ? 
                <Table className='table table-bordered border-dark'>
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
                        {product.ordersList.map(item => 
                            <tr key={item.orderId}>
                                <th scope='row'>{item.orderId}</th>
                                <td>{item.orderTime}</td>
                                <td>{item.productName}</td>
                                <td>
                                    <Image 
                                        width={50}
                                        height={50}
                                        src={imgProduct(item.productImg)}
                                    />
                                </td>
                                <td>{item.productPrice}$</td>
                            </tr>
                        )}
                        <tr>
                            <th colSpan={4}>Total amount:</th>
                            <th>{product.totalAmount}$</th>
                        </tr>
                    </tbody>
                </Table>
                : 
                <h1 className='d-flex justify-content-center align-items-center'>{error.messageError}</h1>
            }
            <Row>
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
                <Nav.Link onClick={() => navigate(WELCOME_ROUTE)}>Cabinet</Nav.Link>
            </Row>
        </Container>
    );
});

export default PurchasesStoryPage;