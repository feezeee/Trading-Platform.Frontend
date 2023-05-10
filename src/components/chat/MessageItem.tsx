import CarouselImage from "../carousel_image/CarouselImage";
import { useState } from "react";

export interface IMessageItemProps {
  text: string;
  date: Date;
}

const MessageItem: React.FunctionComponent<IMessageItemProps> = (props) => {
  return (
    <div className="d-flex bg-white rounded p-3 w-100">
      <div className="d-flex flex-column w-100">
        <span className="text-break">{props.text}</span>
        <div className="w-100 d-flex">
          <div style={{ fontSize: 10 }} className="ms-auto mt-2">
            {props.date.toLocaleString("ru-Ru", {
              year: "numeric",
              month: "numeric",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageItem;
