import React, { useContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

import Header from "../components/Chat/Header";
import FriendList from "../components/Chat/FriendList";
import Messenger from "../components/Chat/Messenger";
import { createChat, getChatMessages, getChats } from "../api/chats";
import { AuthContext } from "../context/AuthProvider";

const socket = io("http://localhost:5000");

export default function Chat() {
  const [chats, setChats] = useState([]);
  const [currentChatMessages, setCurrentChatMessages] = useState({
    loading: false,
    messages: [],
  });
  const [currentChat, _setCurrentChat] = useState(null);
  const currentChatRef = useRef(currentChat);

  const setCurrentChat = (data) => {
    currentChatRef.current = data;
    _setCurrentChat(data);
  };

  const {
    state: { user },
  } = useContext(AuthContext);

  const fetchChats = async () => {
    const { data } = await getChats();
    setChats(data);
  };

  const handleChatClick = async (chat) => {
    const { data } = await getChatMessages(chat.id);
    setCurrentChat(chat);
    setCurrentChatMessages({ loading: false, messages: data });
  };

  const handleCreateChat = async (partnerId) => {
    const { data } = await createChat({ partnerId });
    setChats([...chats, data]);
  };

  useEffect(() => {
    socket.on("connect", () => {
      socket.emit("join", user);
    });

    socket.on("message", (message) => {
      if (message.chatId === currentChatRef.current.id) {
        setCurrentChatMessages((chatMessages) => ({
          messages: [...chatMessages.messages, message],
        }));
      }
    });

    socket.on("disconnect", () => {
      socket.emit("leave", user);
    });

    fetchChats();
  }, []);

  return (
    <>
      <Header />
      <FriendList
        chats={chats}
        onChatClick={handleChatClick}
        onCreateChat={handleCreateChat}
      />
      <div className="chat">
        <Messenger
          messages={currentChatMessages.messages}
          currentChat={currentChat}
          socket={socket}
        />
      </div>
    </>
  );
}
