export const ADMIN_ROUTE = '/admin';
export const LOGIN_ROUTE = `/login`;
export const REGISTER_ROUTE = '/register';
export const VERIFY_EMAIL_ROUTE = `/verifyEmail`;
export const RETRIEVE_PASSWORD_ROUTE = '/retrievePassword'
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
export const RESTORE_ROUTE = `/restore`
export const NO_IMAGE = 'https://localhost:44315/img/noimage.jpg';
export const LOCALHOST = 'https://localhost:44315';
export const PAGE_FIRST = 1;
export const ZERO = 0;
export const ADMIN_NAME = 'Admin';
export const CABINET_NAME = 'Cabinet';
export const TRUE_AND_FALSE = ['True', 'False']
export const ROLE_ARRAY = ['admin', 'moderator', 'user']
export const FIELD_NAMES_USERS = [ 'Id', 'Name', 'Surname', 'Gender', 'DateOfBirth', 'Email', 'Phone', 'Login', 'Role', 'IsDeleted', 'ConfirmEmail' ];
export const FIELD_NAMES_USERS_SEARCH = [ 'Id', 'Name', 'Surname', 'Email', 'Phone', 'Login', 'Role' ];
export const FIELD_NAMES_PRODUCTS = [ 'Id', 'Name', 'Category', 'Brand', 'Type', 'Price', 'Available', 'CountView' ];
export const TYPES_SORT = [ 'Up', 'Down' ];
export const IS_NUMBER = /^(0|-?[1-9]\d{0,5})$/;
export const IS_EMAIL = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const IS_PHONE = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;
export const GENDERS = ['Man', 'Woman'];
export const ERROR_MESSAGE_SEARCH = 'According to the search criteria, nothing was found.';

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

export const PICTURE = (img) => {
    if (img=== null) {
        return (NO_IMAGE);
    } else {
        return (LOCALHOST + img);
    }
}