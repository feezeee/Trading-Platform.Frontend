export interface UpdateUserRequest {
  id: string;
  first_name: string;
  last_name: string;
  nickname: string;
  profile_image_url: string | null;
}
