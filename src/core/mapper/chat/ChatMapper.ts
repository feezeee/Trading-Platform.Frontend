import { GetChatEntity } from "../../entities/chat/GetChatEntity";
import { GetChatResponse } from "../../data/chat/GetChatResponse";
import { GetMessageEntity } from "../../entities/chat/GetMessageEntity";
import { GetMessageResponse } from "../../data/chat/GetMessageResponse";

export const toGetChatEntity = (
  apiResponse: GetChatResponse
): GetChatEntity => {
  const entity: GetChatEntity = {
    id: apiResponse.id,
    userIdArr: apiResponse.user_id_arr,
    messageArr: apiResponse.message_arr.map((item) => toGetMessageEntity(item))
  };
  return entity;
};

export const toGetMessageEntity = (
  apiResponse: GetMessageResponse
): GetMessageEntity => {
  const entity: GetMessageEntity = {
    id: apiResponse.id,
    chatId: apiResponse.chat_id,
    createdDate: apiResponse.created_date,
    message: apiResponse.message,
    userId: apiResponse.user_id,
  };
  return entity;
};
