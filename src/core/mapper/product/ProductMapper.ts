import { GetProductEntity } from "../../entities/product/GetProductEntity";
import { GetProductResponse } from "../../data/product/GetProductResponse";
import { PostProductEntity } from "../../entities/product/PostProductEntity";
import { PostProductRequest } from "../../data/product/PostProductRequest";
import { PutProductEntity } from "../../entities/product/PutProductEntity";
import { PutProductRequest } from "../../data/product/PutProductRequest";

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
    categoryIdArr: apiResponse.category_id_list,
    userId: apiResponse.user_id
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

export const toPutProductRequest = (
  entity: PutProductEntity
): PutProductRequest => {
  const response: PutProductRequest = {
      id: entity.id,
      name: entity.name,
      description: entity.description,
      image_urls: entity.images,
      phone_numbers: entity.phoneNumbers,
      price: entity.price,
      category_id_list: entity.categories
  };
  return response;
};
