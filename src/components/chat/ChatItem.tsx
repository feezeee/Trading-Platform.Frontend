import CarouselImage from "../carousel_image/CarouselImage";
import { GetFullUserEntity } from "../../core/entities/user/GetFullUserEntity";
import { useState } from "react";

export interface IChatItemProps {
  select: boolean;
  onClick: (chatId: string) => void;
  chatId: string;
  user: GetFullUserEntity;
}

const ChatItem: React.FunctionComponent<IChatItemProps> = (props) => {
  return (
    <div
      onClick={() => props.onClick(props.chatId)}
      style={{
        cursor: "pointer",
        backgroundColor: props.select === true ? "#cdfde5" : undefined,
      }}
      className="w-100"
    >
      <div className="container-fluid">
        <div className="d-flex">
          <div className="d-flex align-content-center">
            <i style={{ fontSize: 48 }} className="bi bi-person d-block"></i>
          </div>
          <div className="ps-2 w-100">
            <div className="position-relative h-100">
              <div className="position-absolute h-100 w-100 d-flex">
                <span className="w-100 text-truncate m-auto">{`${props.user.lastName} ${props.user.firstName}`}</span>
              </div>
            </div>             
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatItem;
