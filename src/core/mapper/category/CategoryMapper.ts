import { GetCategoryEntity } from "../../entities/category/GetCategoryEntity";
import { GetCategoryResponse } from "../../data/category/GetCategoryResponse";

export const toGetCategoryEntity = (
  apiResponse: GetCategoryResponse
): GetCategoryEntity => {
  const entity: GetCategoryEntity = {
    id: apiResponse.id,
    name: apiResponse.name    
  };
  return entity;
};
