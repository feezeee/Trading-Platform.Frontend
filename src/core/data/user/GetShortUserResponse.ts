export interface GetShortUserResponse {
	id: string;
	first_name: string;
	last_name: string;
	nickname: string;
    registration_date: string;
	profile_image_url: string | null;
}