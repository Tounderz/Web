export const ADMIN_ROUTE = '/admin';
export const LOGIN_ROUTE = '/login';
export const REGISTER_ROUTE = '/register';
export const SHOP_ROUTE = '/';
export const BASKET_ROUTE = '/baskets';
export const PRODUCT_ROUTE = '/products';
export const PERSONAL_ACCOUNT_ROUTE = '/account';
export const CATEGORY_ROUTE = '/categories';
export const TYPE_ROUTE = '/types';
export const BRAND_ROUTE = '/brands';
export const ORDER_ROUTE = '/orders';
export const COMPLETED_ROUTE = '/completed';
export const USERLIST_ROUTE = '/userList';
export const PRODUCTS_LIST_ROUTE = '/productList';
export const BRAND_INFO_ROUTE = '/infoBrand';
export const CATEGORY_INFO_ROUTE = '/infoCategory';
export const BRANDS_BY_CATEGORY_ROUTE = '/brandsByCategory';
export const CATEGORIES_BY_BRAND_ROUTE = '/categoriesByBrand';
export const SEARCH_ROUTE = '/search';
export const PURCHASES_STORY_ROUTE = '/purchasesStory';
export const ERROR_ROUTE = '/error';
export const NO_IMAGE = 'https://localhost:44315/img/noimage.jpg';
export const LOCALHOST = 'https://localhost:44315';
export const PAGE_FIRST = 1;
export const ZERO = 0;
export const TRUE_AND_FALSE = ['True', 'False']
export const ROLE_ARRAY = ['admin', 'moderator', 'user']
export const FIELD_NAMES_USERS = [ 'Id', 'Name', 'Surname', 'Email', 'Phone', 'Login', 'Role' ];
export const FIELD_NAMES_PRODUCTS = [ 'Id', 'Name', 'Category', 'Brand', 'Type', 'Price', 'Available', 'CountView' ];
export const TYPES_SORT = [ 'Up', 'Down' ];
export const IS_NUMBER = /^(0|-?[1-9]\d{0,5})$/

export const CONFIG_MULTIPART = {
    headers: {
        'Content-Type': 'multipart/form-data'
    }
};

export const FORM_DATA_VIEW = (id, role, page) => {
    const formData = new FormData();
    formData.append('ModelId', id);
    formData.append('Role', role);
    formData.append('Page', page);
    return formData;
}

export const FORM_DATA_IDS = (ids) => {
    const formData = new FormData();
    formData.append('Ids', ids);
    return formData;
}

export const PICTURE = (img) => {
    if (img=== null) {
        return (NO_IMAGE);
    } else {
        return (LOCALHOST + img);
    }
}