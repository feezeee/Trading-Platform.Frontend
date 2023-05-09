import { GetMessageResponse } from "./GetMessageResponse";

export interface GetChatResponse {
	id: string;
    user_id_arr: string[];
    message_arr: GetMessageResponse[]
}