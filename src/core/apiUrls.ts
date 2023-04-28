
const apiGateway = process.env.REACT_APP_API_GATEWAY;

const API_URLS = {
    GET_PRODUCTS: apiGateway + '/products',

    AUTHORIZE_USER: apiGateway + '/authorization',

    API_GATEWAY: apiGateway
}

export default API_URLS;
