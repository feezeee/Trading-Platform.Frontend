import CarouselImage from "../carousel_image/CarouselImage";
import ChatItem from "./ChatItem";
import ChatSendingMenu from "./ChatSendingMenu";
import { GetChatEntity } from "../../core/entities/chat/GetChatEntity";
import { GetFullUserEntity } from "../../core/entities/user/GetFullUserEntity";
import { GetMessageEntity } from "../../core/entities/chat/GetMessageEntity";
import { useState } from "react";

export interface IChatMenuProps {
  users: GetFullUserEntity[];
  chats: GetChatEntity[];
  currentUser: GetFullUserEntity;
  sendMessage: (message: string, fromUser: GetFullUserEntity, toUser: GetFullUserEntity, chatId: string) => void;
}

const ChatMenu: React.FunctionComponent<IChatMenuProps> = (props) => {
  const [selectedChatItemId, setSelectedChatItemId] = useState<
    string | null
  >(null);

  const getMessages = (): GetMessageEntity[] | null => {
    if (selectedChatItemId === null) {
      return null;
    }
    if (props.chats.find((chat) => chat.id === selectedChatItemId) === undefined) {
      return null;
    }
    return props.chats.find((chat) => chat.id === selectedChatItemId)!.messageArr;
  };

  const getRemoteUser = (): GetFullUserEntity | null => {
    if (selectedChatItemId === null) {
      return null;
    }
    if (props.chats.find((chat) => chat.id === selectedChatItemId) === undefined) {
      return null;
    }
    const remoteUserId = props.chats.find((chat) => chat.id === selectedChatItemId)!.userIdArr.find(
      (userId) => userId !== props.currentUser.id
    );
    if (remoteUserId === undefined) {
      return null;
    }
    const remoteUser = props.users.find((user) => user.id === remoteUserId);
    if (remoteUser === undefined) {
      return null;
    }
    return remoteUser;
  };

  const chatItemOnClick = (chatId: string) => {
    if (selectedChatItemId === chatId) {
      setSelectedChatItemId(null);
    } else {
      setSelectedChatItemId(chatId);
    }
  };

  const sendMessage = (message: string, fromUser: GetFullUserEntity, toUser: GetFullUserEntity, chatId: string) => {
    props.sendMessage(message, fromUser, toUser, chatId)
  }

  return (
    <div className="d-flex h-100 w-100">
      <div style={{ width: 300 }} className="h-100 position-relative">
        <div className="h-100 d-flex flex-column position-absolute overflow-y-scroll w-100">
          {props.chats.map(
            (chat, index) =>
              chat.userIdArr.find((t) => t !== props.currentUser.id) !==
                undefined &&
              props.users.find(
                (t) =>
                  t.id ===
                  chat.userIdArr.find((t) => t !== props.currentUser.id)!
              ) !== undefined && [
                <ChatItem
                  select={selectedChatItemId === chat.id}
                  chatId={chat.id}
                  onClick={chatItemOnClick}
                  user={
                    props.users.find(
                      (t) =>
                        t.id ===
                        chat.userIdArr.find((t) => t !== props.currentUser.id)!
                    )!
                  }
                />,
                <hr className="m-0" />,
              ]
          )}
        </div>
      </div>
      <div className="flex-grow-1">
        {selectedChatItemId !== null && getMessages() !== null && getRemoteUser() !== null ? (
          <ChatSendingMenu
            chatId={selectedChatItemId}
            currentUser={props.currentUser}
            messages={getMessages()!}
            remoteUser={getRemoteUser()!}
            sendMessage={sendMessage}
          />
        ) : (
          <div
            style={{ backgroundColor: "rgb(244, 244, 241)" }}
            className="h-100 w-100 d-flex"
          >
            <span style={{fontSize: 48}} className="m-auto text-center">Выберите чат</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMenu;
