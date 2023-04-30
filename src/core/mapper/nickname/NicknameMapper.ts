import { GetImageResponse } from "../../data/models/image/GetImageResponse";
import { NicknameIsFreeResponse } from "../../data/models/nickname/NicknameIsFreeResponse";
import { GetImageEntity } from "../../entities/image/GetImageEntity";
import { NicknameIsFreeEntity } from "../../entities/nickname/NicknameIsFreeEntity";

export const toNicknameIsFreeEntity = (
  apiResponse: NicknameIsFreeResponse
): NicknameIsFreeEntity => {
  const data: NicknameIsFreeEntity = {
    isFree: apiResponse.is_free
  };
  return data;
};
