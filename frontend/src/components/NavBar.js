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
import { SvgSelector } from "./Svg/SvgSelector";
import '../css/NavBar.css'

const NavBar = observer(() => {
    const {product} = useContext(Context);
    const {general} = useContext(Context)

    const onClick = () => {
        product.setSelectedCategory({});
        product.setSelectedBrand({});
        general.setFieldNames([]);
        general.setFieldName('');
        general.setTypeSort('');
    }

    return (
        <nav className='navbar navbar-expand-sm navbar-dark bg-dark'> 
            <div className='container-fluid'>          
                <Link 
                    className='link'
                    to={SHOP_ROUTE}
                    onClick={onClick}
                >
                    <SvgSelector id='homePage'/>
                </Link>
                <NavDropdown
                    title='Categories'
                    id='collasible-nav-dropdown'
                >
                    {product.categories.map(category => (
                        <CategoryDropdown key={category.id} category={category}/>
                    ))}
                </NavDropdown>

                <NavDropdown
                    title='Brands'
                    id='collasible-nav-dropdown'
                >
                    {product.brands.map(brand => (
                        <BrandDropdown key={brand.id} brand={brand}/>
                    ))}
                </NavDropdown>
                

                <nav 
                    className="d-inline-flex mt-2 mt-md-0 ms-md-auto"
                >
                    <SearchForm key='id' parameter='product'/>
                    <UserBar/>
                </nav> 
            </div> 
        </nav>
    );
});

export default NavBar;