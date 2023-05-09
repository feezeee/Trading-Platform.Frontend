import CarouselImage from "../carousel_image/CarouselImage";
import ChatItem from "./ChatItem";
import ChatSendingMenu from "./ChatSendingMenu";
import { GetChatEntity } from "../../core/entities/chat/GetChatEntity";
import { GetFullUserEntity } from "../../core/entities/user/GetFullUserEntity";
import { useState } from "react";

export interface IChatMenuProps {
  users: GetFullUserEntity[];
  chats: GetChatEntity[];
  currentUser: GetFullUserEntity;
}

const ChatMenu: React.FunctionComponent<IChatMenuProps> = (props) => {
  const [selectedChatItemIndex, setSelectedChatItemIndex] = useState(0);

  const chatItemOnClick = (index: number) => {};

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
        <ChatSendingMenu />
      </div>
    </div>
  );
};

export default ChatMenu;
