import React, { useContext, useState } from "react";
import { Button, Col, Nav, Row, Table } from "react-bootstrap";
import { useNavigate } from "react-router";
import UpdateUser from "../components/models/update/UpdateUser";
import SortForm from "../components/SortForm";
import { sortUsers } from "../http/sortApi";
import { fetchUsers } from "../http/userApi";
import { Context } from "../index";
import { ADMIN_NAME, ADMIN_ROUTE, FIELD_NAMES_USERS, PAGE_FIRST, ROLE_ARRAY } from "../utils/const";
import '../css/Table.css'
import ConfirmRemoval from "../components/models/remove/ConfirmRemoval";
import PageBar from "../components/PageBar";
import { observer } from "mobx-react-lite";
import SearchFormProductAndUserList from "../components/SearchFormProductAndUserList";
import { fetchSearchUsers } from "../http/searchApi";

const UsersListPage = observer(() => {
    const { user } = useContext(Context);
    const { sort } = useContext(Context);
    const { remove } = useContext(Context);
    const { page } = useContext(Context);
    const { search } = useContext(Context);
    const { messages } = useContext(Context);
    const { updates } = useContext(Context);
    const navigate = useNavigate();
    const [userUpdateVisible, setUserUpdateVisible] = useState(false);
    const [sortVisible, setSortVisible] = useState(false);
    const [removeVisible, setRemoveVisible] = useState(false);
    const roleArray = [];

    const paginationClick = async () => {
        if (sort.typeSort !== '' || sort.fieldName !== '') {
            const data = await sortUsers(sort.fieldName, sort.typeSort, page.currentPage);
                user.setUsersList(data.usersList);
        } else if (search.searchBy !== '' || search.selectedSearchParameter !== '') {
            const data = await fetchSearchUsers(search.selectedSearchParameter, page.currentPage, search.searchBy);
                user.setUsersList(data.usersList);
        } else {
            const data = await fetchUsers(page.currentPage);
                user.setUsersList(data.usersList);
        }
    };

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

    const sortClick = () => {
        sort.setFieldNames(FIELD_NAMES_USERS);
            setSortVisible(true);
    }

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

    const clickAdmin = () => {
        cleanSearchAndSort();
        navigate(ADMIN_ROUTE);
    }

    return (
        <Row className='tableFonPage'>
            <Col 
                md={11}
                className='containerTable'
            >
                <Row>
                    <div 
                        className='error-message'
                    >
                        {messages.messageError}
                    </div>
                    <Col md={8}>
                        <SearchFormProductAndUserList 
                            key='id'
                            parameter='user'
                        />
                    </Col>
                    <Col md={2}>
                        <Button 
                            className='buttonSortTable'
                            variant='outline-primary'
                            onClick={sortClick}
                        >
                            Sort
                        </Button>
                    </Col>
                    <Col md={2}>
                        <Button
                            variant='outline-success'
                            className=''
                            onClick={allUsers}
                        >
                            All Users
                        </Button>
                    </Col>
                </Row>
                <Table
                    className='tableTable'
                    size='sm'
                >
                    <thead>
                        <tr key="id">
                            <th scope='col'>Id</th>
                            <th scope='col'>Name</th>
                            <th scope='col'>Surname</th>
                            <th scope='col'>Email</th>
                            <th scope='col'>Phone</th>
                            <th scope='col'>Login</th>
                            <th scope='col'>Role</th>
                            <th scope='col'>Buttons</th>
                        </tr>
                    </thead>
                    <tbody>
                        {user.usersList.map((item) => (
                            <tr key={item.id}>
                                <th scope="row">{item.id}</th>
                                    <td>{item.name}</td>
                                    <td>{item.surname}</td>
                                    <td>{item.email}</td>
                                    <td>{item.phone}</td>
                                    <td>{item.login}</td>
                                    <td>{item.role}</td>
                                    <td className='buttonsTable'>
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
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Row onClick={() => paginationClick()}>
                        <PageBar/>
                    </Row>
                    <Nav.Link onClick={clickAdmin} >Admin panel</Nav.Link>

                    <UpdateUser
                        show={userUpdateVisible}
                        onHide={() => setUserUpdateVisible(false)}
                    />
                    <SortForm
                        show={sortVisible}
                        onHide={() => setSortVisible(false)}
                        parameter='user'
                    />
            </Col>    
            <ConfirmRemoval show={removeVisible} onHide={() => setRemoveVisible(false)}/>   
        </Row>
    );
});

export default UsersListPage;
