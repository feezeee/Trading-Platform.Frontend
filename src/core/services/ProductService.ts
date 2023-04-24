import API_URLS from "../apiUrls";
import { GetProductEntity } from "../entities/products/GetProductEntity";
import { GetProductResponse } from "../data/models/products/GetProductResponse";
import axios from "axios";
import { toGetProductEntity } from "../mapper/products/ProductMapper";

export class ProductService {
  public getProducts = async (): Promise<GetProductEntity[]> => {
	console.log(API_URLS.GET_PRODUCTS)
    const response = await axios.get<GetProductResponse[]>(
      API_URLS.GET_PRODUCTS
    );
    console.info("qwe");
    console.log(response.data);
    console.log("response.data");
    return response.data.map((getProductResponse: GetProductResponse) =>
      toGetProductEntity(getProductResponse)
    );
  };
}
