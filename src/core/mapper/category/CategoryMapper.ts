import { CategoryIsFreeEntity } from "../../entities/category/CategoryIsFreeEntity";
import { CategoryIsFreeResponse } from "../../data/category/CategoryIsFreeResponse";
import { GetCategoryEntity } from "../../entities/category/GetCategoryEntity";
import { GetCategoryResponse } from "../../data/category/GetCategoryResponse";
import { PostCategoryEntity } from "../../entities/category/PostCategoryEntity";
import { PostCategoryRequest } from "../../data/category/PostCategoryRequest";
import { PutCategoryEntity } from "../../entities/category/PutCategoryEntity";
import { PutCategoryRequest } from "../../data/category/PutCategoryRequest";

export const toGetCategoryEntity = (
  apiResponse: GetCategoryResponse
): GetCategoryEntity => {
  const entity: GetCategoryEntity = {
    id: apiResponse.id,
    name: apiResponse.name    
  };
  return entity;
};

export const toCategoyIsFreeEntity = (
  apiResponse: CategoryIsFreeResponse
) : CategoryIsFreeEntity => {
  const entity: CategoryIsFreeEntity = {
    isFree: apiResponse.is_free
  };
  return entity;
}

export const toPutCategoryRequest = (
  entity: PutCategoryEntity
) : PutCategoryRequest => {
  const data: PutCategoryRequest = {
    id: entity.id,
    name: entity.name
  }
  return data;
}


export const toPostCategoryRequest = (
  entity: PostCategoryEntity
) : PostCategoryRequest => {
  const data: PostCategoryRequest = {
    name: entity.name
  }
  return data;
}