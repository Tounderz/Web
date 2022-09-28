import React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { fetchUsers } from '../http/userApi';
import { Context } from '../index';
import { ADMIN_NAME, PAGE_FIRST, ROLE_ARRAY } from '../utils/const';
import ConfirmRemoval from './models/remove/ConfirmRemoval';
import UpdateUser from './models/update/UpdateUser';

const UserListItem = ({item}) => {
    const { remove } = useContext(Context);
    const { updates } = useContext(Context);
    const { user } = useContext(Context);
    const { page } = useContext(Context);
    const { search } = useContext(Context);
    const { sort } = useContext(Context);
    const [userUpdateVisible, setUserUpdateVisible] = useState(false);
    const [removeVisible, setRemoveVisible] = useState(false);
    const roleArray = [];

    for (let index = 0; index < ROLE_ARRAY.length; index++) {
        if (user.user.role === "admin" && ROLE_ARRAY[index] !== "admin") {
            roleArray.push(ROLE_ARRAY[index]);
        } else if (
            user.user.role === "moderator" &&
            ROLE_ARRAY[index] !== "admin" &&
            ROLE_ARRAY[index] !== "moderator"
        ) {
            roleArray.push(ROLE_ARRAY[index]);
        }
    }

    const userRemove = async (item) => {
        setRemoveVisible(true);
        remove.setRemoveObjeck(item);
        remove.setRemoveParameterName('user');
    };

    const userUpdate = async (item) => {
        updates.setUpdateParameter(ADMIN_NAME);
        user.setSelectedUser(item);
            setUserUpdateVisible(true);
        allUsers();
    };

    const allUsers = async () => {
        page.setCurrentPage(PAGE_FIRST);
        cleanSearchAndSort();
        const data = await fetchUsers(page.currentPage);
            user.setUsersList(data.usersList);
            page.setCountPages(data.countPages);
    }

    const cleanSearchAndSort = () => {
        sort.setFieldNames([]);
        sort.setFieldName('');
        sort.setTypeSort('');
        search.setSearchBy('');
        search.setSelectedSearchParameter('');
    }


    return (
        <tr key={item.id}>
            <td style={ { width: '50px' } }>{item.id}</td>
            <td style={ { width: '50px' } }>{item.name}</td>
            <td style={ { width: '100px' } }>{item.surname}</td>
            <td style={ { width: '50px' } }>{item.gender}</td>
            <td style={ { width: '120px' } }>{item.dateOfBirth}</td>
            <td style={ { width: '100px' } }>{item.email}</td>
            <td style={ { width: '100px' } }>{item.phone}</td>
            <td style={ { width: '70px' } }>{item.login}</td>
            <td style={ { width: '70px' } }>{item.role}</td>
            <td style={ { width: '110px' } }>{item.confirmEmail.toString()}</td>
            <td style={ { width: '50px' } }>{item.isDeleted.toString()}</td>
            <td style={ { width: '200px' } } className='buttonsTable'>
                <Button
                    className='buttonTable'
                    variant='outline-primary'
                    disabled={!roleArray.some((i) => i === item.role)}
                    onClick={() => userUpdate(item)}
                >
                    Update
                </Button>
                /
                <Button
                    className='buttonTable'
                    variant='outline-danger'
                    disabled={!roleArray.some((i) => i === item.role)}
                    onClick={() => userRemove(item)}
                >
                    Remove
                </Button>                         
            </td>

            <UpdateUser
                show={userUpdateVisible}
                onHide={() => setUserUpdateVisible(false)}
            />     
            <ConfirmRemoval show={removeVisible} onHide={() => setRemoveVisible(false)}/>       
        </tr>
    );
};

export default UserListItem;