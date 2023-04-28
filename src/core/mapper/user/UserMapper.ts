import { AuthorizeUserRequest } from "../../data/models/user/AuthorizeUserRequest";
import { GetUserTokenResponse } from "../../data/models/user/GetUserTokenResponse";
import { AuthorizeUserEntity } from "../../entities/user/AuthorizeUserEntity";
import { GetUserTokenEntity } from "../../entities/user/GetUserTokenEntity";

export const toGetUserTokenEntity = (
  apiResponse: GetUserTokenResponse
): GetUserTokenEntity => {
  const userToken: GetUserTokenEntity = {
    accessToken: apiResponse.access_token,
    refreshToken: apiResponse.refresh_token,
    refreshTokenExpired: apiResponse.refresh_token_expired
  };
  return userToken;
};


export const toAuthorizeUserRequest = (
  request: AuthorizeUserEntity
): AuthorizeUserRequest => {
  const authorizeUser: AuthorizeUserRequest = {
    nickname: request.nickname,
    password: request.password
  };
  return authorizeUser;
};
