import { GetImageResponse } from "../../data/models/image/GetImageResponse";
import { GetImageEntity } from "../../entities/image/GetImageEntity";

export const toGetImageEntity = (
  apiResponse: GetImageResponse
): GetImageEntity => {
  const image: GetImageEntity = {
    imageUrl: apiResponse.image_url,
  };
  return image;
};
