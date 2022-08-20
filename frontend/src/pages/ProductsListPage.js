import React, { useContext, useState } from 'react';
import { Button, Col, Nav, Pagination, Row, Table } from "react-bootstrap";
import { Context } from '../index';
import { fetchProduct, fetchProducts, removeProduct } from '../http/productApi';
import SearchForm from '../components/SearchForm';
import { ADMIN_ROUTE, FIELD_NAMES_PRODUCTS, PAGE_FIRST } from "../utils/const";
import UpdateProduct from '../components/models/update/UpdateProduct';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router';
import SortForm from '../components/SortForm';
import { sortProducts } from '../http/sortApi';
import '../css/Table.css'

const ProductsListPage = observer(() => {
    const {product} = useContext(Context);
    const {general} = useContext(Context);
    const [productUpdateVisible, setProductUpdateVisible] = useState(false);
    const [sortVisible, setSortVisible] = useState(false);
    const navigate = useNavigate();
    const pages = [];
    const [page, setPage] = useState(PAGE_FIRST);

    const productUpdate = async (id) => {
        const data = await fetchProduct(id);
            product.setSelectedProduct(data.product);
            setProductUpdateVisible(true);
    }

    const productRemove = async (id) => {
        const data = await removeProduct(id);
            product.setProducts(data.products);
            product.setTotalCount(data.countPages);
    }

    const paginationClick = async (item) => {
        if (general.typeSort !== '' || general.fieldName !== '') {
            const data = await sortProducts(general.fieldName, general.typeSort, item);
                product.setProducts(data.products);
                setPage(item);
        } else {
            const data = await fetchProducts(item);
                product.setProducts(data.products);
                setPage(item);
        }
    };


    if (product.countPages > 1) {
        for (let index = 0; index < product.countPages; index++) {
            pages.push(index + 1);
        }
    }

    const sortClick = () => {
        general.setFieldNames(FIELD_NAMES_PRODUCTS);
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
                        parameter='productAdmin'
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
                        <th scope="col">Id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Category</th>
                        <th scope="col">Brand</th>
                        <th scope="col">Type</th>
                        <th scope="col">Short Description</th>
                        <th scope="col">Price</th>
                        <th scope="col">Available</th>
                        <th scope="col">Count View</th>
                        <th scope="col">Buttons</th>
                    </tr>
                </thead>
                <tbody>
                     {product.products.map((prod) => (
                        <tr key = {prod.id}>
                            <th scope="col">{prod.id}</th>
                            <th scope="col">{prod.name}</th>
                            <th scope="col">{prod.categoryName}</th>
                            <th scope="col">{prod.brandName}</th>
                            <th scope="col">{prod.typeName}</th>
                            <th scope="col">{prod.shortDescription}</th>
                            <th scope="col">{prod.price}</th>
                            <th scope="col">{prod.available}</th>
                            <th scope="col">{prod.countView}</th>
                            <td className='buttonsTable'>
                                <Button
                                    className='buttonTable'
                                    variant='outline-primary'
                                    onClick={() => productUpdate(prod.id)}
                                >
                                    Update
                                </Button>
                                /
                                <Button
                                    className='buttonTable'
                                    variant='outline-danger'
                                    onClick={() => productRemove(prod.id)}
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
            <UpdateProduct show={productUpdateVisible} onHide={() => setProductUpdateVisible(false)}/>
            <SortForm show={sortVisible} onHide={() => setSortVisible(false)} parameter='product'/>
        </Col>
        </Row>
    );
});

export default ProductsListPage;