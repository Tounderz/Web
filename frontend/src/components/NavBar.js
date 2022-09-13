import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Context } from "../index";
import { SHOP_ROUTE } from "../utils/const";
import BrandDropdown from "./BrandDropdown";
import CategoryDropdown from "./CategoryDropdown";
import UserBar from "./UserBar";
import SearchForm from "./SearchForm";
import '../css/NavBar.css'

const NavBar = observer(() => {
    const {category} = useContext(Context);
    const {brand} = useContext(Context);
    const {sort} = useContext(Context);

    const onClick = () => {
        category.setSelectedCategory({});
        brand.setSelectedBrand({});
        sort.setFieldNames([]);
        sort.setFieldName('');
        sort.setTypeSort('');
    }

    return (
        <nav className='navbar'> 
            <div className='container-fluid'>          
                <Link 
                    className='link-home navbar-brand'
                    to={SHOP_ROUTE}
                    onClick={onClick}
                >
                    Home
                </Link>

                <NavDropdown
                    className='navDropdown'
                    title='Categories'
                    id='collasible-nav-dropdown'
                >
                    <div className='scroll-nav'>
                        {category.categories.map((categoryItem) => (
                            <CategoryDropdown key={categoryItem.id} categoryItem={categoryItem}/>
                        ))}
                    </div>
                </NavDropdown>

                <NavDropdown
                    className='navDropdown'
                    title='Brands'
                    id='collasible-nav-dropdown'
                >
                    <div className='scroll-nav'>
                        {brand.brands.map((brandItem) => (
                            <BrandDropdown key={brandItem.id} brandItem={brandItem}/>
                        ))}
                    </div>
                </NavDropdown>
                

                <nav 
                    className='d-inline-flex mt-2 mt-md-0 ms-md-auto'
                >
                    <SearchForm key='id'/>
                    <UserBar/>
                </nav> 
            </div> 
        </nav>
    );
});

export default NavBar;