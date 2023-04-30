import API_URLS from "../apiUrls";
import { GetImageResponse } from "../data/models/image/GetImageResponse";
import { GetImageEntity } from "../entities/image/GetImageEntity";
import axios from "axios";
import { toGetImageEntity } from "../mapper/image/ImageMapper";

export class ImageService {
  public uploadImage = async (file: File, onUploadProgress: any): Promise<GetImageEntity | null> => {
    try{
      let formData = new FormData();
      formData.append("file", file);
    
      var response = await axios.post<GetImageResponse>(API_URLS.UPLOAD_IMAGE, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
        onUploadProgress
      });
      if(response.status !== 200){
        return null;
      }

      let image = toGetImageEntity(response.data)
      image.imageUrl = `${API_URLS.REACT_APP_IMAGES_API_URL}/${image.imageUrl}`
      return image;
    }
    catch(error){
      return null
    }    
  };
}
