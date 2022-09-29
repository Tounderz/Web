import { observer } from 'mobx-react-lite';
import React from 'react';
import { useContext } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { cleanToCart, removeToCartItem } from '../../../http/basketApi';
import { removeProduct } from '../../../http/productApi';
import { logout, removeUser } from '../../../http/userApi';
import { Context } from '../../../index';
import { PAGE_FIRST, PRODUCTS_LIST_ROUTE, SHOP_ROUTE, USERLIST_ROUTE } from '../../../utils/const';

const ConfirmRemoval = observer(({show, onHide}) => {
    const {product} = useContext(Context);
    const {user} = useContext(Context);
    const {remove} = useContext(Context);
    const {cart} = useContext(Context);
    const {page} = useContext(Context);
    const navigate = useNavigate();

    const click = async () => {
        let data;
        switch(remove.removeParameterName) {
            case 'product':
                data = await removeProduct(remove.removeObjeck.id);
                    product.setProducts(data.products);
                    page.setCountPages(data.countPages);
                    close();
                    navigate(PRODUCTS_LIST_ROUTE);
                    break;
            case 'user':
                data = await removeUser(remove.removeObjeck.id);
                    user.setUsersList(data.usersList);
                    page.setCountPages(data.countPages);
                    close();
                    navigate(USERLIST_ROUTE);
                break;
            case 'userCabinet':
                data = await removeUser(remove.removeObjeck.id);
                    close();
                    logOut();
                break;
            case 'basketItem':
                data = await removeToCartItem(remove.removeObjeck.id, user.user.login, PAGE_FIRST);
                    cart.setBaskets(data.baskets);
                    cart.setTotalAmount(data.sum);
                    page.setCountPages(data.countPages);
                    close();
                break;
            case 'cleanCart':
                data = await cleanToCart(user.user.login, PAGE_FIRST);
                    cart.setBaskets(data.baskets);
                    cart.setTotalAmount(data.sum);
                    page.setCountPages(data.countPages);
                    close();
                break;
            default:
                break;
        }
    }

    const logOut = async () => {
        const data = await logout();
            user.setUser(data.user)
            localStorage.removeItem('accessToken');
        navigate(SHOP_ROUTE)
    }

    let string;
    switch (remove.removeParameterName) {
        case 'product':
            string = `Are you sure you want to remove product: '${remove.removeObjeck.name}'?`
            break;
        case 'user':
            string = `Are you sure you want to remove user: '${remove.removeObjeck.name}'?`
            break;
        case 'userCabinet':
            string = `Are you sure you want to remove user: '${remove.removeObjeck.name}'?`
            break;
        case 'basketItem':
            string = `Are you sure you want to remove product: '${remove.removeObjeck.name}'?`
            break;
        case 'cleanCart':
            string = `Are you sure you want to empty the recycle bin?`
            break;
        default:
            break;
    }

    const close = () => {
        remove.setRemoveObjeck({});
        remove.setRemoveParameterName('');
        onHide();
    }

    return (
        <Modal
            show={show}
            onHide={close}
            size='lg'
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title 
                    id='contained-modal-title-vcenter'
                >
                    {string}
                </Modal.Title>
            </Modal.Header>
            <Modal.Footer>
                <Button
                    className='button-brand-confirm-removal'
                    variant='outline-primary'
                    onClick={click}
                >
                    Yes
                </Button>
                <Button 
                    className='button-brand-confirm-removal'
                    variant='outline-danger'
                    onClick={close}
                >
                    No
                </Button>
            </Modal.Footer>
        </Modal>
    );
});

export default ConfirmRemoval;