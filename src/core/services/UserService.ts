import {
  toAuthorizeUserRequest,
  toCreateUserRequest,
  toGetShortUserEntity,
  toGetUserTokenEntity,
} from "./../mapper/user/UserMapper";

import API_URLS from "../apiUrls";
import { AuthorizeUserEntity } from "../entities/user/AuthorizeUserEntity";
import { GetUserShortEntity } from "./../entities/user/GetUserShortEntity";
import { GetUserShortResponse } from "../data/models/user/GetUserShortResponse";
import { GetUserTokenEntity } from "../entities/user/GetUserTokenEntity";
import { GetUserTokenResponse } from "../data/models/user/GetUserTokenResponse";
import axios from "axios";
import { NicknameIsFreeEntity } from "../entities/nickname/NicknameIsFreeEntity";
import { NicknameIsFreeResponse } from "../data/models/nickname/NicknameIsFreeResponse";
import { toNicknameIsFreeEntity } from "../mapper/nickname/NicknameMapper";
import { CreateUserEntity } from "../entities/user/CreateUserEntity";
import { CreateUserRequest } from "../data/models/user/CreateUserRequest";

export class UserService {
  public getUserById = async (
    id: string
  ): Promise<GetUserShortEntity | null> => {
    const user: GetUserShortEntity = {
      id: id,
      firstName: "Денис",
      lastName: "Скурат",
      nickname: "feeze",
      registrationDate: "18.02.2002",
    };
    return user;
    // const response = await axios.get<GetProductResponse[]>(
    //   API_URLS.GET_PRODUCTS
    // );
    // console.info("qwe");
    // console.log(response.data);
    // console.log("response.data");
    // return response.data.map((getProductResponse: GetProductResponse) =>
    //   toGetProductEntity(getProductResponse)
    // );
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

  public getShortUserByToken = async (
    accessToken: string
  ): Promise<GetUserShortEntity | null> => {
    try {
      const response = await axios.get<GetUserShortResponse>(
        API_URLS.CURRENT_USER_SHORT_INFORMATION,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.status !== 200) {
        return null;
      }
      return toGetShortUserEntity(response.data);
    } catch (error) {
      return null;
    }
  };

  public nicknameIsFree = async (
    nickname: string
  ): Promise<NicknameIsFreeEntity | null> => {
    try {
      const response = await axios.get<NicknameIsFreeResponse>(
        API_URLS.NICKNAME_IS_FREE,{
          params: {
            "nickname" : nickname
          }
        }
      )
      if (response.status !== 200){
        return null;
      }
      return toNicknameIsFreeEntity(response.data);
    } catch (error) {
      return null
    }
  };

  public registrateUser = async (
    user: CreateUserEntity
  ): Promise<boolean> => {
    try {
      const response = await axios.post<CreateUserRequest>(
        API_URLS.USER_REGISTRATION,
        toCreateUserRequest(user)
      )
      if (response.status !== 201){
        return false;
      }
      return true;
    } catch (error) {
      return false;
    }
  };
}
