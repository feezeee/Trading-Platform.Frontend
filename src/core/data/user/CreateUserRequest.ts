export interface CreateUserRequest {
	first_name: string;
	last_name: string;
	nickname: string;
    password: string;
    profile_image_url: string | null;
  }
  