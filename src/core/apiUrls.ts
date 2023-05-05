
const usersApiUrl = process.env.REACT_APP_USERS_API_URL;
const productsApiUrl = process.env.REACT_APP_PRODUCTS_API_URL;
const imagesApiUrl = process.env.REACT_APP_IMAGES_API_URL;
const categoriesApiUrl = process.env.REACT_APP_CATEGORIES_API_URL


const API_URLS = {
    // Products API
    GET_PRODUCTS: productsApiUrl + '/api/products',
    CREATE_PRODUCT: productsApiUrl +'/api/products',
    UPDATE_PRODUCT: productsApiUrl +'/api/products',
    DELETE_PRODUCTS: productsApiUrl +'/api/products',

    // Users API

    USER_AUTHORIZATION: usersApiUrl + '/api/authorization',
    USER_NICKNAME_IS_FREE: usersApiUrl + '/api/nickname/is-free',

    CURRENT_USER_SHORT_INFORMATION: usersApiUrl + '/api/current-user/short-information',
    CURRENT_USER_FULL_INFORMATION: usersApiUrl + '/api/current-user/full-information',

    USER_REGISTRATION: usersApiUrl + '/api/registration',

    NICKNAME_IS_FREE: usersApiUrl + '/api/nickname/is-free',

    // Images API

    UPLOAD_IMAGE: imagesApiUrl + '/api/images',

    // Categories API
    GET_CATEGORIES: categoriesApiUrl + '/api/categories',
    
    REACT_APP_USERS_API_URL: usersApiUrl,
    REACT_APP_PRODUCTS_API_URL: productsApiUrl,
    REACT_APP_IMAGES_API_URL: imagesApiUrl,
    REACT_APP_CATEGORIES_API_URL: categoriesApiUrl
}

export default API_URLS;
