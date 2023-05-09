import axios, { Axios, AxiosResponse } from "axios";
import {
  toAuthorizeUserRequest,
  toCreateUserRequest,
  toGetFullUserEntity,
  toGetUserTokenEntity,
  toUpdateUserRequest,
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
import { RefreshTokensService } from "./RefreshTokensService";
import { UpdateUserEntity } from "../entities/user/UpdateUserEntity";
import { error } from "console";
import localStorageKeys from "../localStorageKeys";
import { toNicknameIsFreeEntity } from "../mapper/nickname/NicknameMapper";

export class UserService {
  public getAllFullInformation = async (): Promise<GetFullUserEntity[]> => {
    try {
      const response = await axios.get<GetFullUserResponse[]>(
        API_URLS.GET_USERS_FULL_INFORMATION
      );
      if (response.status !== 200) {
        return [];
      }
      return response.data.map((item) => toGetFullUserEntity(item));
    } catch (error) {
      return [];
    }
  };

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

  public updateUser = async (user: UpdateUserEntity): Promise<boolean> => {
    try {
      const response = await axios.put(
        API_URLS.USER_UPDATE,
        toUpdateUserRequest(user)
      );
      if (response.status !== 200) {
        return false;
      }
      return true;
    } catch (error) {
      return false;
    }
  };

  public deleteUser = async (id: string): Promise<boolean> => {
    try {
      const response = await axios.delete(API_URLS.DELETE_USER + `/${id}`);
      if (response.status !== 200) {
        return false;
      }
      return true;
    } catch (error) {
      return false;
    }
  };

  public changePassword = async (newPassword: string): Promise<boolean> => {
    try {
      const accessToken =
        localStorage.getItem(localStorageKeys.accessToken) ?? "";

      const response = await axios.post(
        API_URLS.CHANGE_USER_PASSWORD,
        {
          password: newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status !== 200) {
        return false;
      }

      return true;
    } catch {
      return false;
    }
  };
}
