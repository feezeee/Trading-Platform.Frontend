import { GetProductEntity } from "../../entities/product/GetProductEntity";
import { GetProductResponse } from "../../data/product/GetProductResponse";
import { PostProductEntity } from "../../entities/product/PostProductEntity";
import { PostProductRequest } from "../../data/product/PostProductRequest";

export const toGetProductEntity = (
  apiResponse: GetProductResponse
): GetProductEntity => {
  const entity: GetProductEntity = {
    id: apiResponse.id,
    name: apiResponse.name,
    description: apiResponse.description,
    price: apiResponse.price,
    images: apiResponse.image_urls,
    createdAt: new Date(apiResponse.created_at),
    phoneNumbers: apiResponse.phone_numbers,
    categoryIdArr: apiResponse.category_id_list
  };
  return entity;
};


export const toPostProductRequest = (
  entity: PostProductEntity
): PostProductRequest => {
  const response: PostProductRequest = {
      name: entity.name,
      description: entity.description,
      image_urls: entity.images,
      phone_numbers: entity.phoneNumbers,
      price: entity.price,
      user_id: entity.userId,
      category_id_list: entity.categories
  };
  return response;
};
