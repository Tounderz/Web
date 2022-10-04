import { observer } from 'mobx-react-lite';
import React, { useContext, useState } from 'react';
import { Button, Col } from 'react-bootstrap';
import { removeInfoProduct } from '../http/infoProductApi';
import { Context } from '../index';
import UpdateInfoProduct from './models/update/UpdateInfoProduct';

const ProductInfoItem = observer(({id, info}) => {
    const {user} = useContext(Context);
    const [updateInfoVisible, setUpdateInfoVisible] = useState(false);

    let admin;

    if (user.user.role !== 'user' && user.user.isAuth) {
        admin = (
            <Col style={{ textAlign: 'right' }}>
                <Button
                    variant='outline-primary'
                    onClick={() => {setUpdateInfoVisible(true)}}
                    style={{
                        cursor: 'pointer',
                        borderRadius: '5px',
                        marginRight: '5px'
                    }}
                >
                    Update
                </Button>
                /
                <Button
                    variant='outline-danger'
                    onClick={async () => await removeInfoProduct(info.id)}
                    style={{
                        cursor: 'pointer',
                        borderRadius: '5px',
                        marginLeft: '5px'
                    }}
                >
                    Remove
                </Button>
                <UpdateInfoProduct info={info} show={updateInfoVisible} onHide={() => setUpdateInfoVisible(false)}/>
            </Col>
        )
    }

    return (
        <tr key='id' className="mb-3">
            <td style={ { width: '50px' } }> 
                {id} :
            </td>
            <td style={ { width: '300px' } }>
                {info.title}
            </td>
            <td style={ { width: '500px' } }>
                {info.description}
            </td>
            <td style={ { width: '200px' } }>
                {admin}
            </td>         
        </tr>
    );
});

export default ProductInfoItem;