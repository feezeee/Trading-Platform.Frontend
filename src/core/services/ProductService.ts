import API_URLS from "../apiUrls"
import { GetProductEntity } from "../entities/products/GetProductEntity";
import { GetProductResponse } from "../data/models/products/GetProductResponse";
import axios from "axios";
import { toGetProductEntity } from "../mapper/products/ProductMapper";

export const getProducts = async(): Promise<GetProductEntity[]> => {
	const response = await axios.get<GetProductResponse[]>(API_URLS.GET_PRODUCTS)
	return response.data.map((getProductResponse: GetProductResponse) => toGetProductEntity(getProductResponse))
}