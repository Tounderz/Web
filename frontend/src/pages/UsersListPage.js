import React, { useContext, useState } from "react";
import { Button, Col, Nav, Pagination, Row, Table } from "react-bootstrap";
import { useNavigate } from "react-router";
import UpdateUser from "../components/models/update/UpdateUser";
import SearchForm from "../components/SearchForm";
import SortForm from "../components/SortForm";
import { sortUsers } from "../http/sortApi";
import { removeUser, fetchUsers } from "../http/userApi";
import { Context } from "../index";
import { ADMIN_ROUTE, FIELD_NAMES_USERS, PAGE_FIRST, ROLE_ARRAY } from "../utils/const";
import '../css/Table.css'

const UsersListPage = () => {
    const { user } = useContext(Context);
    const { general } = useContext(Context);
    const navigate = useNavigate();
    const [userUpdateVisible, setUserUpdateVisible] = useState(false);
    const [sortVisible, setSortVisible] = useState(false);
    const roleArray = [];
    const pages = [];
    const [page, setPage] = useState(PAGE_FIRST);

    const paginationClick = async (item) => {
        if (general.typeSort !== '' || general.fieldName !== '') {
            const data = await sortUsers(general.fieldName, general.typeSort, item);
                user.setUsersList(data.usersList);
                setPage(item);
        } else {
            const data = await fetchUsers(item);
                user.setUsersList(data.usersList);
                setPage(item);
        }
    };

    if (user.countPages > 1) {
        for (let index = 0; index < user.countPages; index++) {
            pages.push(index + 1);
        }
    }

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

    const userRemove = async (id) => {
        const data = await removeUser(id);
            user.setUsersList(data.usersList);
            user.setCountPages(data.countPages);
    };

    const userUpdate = async (item) => {
        user.setSelectedUser(item);
            setUserUpdateVisible(true);
    };

    const sortClick = () => {
        general.setFieldNames(FIELD_NAMES_USERS);
            setSortVisible(true);
    }

    const clickAdmin = () => {
        general.setFieldNames([]);
        general.setFieldName('');
        general.setTypeSort('');
        navigate(ADMIN_ROUTE);
    }

    return (
        <Row className='tableFonPage'>
            <Col 
                md={11}
                className='containerTable'
            >
                <Row>
                    <Col md={9}>
                        <SearchForm 
                            key='id'
                            parameter='user'
                        />
                    </Col>
                    <Col md={3}>
                        <Button 
                            className='buttonSortTable'
                            variant='outline-primary'
                            onClick={sortClick}
                        >
                            Sort
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
                                            onClick={() => userRemove(item.id)}
                                        >
                                            Remove
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Row>
                        <Pagination
                            className='pagination'
                            size="sm"
                        >
                            {pages.map((item) => (
                                <Pagination.Item
                                    key={item}
                                    active={item === page}
                                    onClick={() => paginationClick(item)}
                                >
                                    {item}
                                </Pagination.Item>
                            ))}
                        </Pagination>
                        <Nav.Link onClick={clickAdmin}>Admin panel</Nav.Link>
                    </Row>
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
        </Row>
    );
};

export default UsersListPage;
