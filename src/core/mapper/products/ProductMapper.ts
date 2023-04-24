import { GetProductEntity } from "../../entities/products/GetProductEntity";
import { GetProductResponse } from "../../data/models/products/GetProductResponse";

export const toGetProductEntity = (
  apiResponse: GetProductResponse
): GetProductEntity => {
  const product: GetProductEntity = {
    id: apiResponse.id,
    name: apiResponse.name,
    description: apiResponse.description,
    price: apiResponse.price,
    images: apiResponse.image_urls,
  };
  return product;
};
