import React, { useContext, useState } from 'react';
import { Button, Col, Nav, Row, Table } from "react-bootstrap";
import { Context } from '../index';
import { fetchProduct, fetchProducts } from '../http/productApi';
import { ADMIN_ROUTE, FIELD_NAMES_PRODUCTS } from "../utils/const";
import UpdateProduct from '../components/models/update/UpdateProduct';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router';
import SortForm from '../components/SortForm';
import { sortProducts } from '../http/sortApi';
import '../css/Table.css'
import ConfirmRemoval from '../components/models/remove/ConfirmRemoval';
import PageBar from '../components/PageBar';
import SearchFormProductAndUserList from '../components/SearchFormProductAndUserList';
import { fetchSearchProductAdmin } from '../http/searchApi';

const ProductsListPage = observer(() => {
    const {product} = useContext(Context);
    const {sort} = useContext(Context);
    const {remove} = useContext(Context);
    const {error} = useContext(Context);
    const {page} = useContext(Context);
    const {search} = useContext(Context);
    const [productUpdateVisible, setProductUpdateVisible] = useState(false);
    const [sortVisible, setSortVisible] = useState(false);
    const [removeVisible, setRemoveVisible] = useState(false);
    const navigate = useNavigate();

    const productUpdate = async (id) => {
        const data = await fetchProduct(id);
            product.setSelectedProduct(data.product);
            setProductUpdateVisible(true);
    }

    const productRemove = async (prod) => {
        setRemoveVisible(true);
        remove.setRemoveObjeck(prod);
        remove.setRemoveParameterName('product');
    }

    const paginationClick = async () => {
        if (sort.typeSort !== '' || sort.fieldName !=='') {
            const data = await sortProducts(sort.fieldName, sort.typeSort, page.currentPage);
                product.setProducts(data.products);
        } else if (search.searchBy !== '' || search.selectedSearchParameter !== '') {
            const data = await fetchSearchProductAdmin(search.selectedSearchParameter, page.currentPage, search.searchBy);
                product.setProducts(data.products);
        } else {
            const data = await fetchProducts(page.currentPage);
                product.setProducts(data.products);
        }
    };

    const sortClick = () => {
        sort.setFieldNames(FIELD_NAMES_PRODUCTS);
            setSortVisible(true);
    }

    const clickAdmin = () => {
        sort.setFieldNames([]);
        sort.setFieldName('');
        sort.setTypeSort('');
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
                        {error.messageError}
                    </div>
                    <Col md={9}>
                        <SearchFormProductAndUserList 
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
                        {product.products?.map((prod) => (
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
                                        onClick={() => productRemove(prod)}
                                    >
                                        Remove
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <Row onClick={paginationClick}>
                    <PageBar/>
                </Row>
                <Nav.Link onClick={clickAdmin}>Admin panel</Nav.Link>
                
                <UpdateProduct show={productUpdateVisible} onHide={() => setProductUpdateVisible(false)}/>
                <SortForm show={sortVisible} onHide={() => setSortVisible(false)} parameter='product'/>
                <ConfirmRemoval show={removeVisible} onHide={() => setRemoveVisible(false)}/>
            </Col>
        </Row>
    );
});

export default ProductsListPage;