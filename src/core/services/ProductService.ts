import {
  toGetProductEntity,
  toPostProductRequest,
  toPutProductRequest,
} from "../mapper/product/ProductMapper";

import API_URLS from "../apiUrls";
import { GetProductEntity } from "../entities/product/GetProductEntity";
import { GetProductResponse } from "../data/product/GetProductResponse";
import { PostProductEntity } from "../entities/product/PostProductEntity";
import { PutProductEntity } from "../entities/product/PutProductEntity";
import axios from "axios";

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

  public createProduct = async (
    entity: PostProductEntity
  ): Promise<GetProductEntity | null> => {
    try {
      const response = await axios.post<GetProductResponse>(
        API_URLS.CREATE_PRODUCT,
        toPostProductRequest(entity)
      );
      if (response.status !== 201) {
        return null;
      }
      if (response.data === null) {
        return null;
      }
      return toGetProductEntity(response.data);
    } catch (error) {
      return null;
    }
  };

  public updateProduct = async (
    entity: PutProductEntity
  ): Promise<GetProductEntity | null> => {
    try {
      const response = await axios.put<GetProductResponse | null>(
        API_URLS.UPDATE_PRODUCT,
        toPutProductRequest(entity)
      );
      if (response.status !== 200) {
        return null;
      }
      if (response.data === null){
        return null;
      }
      return toGetProductEntity(response.data);
    } catch (error) {
      return null;
    }
  };

  public deleteProduct = async (id: string): Promise<boolean> => {
    try {
      const response = await axios.delete(
        `${API_URLS.DELETE_PRODUCTS}/${id}`
      );
      if (response.status !== 200) {
        return false;
      }
      return true;
    } catch (error) {
      return false;
    }
  };
}
