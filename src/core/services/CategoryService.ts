import { toCategoyIsFreeEntity, toGetCategoryEntity, toPostCategoryRequest, toPutCategoryRequest } from "../mapper/category/CategoryMapper";

import API_URLS from "../apiUrls";
import { CategoryIsFreeEntity } from "../entities/category/CategoryIsFreeEntity";
import { CategoryIsFreeResponse } from "../data/category/CategoryIsFreeResponse";
import { GetCategoryEntity } from "../entities/category/GetCategoryEntity";
import { GetCategoryResponse } from "../data/category/GetCategoryResponse";
import { PostCategoryEntity } from "../entities/category/PostCategoryEntity";
import { PostCategoryRequest } from "../data/category/PostCategoryRequest";
import { PutCategoryEntity } from "../entities/category/PutCategoryEntity";
import axios from "axios";

export class CategoryService {
  public getCategories = async (): Promise<GetCategoryEntity[]> => {
    try{
        const response = await axios.get<GetCategoryResponse[]>(
          API_URLS.GET_CATEGORIES
        );
        if (response.status !== 200){
          return []
        }
        return response.data.map((item) => toGetCategoryEntity(item));
      }
      catch(error){
        return [];
      }    
  };

  public categoryIsFree = async (categoryName: string): Promise<CategoryIsFreeEntity> => {
    try{
      const response = await axios.get<CategoryIsFreeResponse>(
        API_URLS.CATEGORY_IS_FREE,
        {
          params: {
            categoryName: categoryName
          }
        }
      )
      if (response.status !== 200){
        return {
          isFree: false
        }
      }
      if (response.data === null){
        return {
          isFree: false
        }
      }

      return toCategoyIsFreeEntity(response.data)
    }
    catch(error) {
      return {
        isFree: false
      }
    }
  }

  public postCategory = async (category: PostCategoryEntity): Promise<GetCategoryEntity | null> => {
    try{
      const response = await axios.post<GetCategoryResponse>(
        API_URLS.POST_CATEGORIES,
        toPostCategoryRequest(category)
      )
      if (response.status !== 201){
        return null;
      }
      if (response.data === null){
        return null;
      }
      return toGetCategoryEntity(response.data)
    }
    catch(error) {
      return null;
    }
  }

  public putCategory = async (category: PutCategoryEntity): Promise<GetCategoryEntity | null> => {
    try{
      const response = await axios.put<GetCategoryResponse>(
        API_URLS.PUT_CATEGORIES,
        toPutCategoryRequest(category)
      )
      if (response.status !== 200){
        return null;
      }
      if (response.data === null){
        return null;
      }
      return toGetCategoryEntity(response.data)
    }
    catch(error) {
      return null;
    }
  }

  
  public deleteCategory = async (categoryId: string): Promise<boolean> => {
    try{
      const response = await axios.delete(
        API_URLS.DELETE_CATEGORIES + `/${categoryId}`,
      )
      if (response.status !== 200){
        return false;
      }
      return true;
    }
    catch(error) {
      return true;
    }
  }
}
