import React, { useContext, useState } from "react";
import { Button, Col, Nav, Row, Table } from "react-bootstrap";
import { useNavigate } from "react-router";
import SortForm from "../components/SortForm";
import { sortUsers } from "../http/sortApi";
import { fetchUsers } from "../http/userApi";
import { Context } from "../index";
import { ADMIN_ROUTE, FIELD_NAMES_USERS, PAGE_FIRST } from "../utils/const";
import '../css/Table.css'
import PageBar from "../components/PageBar";
import { observer } from "mobx-react-lite";
import SearchFormProductAndUserList from "../components/SearchFormProductAndUserList";
import { fetchSearchUsers } from "../http/searchApi";
import UserListItem from "../components/UserListItem";

const UsersListPage = observer(() => {
    const { user } = useContext(Context);
    const { sort } = useContext(Context);
    const { page } = useContext(Context);
    const { search } = useContext(Context);
    const { messages } = useContext(Context);
    const navigate = useNavigate();
    const [sortVisible, setSortVisible] = useState(false);
    
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
                <Row className="rowSpecificationsProduct">
                <Table
                    key='id'
                    className='tableTable'
                    size='sm'
                >
                    <thead>
                        <tr key="id">
                            <th scope='col'>Id</th>
                            <th scope='col'>Name</th>
                            <th scope='col'>Surname</th>
                            <th scope='col'>Gender</th>
                            <th scope='col'>Date of Birth</th>
                            <th scope='col'>Email</th>
                            <th scope='col'>Phone</th>
                            <th scope='col'>Login</th>
                            <th scope='col'>Role</th>
                            <th scope='col'>Confirm Email</th>
                            <th scope='col'>isDeleted</th>
                            <th scope='col'>Buttons</th>
                        </tr>
                    </thead>
                    <tbody>
                        {user.usersList.map((item) => (
                            <UserListItem key={item.id} item={item}/>
                            ))}
                        </tbody>
                    </Table>
                    </Row>
                    <Row onClick={() => paginationClick()}>
                        <PageBar/>
                    </Row>
                    <Nav.Link onClick={clickAdmin} >Admin panel</Nav.Link>

                    <SortForm
                        show={sortVisible}
                        onHide={() => setSortVisible(false)}
                        parameter='user'
                    />
            </Col>    
        </Row>
    );
});

export default UsersListPage;
