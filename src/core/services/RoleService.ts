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
import { GetRoleEntity } from "../entities/role/GetRoleEntity";
import { GetRoleResponse } from "../data/role/GetRoleResponse";
import { GetUserTokenEntity } from "../entities/user/GetUserTokenEntity";
import { GetUserTokenResponse } from "../data/user/GetUserTokenResponse";
import { NicknameIsFreeEntity } from "../entities/nickname/NicknameIsFreeEntity";
import { NicknameIsFreeResponse } from "../data/nickname/NicknameIsFreeResponse";
import axios from "axios";
import { toGetRoleEntity } from "../mapper/role/RoleMapper";
import { toNicknameIsFreeEntity } from "../mapper/nickname/NicknameMapper";

export class RoleService {
  public getAll = async (): Promise<GetRoleEntity[]> => {
    try {
      const response = await axios.get<GetRoleResponse[]>(
        API_URLS.GET_ROLES
      );
      if (response.status !== 200){
        return []
      }
      return response.data.map((item) => (toGetRoleEntity(item)))
    } catch (error) {
      return [];
    }
  };

  public setUpRoles = async (userId: string, roleIdArr: string[]) : Promise<boolean> => {
    try{
        const response = await axios.post(
            API_URLS.ROLES_SET_UP,
            {
                user_id: userId,
                role_ids: roleIdArr
            }
        )
        if (response.status !== 200) {
            return false
        }
        return true;
    }
    catch (error){
        return false;
    }
  }
}
