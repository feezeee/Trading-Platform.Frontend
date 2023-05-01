import { GetProductEntity } from "../../entities/product/GetProductEntity";
import { GetProductResponse } from "../../data/product/GetProductResponse";

export const toGetProductEntity = (
  apiResponse: GetProductResponse
): GetProductEntity => {
  const entity: GetProductEntity = {
    id: apiResponse.id,
    name: apiResponse.name,
    description: apiResponse.description,
    price: apiResponse.price,
    images: apiResponse.image_urls,
    createdAt: apiResponse.created_at,
    phoneNumbers: apiResponse.phone_numbers,
    categoryIdArr: apiResponse.category_id_list
  };
  return entity;
};
