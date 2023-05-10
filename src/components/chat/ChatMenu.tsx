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
}

const ChatMenu: React.FunctionComponent<IChatMenuProps> = (props) => {
  const [selectedChatItemIndex, setSelectedChatItemIndex] = useState<
    number | null
  >(null);

  const getMessages = (): GetMessageEntity[] | null => {
    if (selectedChatItemIndex === null) {
      return null;
    }
    if (selectedChatItemIndex > props.chats.length) {
      return null;
    }
    return props.chats[selectedChatItemIndex].messageArr;
  };

  const getRemoteUser = (): GetFullUserEntity | null => {
    if (selectedChatItemIndex === null) {
      return null;
    }
    if (selectedChatItemIndex > props.chats.length) {
      return null;
    }
    const remoteUserId = props.chats[selectedChatItemIndex].userIdArr.find(
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

  const chatItemOnClick = (index: number) => {
    if (selectedChatItemIndex === index) {
      setSelectedChatItemIndex(null);
    } else {
      setSelectedChatItemIndex(index);
    }
  };

  return (
    <div className="d-flex h-100">
      <div style={{ width: 300 }} className="h-100 position-relative">
        <div className="h-100 d-flex flex-column position-absolute overflow-auto w-100">
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
                  select={selectedChatItemIndex === index}
                  index={index}
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
        {getMessages() !== null && getRemoteUser() !== null ? (
          <ChatSendingMenu
            currentUser={props.currentUser}
            messages={getMessages()!}
            remoteUser={getRemoteUser()!}
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
