import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { Card, Col, Container, Image, ModalFooter, Nav, Row } from "react-bootstrap";
import { useNavigate } from "react-router";
import UpdateUser from "../components/models/update/UpdateUser";
import UpdatePassword from "../components/models/update/UpdatePassword";
import { logout } from "../http/userApi";
import { Context } from "../index";
import { 
         SHOP_ROUTE, BASKET_ROUTE, 
         PURCHASES_STORY_ROUTE, 
         PAGE_FIRST,
         PICTURE
        } from "../utils/const";
import UpdatePhoto from "../components/models/update/UpdatePhoto";
import { ordersList } from "../http/orderApi";
import { fetchBaskets } from "../http/basketApi";

const Welcome = observer(() => {
    const {user} = useContext(Context)
    const {product} = useContext(Context)
    const {error} = useContext(Context)
    const navigate = useNavigate()
    const [userUpdateVisible, setUserUpdateVisible] = useState(false);
    const [updatePasswordVisible, setUpdatePasswordVisible] = useState(false)
    const [updatePhotoVisible, setUpdatePhotoVisible] = useState(false)
    
    const logOut = async () => {
        const data = await logout();
            user.setUser(data.user)
            localStorage.removeItem('accessToken');
        navigate(SHOP_ROUTE)
    }

    const userUpdate = async () => {
        setUserUpdateVisible(true)
    }

    const updatePassword = () => {
        setUpdatePasswordVisible(true)
    }

    const updatePhoto = async (e) => {
        setUpdatePhotoVisible(true)
    }

    const basket = async () => {
        const data = await fetchBaskets(user.user.login, PAGE_FIRST);
            product.setBaskets(data.baskets);
            product.setTotalAmount(data.sum);
            product.setCountPages(data.countPages);
            navigate(BASKET_ROUTE);
    }

    const purchaseHistory = async () => {
        try {
            const data = await ordersList(user.user.login, PAGE_FIRST);
            product.setOrdersList(data.orders);
            product.setTotalAmount(data.totalAmount);
            product.setCountPages(data.countPages);
            navigate(PURCHASES_STORY_ROUTE);
        } catch (e) {
            error.setMessageError(e.response.data.messageError)
            navigate(PURCHASES_STORY_ROUTE);
        }

    }

    return (
        <Container className='mt-2'>
            <Row className='d-flex justify-content-center align-items-center'>
                <h1 className='d-flex justify-content-center align-items-center'>{`Welcome ${user.user.login}`}</h1>
            </Row>
            <Row>
                <Col md={3}>
                    <Card 
                        style={{
                            width: '10rem',
                        }}
                        border={'light'}
                    >
                        <Image
                            className='align-items-center'
                            style={{
                                borderRadius: '5px'
                            }}
                            width={158}
                            height={150}
                            key={user.selectedUser.id}
                            src={PICTURE(user.selectedUser.img)}
                            alt={user.user.login}
                        />
                        <button 
                            className='btn-success m-2'
                            variant={'outline-success'}
                            style={{
                                cursor: 'pointer',
                                borderRadius: '5px'
                            }}
                            onClick={updatePhoto}
                        >
                            Update photo
                        </button>
                    </Card>
                </Col>
                <Col 
                    className='d-flex justify-content-center align-items-right'
                >
                    <Card
                        style={{
                            width: '13rem',
                        }}
                        border={'light'}
                        className='d-flex justify-content-center'
                    >
                        <button 
                            className='btn-primary m-2'
                            variant={'outline-success'}
                            style={{
                                cursor: 'pointer',
                                borderRadius: '5px'
                            }}
                            onClick={updatePassword}
                        >
                            Update Password
                        </button>
                        <button 
                            className='btn-primary m-2'
                            variant={'outline-success'}
                            style={{
                                cursor: 'pointer',
                                borderRadius: '5px'
                            }}
                            onClick={userUpdate}
                        >
                            Update data
                        </button>
                        <button
                            className='btn-success m-2'
                            variant={'outline-success'}
                            style={{
                                cursor: 'pointer',
                                borderRadius: '5px'
                            }}
                            onClick={purchaseHistory}
                        >
                            Purchases story
                        </button>
                    </Card>
                </Col>
            </Row>
            <ModalFooter>
                <Nav.Link onClick={() => navigate(SHOP_ROUTE)}>Back to top</Nav.Link>
                <button 
                    className="btn-primary m-2"
                    variant={'outline-success'}
                    style={{
                        cursor: 'pointer',
                        borderRadius: '5px'
                    }}
                    onClick={basket}
                >
                    Basket
                </button>
                <button 
                    className='btn-danger'
                    variant={'outline-success'}
                    style={{
                        cursor: 'pointer',
                        borderRadius: '5px'
                    }}
                    onClick={logOut}
                >
                    Logout
                </button>
            </ModalFooter>
            <UpdateUser show={userUpdateVisible} onHide={() => setUserUpdateVisible(false)}/>
            <UpdatePassword show={updatePasswordVisible} onHide={() => setUpdatePasswordVisible(false)}/>
            <UpdatePhoto show={updatePhotoVisible} onHide={() => setUpdatePhotoVisible(false)}/>
        </Container>
    );
});

export default Welcome;