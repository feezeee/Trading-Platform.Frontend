import { GetImageEntity } from "../../entities/image/GetImageEntity";
import { GetImageResponse } from "../../data/image/GetImageResponse";
import { NicknameIsFreeEntity } from "../../entities/nickname/NicknameIsFreeEntity";
import { NicknameIsFreeResponse } from "../../data/nickname/NicknameIsFreeResponse";

export const toNicknameIsFreeEntity = (
  apiResponse: NicknameIsFreeResponse
): NicknameIsFreeEntity => {
  const data: NicknameIsFreeEntity = {
    isFree: apiResponse.is_free
  };
  return data;
};
