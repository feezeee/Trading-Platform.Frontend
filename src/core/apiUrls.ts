
const usersApiUrl = process.env.REACT_APP_USERS_API_URL;
const productsApiUrl = process.env.REACT_APP_PRODUCTS_API_URL;
const imagesApiUrl = process.env.REACT_APP_IMAGES_API_URL;
const categoriesApiUrl = process.env.REACT_APP_CATEGORIES_API_URL
const chatsApiUrl = process.env.REACT_APP_CHATS_API_URL


const API_URLS = {
    // Products API
    GET_PRODUCTS: productsApiUrl + '/api/products',
    CREATE_PRODUCT: productsApiUrl +'/api/products',
    UPDATE_PRODUCT: productsApiUrl +'/api/products',
    DELETE_PRODUCTS: productsApiUrl +'/api/products',

    // Users API

    USER_REFRESH_TOKENS: usersApiUrl + '/api/refresh-token',

    USER_AUTHORIZATION: usersApiUrl + '/api/authorization',
    USER_NICKNAME_IS_FREE: usersApiUrl + '/api/nickname/is-free',

    CURRENT_USER_SHORT_INFORMATION: usersApiUrl + '/api/current-user/short-information',
    CURRENT_USER_FULL_INFORMATION: usersApiUrl + '/api/current-user/full-information',

    USER_REGISTRATION: usersApiUrl + '/api/registration',

    USERS_SHORT_INFORMATION: usersApiUrl + '/api/users/short-information',
    USERS_FULL_INFORMATION: usersApiUrl + '/api/users/full-information',

    USER_UPDATE: usersApiUrl + '/api/users',

    DELETE_USER: usersApiUrl + '/api/users',

    GET_USERS_FULL_INFORMATION: usersApiUrl + '/api/users/full-information',

    CHANGE_USER_PASSWORD: usersApiUrl + '/api/current-user/change-password',

    // Roles
    GET_ROLES: usersApiUrl + '/api/roles',
    ROLES_SET_UP: usersApiUrl + '/api/roles/set-up',


    // Images API

    UPLOAD_IMAGE: imagesApiUrl + '/api/images',

    // Categories API
    GET_CATEGORIES: categoriesApiUrl + '/api/categories',
    POST_CATEGORIES: categoriesApiUrl + '/api/categories',
    PUT_CATEGORIES: categoriesApiUrl + '/api/categories',
    DELETE_CATEGORIES: categoriesApiUrl + '/api/categories',
    CATEGORY_IS_FREE: categoriesApiUrl + '/api/category-name-is-free',
    

    // Chats API
    GET_CHATS: chatsApiUrl + '/api/messages',
    
    REACT_APP_USERS_API_URL: usersApiUrl,
    REACT_APP_PRODUCTS_API_URL: productsApiUrl,
    REACT_APP_IMAGES_API_URL: imagesApiUrl,
    REACT_APP_CATEGORIES_API_URL: categoriesApiUrl,
    REACT_APP_CHATS_API_URL: chatsApiUrl
}

export default API_URLS;
