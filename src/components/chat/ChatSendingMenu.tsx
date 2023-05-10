import { useEffect, useRef } from "react";

import { GetFullUserEntity } from "../../core/entities/user/GetFullUserEntity";
import { GetMessageEntity } from "../../core/entities/chat/GetMessageEntity";
import MessageItem from "./MessageItem";

export interface IChatSendingMenuProps {
  currentUser: GetFullUserEntity;
  messages: GetMessageEntity[];
  remoteUser: GetFullUserEntity;
}

const ChatSendingMenu: React.FunctionComponent<IChatSendingMenuProps> = (
  props
) => {
  const divRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (divRef !== null && divRef.current !== null) {
      divRef.current.scrollTop = divRef.current.scrollHeight;
    }
  }, []);

  return (
    <div
      style={{ backgroundColor: "rgb(244, 244, 241)" }}
      className="h-100 w-100"
    >
      <div className="h-100 w-100 d-flex flex-column">
        <div className="flex-grow-1 position-relative">
          <div className="position-absolute w-100 h-100">
            <div className="d-flex flex-column h-100">
              <div ref={divRef} className="overflow-auto">
                <div className="p-3 d-flex flex-column-reverse">
                  {props.messages.map((message, index) =>
                    message.userId === props.currentUser.id
                      ? [
                          <div className="row m-0">
                            <div className="col p-0"></div>
                            <div className="col-auto p-0">
                              <div className="d-flex">
                                <MessageItem
                                  text={message.message}
                                  date={message.createdDate}
                                />
                              </div>
                            </div>
                          </div>,
                          <div className="p-3"></div>,
                        ]
                      : [
                          <div className="row m-0">
                            <div className="col-auto p-0">
                              <div className="d-flex">
                                <MessageItem
                                  text={message.message}
                                  date={message.createdDate}
                                />
                              </div>
                            </div>
                            <div className="col p-0"></div>
                          </div>,
                          <div className="p-3"></div>,
                        ]
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{ backgroundColor: "rgb(255, 255, 255, 0.9)" }}
          className="p-2"
        >
          <div className="d-flex">
            <input type="text" className="form-control" />
            <button className="btn">
              <i className="bi bi-send"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatSendingMenu;
