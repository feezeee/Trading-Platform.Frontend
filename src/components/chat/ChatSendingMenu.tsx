import MessageItem from "./MessageItem";

export interface IChatSendingMenuProps {
    
}

const ChatSendingMenu: React.FunctionComponent<IChatSendingMenuProps> = (
  props
) => {
  return (
    <div
      style={{ backgroundColor: "rgb(244, 244, 241)" }}
      className="h-100 w-100"
    >
      <div className="h-100 w-100 d-flex flex-column">
        <div className="flex-grow-1 position-relative">
          <div className="position-absolute w-100 h-100">
            <div className="d-flex flex-column h-100">
              <div className="overflow-auto">
                <div className="p-3">
                  <div className="row m-0">
                    <div className="col p-0"></div>
                    <div className="col-auto p-0">
                      <div className="d-flex">
                        <MessageItem
                          text="qweqwe qwe qweqeqweqwe qwe qasd asd qwe qweqwe qwe qweqeqweqwe qwe qasd asd qwe qweqwe qwe qweqeqweqwe qwe qasd asd qwe qweqwe qwe qweqeqweqwe qwe qasd asd qwe qweqwe qwe qweqeqweqwe qwe qasd asd qwe qweqwe qwe qweqeqweqwe qwe qasd asd qwe"
                          date={new Date()}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="p-3">

                  </div>

                  <div className="row m-0">
                    <div className="col-auto p-0">
                      <div className="d-flex">
                        <MessageItem
                          text="qweqwe qwe qweqeqweqwe qwe qasd asd qwe "
                          date={new Date()}
                        />
                      </div>
                    </div>
                    <div className="col p-0"></div>
                  </div>

                  <div className="p-3">

                  </div>

                  <div className="row m-0">
                    <div className="col-auto p-0">
                      <div className="d-flex">
                        <MessageItem
                          text="qweqwe qwe qweqeqweqwe qwe qasd asd qwe "
                          date={new Date()}
                        />
                      </div>
                    </div>
                    <div className="col p-0"></div>
                  </div>

                  <div className="p-3">

                  </div>

                  <div className="row m-0">
                    <div className="col-auto p-0">
                      <div className="d-flex">
                        <MessageItem
                          text="qweqwe qwe qweqeqweqwe qwe qasd asd qwe "
                          date={new Date()}
                        />
                      </div>
                    </div>
                    <div className="col p-0"></div>
                  </div>

                  <div className="p-3">

                  </div>

                  <div className="row m-0">
                    <div className="col-auto p-0">
                      <div className="d-flex">
                        <MessageItem
                          text="qweqwe qwe qweqeqweqwe qwe qasd asd qwe "
                          date={new Date()}
                        />
                      </div>
                    </div>
                    <div className="col p-0"></div>
                  </div>

                  <div className="p-3">

                  </div>

                  <div className="row m-0">
                    <div className="col-auto p-0">
                      <div className="d-flex">
                        <MessageItem
                          text="qweqwe qwe qweqeqweqwe qwe qasd asd qwe "
                          date={new Date()}
                        />
                      </div>
                    </div>
                    <div className="col p-0"></div>
                  </div>

                  <div className="p-3">

                  </div>

                  <div className="row m-0">
                    <div className="col-auto p-0">
                      <div className="d-flex">
                        <MessageItem
                          text="qweqwe qwe qweqeqweqwe qwe qasd asd qwe "
                          date={new Date()}
                        />
                      </div>
                    </div>
                    <div className="col p-0"></div>
                  </div>

                  <div className="p-3">

                  </div>

                  <div className="row m-0">
                    <div className="col-auto p-0">
                      <div className="d-flex">
                        <MessageItem
                          text="qweqwe qwe qweqeqweqwe qwe qasd asd qwe "
                          date={new Date()}
                        />
                      </div>
                    </div>
                    <div className="col p-0"></div>
                  </div>

                  <div className="p-3">

                  </div>

                  <div className="row m-0">
                    <div className="col-auto p-0">
                      <div className="d-flex">
                        <MessageItem
                          text="qweqwe qwe qweqeqweqwe qwe qasd asd qwe "
                          date={new Date()}
                        />
                      </div>
                    </div>
                    <div className="col p-0"></div>
                  </div>

                  <div className="p-3">

                  </div>

                  <div className="row m-0">
                    <div className="col-auto p-0">
                      <div className="d-flex">
                        <MessageItem
                          text="qweqwe qwe qweqeqweqwe qwe qasd asd qwe "
                          date={new Date()}
                        />
                      </div>
                    </div>
                    <div className="col p-0"></div>
                  </div>
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
