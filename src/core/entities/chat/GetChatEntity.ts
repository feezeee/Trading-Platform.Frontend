import { GetMessageEntity } from "./GetMessageEntity";

export interface GetChatEntity {
	id: string;
    userIdArr: string[];
    messageArr: GetMessageEntity[]
}