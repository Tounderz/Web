import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Col, ListGroup,  Row } from 'react-bootstrap';
import PageBar from '../components/PageBar';
import ProductItem from '../components/ProductItem';
import TypeItem from '../components/TypeItem';
import { fetchProductsBrandByCategory } from '../http/brandApi';
import { Context } from '../index';

const CategoriesByBrandPage = observer(() => {
    const {product} = useContext(Context);
    const {category} = useContext(Context);
    const {brand} = useContext(Context);
    const {type} = useContext(Context);
    const {page} = useContext(Context);

    const paginationClick = async () => {
        const data = await fetchProductsBrandByCategory(brand.selectedBrand.id, category.categoriesByBrand, page.currentPage);
            product.setProducts(data.products);
            page.setCountPages(data.countPages);
    }

    return (
        <Row className='categoryFonPage'>
            <Col md={2} className='colCategoriesByBrand'>
                <ListGroup className='listGroupCategory'>
                    <ListGroup.Item 
                        style={{ 
                            borderColor: 'white',
                            borderRadius: '5px',
                            background:'none',
                            color: 'white',
                        }}
                        disabled
                        key='id'
                    >
                        Types:
                    </ListGroup.Item>
                    {type.types.map(typeItem => 
                        <TypeItem key={typeItem.id} typeItem={typeItem}/>
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

export default CategoriesByBrandPage;