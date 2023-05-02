import API_URLS from "../apiUrls";
import { GetProductEntity } from "../entities/product/GetProductEntity";
import { GetProductResponse } from "../data/product/GetProductResponse";
import axios from "axios";
import { toGetProductEntity } from "../mapper/product/ProductMapper";

export class ProductService {
  public getProducts = async (
    userId: string | undefined = undefined,
    fromPrice: number | undefined = undefined,
    toPrice: number | undefined = undefined,
    priceIsSet: boolean | undefined = undefined,
    imagesAreSet: boolean | undefined = undefined
  ): Promise<GetProductEntity[]> => {
    try {
      const params = {
        userId: userId,
        fromPrice: fromPrice,
        toPrice: toPrice,
        priceIsSet: priceIsSet,
        imagesAreSet: imagesAreSet,
      };

      const response = await axios.get<GetProductResponse[]>(
        API_URLS.GET_PRODUCTS,
        {
          params: params,
        }
      );
      if (response.status !== 200) {
        return [];
      }
      return response.data.map((getProductResponse: GetProductResponse) =>
        toGetProductEntity(getProductResponse)
      );
    } catch (error) {
      return [];
    }
  };
  public getProductById = async (
    id: string
  ): Promise<GetProductEntity | null> => {
    try {
      const response = await axios.get<GetProductResponse | null>(
        `${API_URLS.GET_PRODUCTS}/${id}`
      );
      if (response.status !== 200) {
        return null;
      }
      if (response.data == null) {
        return null;
      }
      return toGetProductEntity(response.data);
    } catch (error) {
      return null;
    }
  };
}
