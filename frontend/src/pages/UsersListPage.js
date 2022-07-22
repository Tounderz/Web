import React, { useContext, useState } from "react";
import { Container, Nav, Pagination, Row, Table } from "react-bootstrap";
import { useNavigate } from "react-router";
import UpdateUser from "../components/models/update/UpdateUser";
import SearchForm from "../components/SearchForm";
import { removeUser, fetchUsers } from "../http/userApi";
import { Context } from "../index";
import { ADMIN_ROUTE, PAGE_FIRST, ROLE_ARRAY } from "../utils/const";

const UsersListPage = () => {
    const { user } = useContext(Context);
    const navigate = useNavigate();
    const [userUpdateVisible, setUserUpdateVisible] = useState(false);
    const roleArray = [];
    const pages = [];
    const [page, setPage] = useState(PAGE_FIRST);

    const paginationClick = async (item) => {
        const data = await fetchUsers(item);
            user.setUsersList(data.usersList);
            setPage(item);
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

    return (
        <Container className="table-responsive mt-5">
            <SearchForm key='id' parameter='user'/>
            <Table
                className='table table-bordered border-dark'
                style={{
                    marginTop: '15px'
                }}
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
                                <td>
                                    <button
                                        className="btn-primary m-2"
                                        variant={"outline-success"}
                                        style={{
                                            cursor: "pointer",
                                            borderRadius: "5px",
                                        }}
                                        disabled={!roleArray.some((i) => i === item.role)}
                                        onClick={() => userUpdate(item)}
                                    >
                                        Update
                                    </button>
                                    <button
                                        className="btn-danger "
                                        variant={"outline-success"}
                                        style={{
                                            cursor: "pointer",
                                            borderRadius: "5px",
                                        }}
                                        disabled={!roleArray.some((i) => i === item.role)}
                                        onClick={() => userRemove(item.id)}
                                    >
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <Row>
                    <Pagination
                        className='d-flex justify-content-center align-items-center mt-3'
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
                    <Nav.Link onClick={() => navigate(ADMIN_ROUTE)}>Admin panel</Nav.Link>
                </Row>
                <UpdateUser
                    show={userUpdateVisible}
                    onHide={() => setUserUpdateVisible(false)}
                />
        </Container>
    );
};

export default UsersListPage;
