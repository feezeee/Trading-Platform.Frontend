import { GetRoleEntity } from "../../entities/role/GetRoleEntity";
import { GetRoleResponse } from "../../data/role/GetRoleResponse";

export const toGetRoleEntity = (response: GetRoleResponse): GetRoleEntity => {
  const entity: GetRoleEntity = {
    id: response.id,
    name: response.name,
  };
  return entity;
};
