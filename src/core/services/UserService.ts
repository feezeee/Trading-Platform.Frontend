import {
  toAuthorizeUserRequest,
  toCreateUserRequest,
  toGetFullUserEntity,
  toGetUserTokenEntity,
} from "./../mapper/user/UserMapper";

import API_URLS from "../apiUrls";
import { AuthorizeUserEntity } from "../entities/user/AuthorizeUserEntity";
import { CreateUserEntity } from "../entities/user/CreateUserEntity";
import { CreateUserRequest } from "../data/user/CreateUserRequest";
import { GetFullUserEntity } from "../entities/user/GetFullUserEntity";
import { GetFullUserResponse } from "../data/user/GetFullUserResponse";
import { GetUserTokenEntity } from "../entities/user/GetUserTokenEntity";
import { GetUserTokenResponse } from "../data/user/GetUserTokenResponse";
import { NicknameIsFreeEntity } from "../entities/nickname/NicknameIsFreeEntity";
import { NicknameIsFreeResponse } from "../data/nickname/NicknameIsFreeResponse";
import axios from "axios";
import { toNicknameIsFreeEntity } from "../mapper/nickname/NicknameMapper";

export class UserService {
  public getUserById = async (
    id: string
  ): Promise<GetFullUserEntity | null> => {
    try {
      const response = await axios.get<GetFullUserResponse | null>(
        API_URLS.USERS_FULL_INFORMATION + `/${id}`
      );
      if (response.status !== 200) {
        return null;
      }
      if (response.data === null) {
        return null;
      }
      return toGetFullUserEntity(response.data);
    } catch (error) {
      return null;
    }
  };

  public authorizeUser = async (
    authorizeUser: AuthorizeUserEntity
  ): Promise<GetUserTokenEntity | null> => {
    try {
      const response = await axios.post<GetUserTokenResponse>(
        API_URLS.USER_AUTHORIZATION,
        toAuthorizeUserRequest(authorizeUser)
      );
      if (response.status !== 200) {
        return null;
      }
      return toGetUserTokenEntity(response.data);
    } catch (error) {
      return null;
    }
  };

  public getFullUserByToken = async (
    accessToken: string
  ): Promise<GetFullUserEntity | null> => {
    try {
      const response = await axios.get<GetFullUserResponse>(
        API_URLS.CURRENT_USER_FULL_INFORMATION,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.status !== 200) {
        return null;
      }
      return toGetFullUserEntity(response.data);
    } catch (error) {
      return null;
    }
  };

  public nicknameIsFree = async (
    nickname: string
  ): Promise<NicknameIsFreeEntity | null> => {
    try {
      const response = await axios.get<NicknameIsFreeResponse>(
        API_URLS.USER_NICKNAME_IS_FREE,
        {
          params: {
            nickname: nickname,
          },
        }
      );
      if (response.status !== 200) {
        return null;
      }
      return toNicknameIsFreeEntity(response.data);
    } catch (error) {
      return null;
    }
  };

  public registrateUser = async (user: CreateUserEntity): Promise<boolean> => {
    try {
      const response = await axios.post<CreateUserRequest>(
        API_URLS.USER_REGISTRATION,
        toCreateUserRequest(user)
      );
      if (response.status !== 201) {
        return false;
      }
      return true;
    } catch (error) {
      return false;
    }
  };
}
