import { GetRoleEntity } from "../role/GetRoleEntity";

export interface GetFullUserEntity {
	id: string;
	firstName: string;
	lastName: string;
	nickname: string;
    registrationDate: string;
	roles: GetRoleEntity[];
}