import React, { useEffect, useState } from "react";

import ChatMenu from "../components/chat/ChatMenu";
import { ChatService } from "../core/services/ChatService";
import { GetChatEntity } from "../core/entities/chat/GetChatEntity";
import { GetFullUserEntity } from "../core/entities/user/GetFullUserEntity";
import { GetMessageEntity } from "../core/entities/chat/GetMessageEntity";
import MyContainer from "../components/containers/MyContainer";
import { UserService } from "../core/services/UserService";
import localStorageKeys from "../core/localStorageKeys";
import { useNavigate } from "react-router-dom";

export interface IMyMessagesPageProps {}

const MyMessagesPage: React.FunctionComponent<IMyMessagesPageProps> = (
  props
) => {
  const [isMyContainerLoading, setIsMyContainerLoading] = useState(false);
  const [chats, setChats] = useState<GetChatEntity[]>([]);
  const [users, setUsers] = useState<GetFullUserEntity[]>([]);

  const [currentUser, setCurrentUser] = useState<GetFullUserEntity | null>(
    null
  );

  const navigate = useNavigate();

  const userService = new UserService();
  const chatService = new ChatService();

  const fetchChats = async () => {
    setChats(await chatService.getChatsForUser());
  };

  const fetchUsers = async () => {
    setUsers(await userService.getAllFullInformation());
  };

  const fetchCurrentUser = () => {
    const user = localStorage.getItem(localStorageKeys.user);
    if (user === null) {
      localStorage.clear();
      navigate("/products");
      return;
    }
    const userParse: GetFullUserEntity = JSON.parse(user)
    setCurrentUser(userParse)
  };

  useEffect(() => {
    const fetch = async () => {
      setIsMyContainerLoading(true);      
      fetchCurrentUser()
      await fetchChats();
      await fetchUsers();
      setIsMyContainerLoading(false);
    };
    fetch();
  }, []);

  const sendMessage = async (message: string, fromUser: GetFullUserEntity, toUser: GetFullUserEntity, chatId: string) => { 
    
    const newChats = [...chats]
    const chat = newChats.find((chat) => chat.id === chatId)
    if (chat === undefined) {
      return
    }
    const newMessageEntity: GetMessageEntity = {
      id: "qwe",
      chatId: chatId,
      createdDate: new Date(),
      message: message,
      userId: fromUser.id
    }

    chat.messageArr = [newMessageEntity, ...chat.messageArr]
    setChats(newChats)
    const response = await chatService.sendMessage(message, fromUser.id, toUser.id)
  }

  return (
    <MyContainer
      searchText=""
      onChangeSearchText={() => {}}
      isLoading={isMyContainerLoading}
      searchFieldIsHidden={true}
      onLogout={(status) => {
        navigate("/products");
      }}
    >
      {currentUser !== null && (
        <div className="h-100">
          <ChatMenu chats={chats} users={users} currentUser={currentUser} sendMessage={sendMessage} />
        </div>
      )}
    </MyContainer>
  );
};

export default MyMessagesPage;
