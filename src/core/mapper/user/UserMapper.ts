import { AuthorizeUserEntity } from "../../entities/user/AuthorizeUserEntity";
import { AuthorizeUserRequest } from "../../data/user/AuthorizeUserRequest";
import { CreateUserEntity } from "../../entities/user/CreateUserEntity";
import { CreateUserRequest } from "../../data/user/CreateUserRequest";
import { GetFullUserEntity } from "../../entities/user/GetFullUserEntity";
import { GetFullUserResponse } from "../../data/user/GetFullUserResponse";
import { GetShortUserEntity } from "../../entities/user/GetShortUserEntity";
import { GetShortUserResponse } from "../../data/user/GetShortUserResponse";
import { GetUserTokenEntity } from "../../entities/user/GetUserTokenEntity";
import { GetUserTokenResponse } from "../../data/user/GetUserTokenResponse";
import { UpdateUserEntity } from './../../entities/user/UpdateUserEntity';
import { UpdateUserRequest } from './../../data/user/UpdateUserRequest';
import { toGetRoleEntity } from "../role/RoleMapper";

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

export const toGetFullUserEntity = (
  apiResponse: GetFullUserResponse
): GetFullUserEntity => {
  const data: GetFullUserEntity = {
    id: apiResponse.id,
    firstName: apiResponse.first_name,
    lastName: apiResponse.last_name,
    nickname: apiResponse.nickname,
    registrationDate: new Date(apiResponse.registration_date),
    roles: apiResponse.roles.map((role) => (toGetRoleEntity(role))),
    profileImageUrl: apiResponse.profile_image_url
  };
  return data;
};


export const toGetShortUserEntity = (
  apiResponse: GetShortUserResponse
): GetShortUserEntity => {
  const data: GetShortUserEntity = {
    id: apiResponse.id,
    firstName: apiResponse.first_name,
    lastName: apiResponse.last_name,
    nickname: apiResponse.nickname,
    registrationDate: new Date(apiResponse.registration_date),
    profileImageUrl: apiResponse.profile_image_url
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

export const toUpdateUserRequest = (
  entity: UpdateUserEntity
): UpdateUserRequest => {
  const res: UpdateUserRequest = {
    id: entity.id,
    first_name: entity.firstName,
    last_name: entity.lastName,
    nickname: entity.nickname,
    profile_image_url: entity.profileImageUrl
  }
  return res;
}
