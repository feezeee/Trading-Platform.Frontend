import { GetRoleEntity } from "../role/GetRoleEntity";

export interface GetFullUserEntity {
	id: string;
	firstName: string;
	lastName: string;
	nickname: string;
    registrationDate: Date;
	roles: GetRoleEntity[];
	profileImageUrl: string | null;
}