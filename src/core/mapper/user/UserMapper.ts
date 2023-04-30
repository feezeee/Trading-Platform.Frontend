import { AuthorizeUserEntity } from "../../entities/user/AuthorizeUserEntity";
import { AuthorizeUserRequest } from "../../data/models/user/AuthorizeUserRequest";
import { GetUserShortEntity } from "../../entities/user/GetUserShortEntity";
import { GetUserShortResponse } from "../../data/models/user/GetUserShortResponse";
import { GetUserTokenEntity } from "../../entities/user/GetUserTokenEntity";
import { GetUserTokenResponse } from "../../data/models/user/GetUserTokenResponse";
import { CreateUserRequest } from "../../data/models/user/CreateUserRequest";
import { CreateUserEntity } from "../../entities/user/CreateUserEntity";

export const toGetUserTokenEntity = (
  apiResponse: GetUserTokenResponse
): GetUserTokenEntity => {
  const userToken: GetUserTokenEntity = {
    accessToken: apiResponse.access_token,
    refreshToken: apiResponse.refresh_token,
    refreshTokenExpired: apiResponse.refresh_token_expired,
  };
  return userToken;
};

export const toAuthorizeUserRequest = (
  request: AuthorizeUserEntity
): AuthorizeUserRequest => {
  const authorizeUser: AuthorizeUserRequest = {
    nickname: request.nickname,
    password: request.password,
  };
  return authorizeUser;
};

export const toGetShortUserEntity = (
  apiResponse: GetUserShortResponse
): GetUserShortEntity => {
  const data: GetUserShortEntity = {
    id: apiResponse.id,
    firstName: apiResponse.first_name,
    lastName: apiResponse.last_name,
    nickname: apiResponse.nickname,
    registrationDate: apiResponse.registration_date,
  };
  return data;
};

export const toCreateUserRequest = (
  data: CreateUserEntity
): CreateUserRequest => {
  const res: CreateUserRequest = {
    first_name: data.firstName,
    last_name: data.lastName,
    nickname: data.nickname,
    password: data.password,
    profile_image_url: data.profileImageUrl,
  };
  return res;
};
