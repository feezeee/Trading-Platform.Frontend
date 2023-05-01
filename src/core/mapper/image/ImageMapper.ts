import { GetImageEntity } from "../../entities/image/GetImageEntity";
import { GetImageResponse } from "../../data/image/GetImageResponse";

export const toGetImageEntity = (
  apiResponse: GetImageResponse
): GetImageEntity => {
  const image: GetImageEntity = {
    imageUrl: apiResponse.image_url,
  };
  return image;
};
