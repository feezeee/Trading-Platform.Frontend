import API_URLS from "../apiUrls";
import { GetCategoryEntity } from "../entities/category/GetCategoryEntity";
import { GetCategoryResponse } from "../data/category/GetCategoryResponse";
import axios from "axios";
import { toGetCategoryEntity } from "../mapper/category/CategoryMapper";

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
}
