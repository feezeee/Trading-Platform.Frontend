import { GetRoleResponse } from "../role/GetRoleResponse";

export interface GetFullUserResponse {
	id: string;
	first_name: string;
	last_name: string;
	nickname: string;
    registration_date: string;
	roles: GetRoleResponse[];
	profile_image_url: string | null;
}