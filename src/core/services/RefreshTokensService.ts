import { toGetFullUserEntity, toGetUserTokenEntity } from "../mapper/user/UserMapper";

import API_URLS from "../apiUrls";
import { GetUserTokenEntity } from "../entities/user/GetUserTokenEntity";
import { GetUserTokenResponse } from "../data/user/GetUserTokenResponse";
import { UserService } from "./UserService";
import axios from "axios";
import localStorageKeys from "../localStorageKeys";

export class RefreshTokensService {
  public refreshTokens = async (): Promise<boolean> => {
    try {
      const refreshToken = localStorage.getItem(localStorageKeys.refreshToken) ?? ""
      const accessToken = localStorage.getItem(localStorageKeys.accessToken) ?? ""


      const response = await axios.post<GetUserTokenResponse>(
        API_URLS.USER_REFRESH_TOKENS,
        {
          access_token: accessToken,
          refresh_token: refreshToken,
        }
      );
      
      if (response.status !== 200){
        localStorage.clear();
        return false;
      }
    
      const userService = new UserService();
      localStorage.clear();
      const newUser = await userService.getFullUserByToken(response.data.access_token);
      if (newUser !== null){
        localStorage.setItem(localStorageKeys.accessToken, response.data.access_token)
        localStorage.setItem(localStorageKeys.refreshToken, response.data.refresh_token)
        localStorage.setItem(localStorageKeys.user, JSON.stringify(newUser))
      }
      return true
    } catch {
      return false;
    }
  };
}
