import React, { useContext } from 'react';
import { Col, ListGroup, Row } from 'react-bootstrap';
import { Context } from '../index';
import ProductItem from '../components/ProductItem';
import { fetchProductsCategoryByBrand } from '../http/categoryApi';
import TypeItem from '../components/TypeItem';
import '../css/BrandPage.css'
import PageBar from '../components/PageBar';
import { observer } from 'mobx-react-lite';

const BrandsByCategoryPage = observer(() => {
    const {product} = useContext(Context);
    const {category} = useContext(Context);
    const {brand} = useContext(Context);
    const {type} = useContext(Context);
    const {page} = useContext(Context);

    const paginationClick = async () => {
        const data = await fetchProductsCategoryByBrand(category.selectedCategory.id, brand.brandsByCategory, page.currentPage);
            product.setProducts(data.products);
            page.setCountPages(data.countPages);
    }

    return (
        <Row className='brandFonPage'>
            <Col md={2} className='colBrandsByCategory'>
                <ListGroup className='listGroupBrand'>
                    <ListGroup.Item 
                        key='id'
                        disabled
                        style={{ 
                            borderColor: 'white',
                            borderRadius: '5px',
                            background:'none',
                            color: 'white',
                        }}
                    >
                        Types:
                    </ListGroup.Item>
                    {type.types.map(typeItem => 
                        <TypeItem key={typeItem.id} typeItem={typeItem} brandsId={brand.brandsByCategory}/>
                    )}
                </ListGroup >
            </Col>
            <Col md={9}>
                <Row>
                    {product.products.map(item => (
                        <ProductItem key={item.id} prod={item}/>
                    ))}
                </Row>
            </Col>
            <Row onClick={() => paginationClick()}>
                <PageBar/>
            </Row>          
        </Row>
    );
});

export default BrandsByCategoryPage;