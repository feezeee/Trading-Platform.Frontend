import API_URLS from "../apiUrls";
import { GetProductEntity } from "../entities/product/GetProductEntity";
import { GetProductResponse } from "../data/models/product/GetProductResponse";
import axios from "axios";
import { toGetProductEntity } from "../mapper/product/ProductMapper";

export class ProductService {
  public getProducts = async (): Promise<GetProductEntity[]> => {
    try{
      const response = await axios.get<GetProductResponse[]>(
        API_URLS.GET_PRODUCTS
      );
      if (response.status !== 200){
        return []
      }
      return response.data.map((getProductResponse: GetProductResponse) =>
        toGetProductEntity(getProductResponse)
      );
    }
    catch(error){
      return [];
    }    
  };
}
