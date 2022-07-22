import React, { useContext, useState } from 'react';
import { Container, Nav, Pagination, Row, Table } from "react-bootstrap";
import { Context } from '../index';
import { fetchProduct, fetchProducts, removeProduct } from '../http/productApi';
import SearchForm from '../components/SearchForm';
import { ADMIN_ROUTE, PAGE_FIRST } from "../utils/const";
import UpdateProduct from '../components/models/update/UpdateProduct';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router';

const ProductsListPage = observer(() => {
    const {product} = useContext(Context);
    const [productUpdateVisible, setProductUpdateVisible] = useState(false);
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
        const data = await fetchProducts(item);
            product.setProducts(data.products);
            setPage(item);
    };


    if (product.countPages > 1) {
        for (let index = 0; index < product.countPages; index++) {
            pages.push(index + 1);
        }
    }
    

    return (
        <Container className="table-responsive mt-5">
            <SearchForm key='id' parameter='productAdmin'/>
            <Table
                className='table table-bordered border-dark'
                style={{
                    marginTop: '15px'
                }}
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
                            <td>
                                <button
                                    className="btn-primary m-2"
                                    variant={"outline-success"}
                                    style={{
                                        cursor: "pointer",
                                        borderRadius: "5px",
                                    }}
                                    onClick={() => productUpdate(prod.id)}
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
                                    onClick={() => productRemove(prod.id)}
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
            <UpdateProduct show={productUpdateVisible} onHide={() => setProductUpdateVisible(false)}/>
        </Container>
    );
});

export default ProductsListPage;