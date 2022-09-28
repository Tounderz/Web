import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { Button, Card, Col, Image, ModalFooter, Nav, Row } from "react-bootstrap";
import { useNavigate } from "react-router";
import UpdateUser from "../components/models/update/UpdateUser";
import UpdatePassword from "../components/models/update/UpdatePassword";
import { fetchUser, logout } from "../http/userApi";
import { Context } from "../index";
import { 
         SHOP_ROUTE, BASKET_ROUTE, 
         PURCHASES_STORY_ROUTE, 
         PAGE_FIRST,
         PICTURE,
         CABINET_NAME
        } from "../utils/const";
import UpdatePhoto from "../components/models/update/UpdatePhoto";
import { ordersList } from "../http/orderApi";
import { fetchBaskets } from "../http/basketApi";
import '../css/PersonalAccountPage.css'
import ConfirmRemoval from "../components/models/remove/ConfirmRemoval";

const PersonalAccountPage = observer(() => {
    const {user} = useContext(Context);
    const {order} = useContext(Context);
    const {messages} = useContext(Context);
    const {cart} = useContext(Context);
    const {page} = useContext(Context);
    const {updates} = useContext(Context);
    const {remove} = useContext(Context);
    const navigate = useNavigate();
    const [userUpdateVisible, setUserUpdateVisible] = useState(false);
    const [updatePasswordVisible, setUpdatePasswordVisible] = useState(false);
    const [updatePhotoVisible, setUpdatePhotoVisible] = useState(false);
    const [removeVisible, setRemoveVisible] = useState(false);
    
    const logOut = async () => {
        const data = await logout();
            user.setUser(data.user)
            localStorage.removeItem('accessToken');
        navigate(SHOP_ROUTE)
    }

    const userUpdate = async () => {
        updates.setUpdateParameter(CABINET_NAME);
        setUserUpdateVisible(true);
    }

    const updatePassword = () => {
        setUpdatePasswordVisible(true);
    }

    const updatePhoto = async (e) => {
        setUpdatePhotoVisible(true);
    }

    const basket = async () => {
        const data = await fetchBaskets(user.user.login, PAGE_FIRST);
            cart.setBaskets(data.baskets);
            cart.setTotalAmount(data.sum);
            page.setCurrentPage(PAGE_FIRST);
            page.setCountPages(data.countPages);
            navigate(BASKET_ROUTE);
    }

    const purchaseHistory = async () => {
        try {
            const data = await ordersList(user.user.login, PAGE_FIRST);
                order.setOrdersList(data.orders);
                order.setTotalAmount(data.totalAmount);
                page.setCurrentPage(PAGE_FIRST);
                page.setCountPages(data.countPages);
                navigate(PURCHASES_STORY_ROUTE);
        } catch (e) {
            messages.setMessageError(e.message);
                order.setOrdersList([]);
                order.setTotalAmount(0);
                page.setCurrentPage(PAGE_FIRST);
                page.setCountPages(0);
                navigate(PURCHASES_STORY_ROUTE);
        }
    }

    const userRemove = async () => {
        setRemoveVisible(true);
        const data = await fetchUser(user.user.login);
            remove.setRemoveObjeck(data.user);
        remove.setRemoveParameterName('userCabinet');
    };

    return (
        <Row className='accountFonPage'>
            <Col className='containerAccount'>
                <h1>{`Welcome ${user.user.login}`}</h1>
                <Row>
                    <Col md={3}>
                        <Card 
                            className='cardPhotoAccount'
                        >
                            <Image
                                className='imgAccount'
                                key={user.selectedUser.id}
                                src={PICTURE(user.selectedUser.img)}
                                alt={user.user.login}
                            />
                            <Button 
                                className='imgButtonAccount'
                                variant='outline-success'
                                onClick={updatePhoto}
                            >
                                Update photo
                            </Button>
                        </Card>
                    </Col>
                    <Col 
                        className='colCardButtonsAccount'
                    >
                        <Card
                            className='cardButtonsAccount'
                        >
                            <Button 
                                className='buttonCardAccount'
                                variant='outline-warning'
                                onClick={updatePassword}
                            >
                                Update Password
                            </Button>
                            <Button
                                className='buttonCardAccount'
                                variant='outline-primary'
                                onClick={userUpdate}
                            >
                                Update data
                            </Button>
                            <Button
                                className='buttonCardAccount'
                                variant='outline-success'
                                onClick={purchaseHistory}
                            >
                                Purchases story
                            </Button>
                            <Button
                                className='buttonCardAccount'
                                variant='outline-danger'
                                onClick={userRemove}
                            >
                                Delete Account
                            </Button>
                        </Card>
                    </Col>
                </Row>
                <ModalFooter className='modalFooterAccount'>
                    <Nav.Link
                        className='navLink'
                        onClick={() => navigate(SHOP_ROUTE)}
                    >
                        Back to top
                    </Nav.Link>
                    <Col className='buttonModalFooterAccount'>                    
                        <Button 
                            className='buttonCardAccount'
                            variant='outline-primary'
                            onClick={basket}
                        >
                            Basket
                        </Button>
                        <Button
                            className='buttonCardAccount'
                            variant='outline-danger'
                            onClick={logOut}
                        >
                            Logout
                        </Button>
                    </Col>
                </ModalFooter>

                <UpdateUser show={userUpdateVisible} onHide={() => setUserUpdateVisible(false)}/>
                <UpdatePassword show={updatePasswordVisible} onHide={() => setUpdatePasswordVisible(false)}/>
                <UpdatePhoto show={updatePhotoVisible} onHide={() => setUpdatePhotoVisible(false)}/>
                <ConfirmRemoval show={removeVisible} onHide={() => setRemoveVisible(false)}/>   
            </Col>
        </Row>
    );
});

export default PersonalAccountPage;