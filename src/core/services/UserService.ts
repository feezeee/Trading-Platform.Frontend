import { toAuthorizeUserRequest, toGetUserTokenEntity } from './../mapper/user/UserMapper';
import API_URLS from "../apiUrls";
import { GetUserTokenResponse } from "../data/models/user/GetUserTokenResponse";
import { AuthorizeUserEntity } from "../entities/user/AuthorizeUserEntity";
import { GetUserTokenEntity } from "../entities/user/GetUserTokenEntity";
import { GetUserShortEntity } from "./../entities/user/GetUserShortEntity";
import axios from "axios";

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

  public authorizeUser = async(
    authorizeUser: AuthorizeUserEntity
  ): Promise<GetUserTokenEntity | null> => {
    const response = await axios.post<GetUserTokenResponse>(
      API_URLS.AUTHORIZE_USER,
      toAuthorizeUserRequest(authorizeUser)
    );
    // "http://localhost:8003/api/authorization"
    return response.data == null ? null : toGetUserTokenEntity(response.data)
  }
}
