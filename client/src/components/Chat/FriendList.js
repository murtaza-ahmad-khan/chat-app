import React, { useContext, useState } from "react";
import { Modal } from "antd";

import Friend from "./Friend";
import { AuthContext } from "../../context/AuthProvider";
import { searchUser } from "../../api/users";

export default function FriendList({ chats, onChatClick, onCreateChat }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchedFriend, setSearchedFriend] = useState(null);
  const [searchInput, setSearchInput] = useState("");

  const {
    state: { user },
  } = useContext(AuthContext);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleSearch = async () => {
    if (searchInput) {
      const { data } = await searchUser(searchInput);
      setSearchedFriend(data);
    }
  };

  const handleCreateChat = (partnerId) => {
    setIsModalVisible(false);
    onCreateChat(partnerId);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSearchedFriend(null);
  };

  return (
    <>
      <Modal
        title="Add a friend"
        visible={isModalVisible}
        onOk={handleSearch}
        onCancel={handleCancel}
        okText="Search"
      >
        <input
          className="form-control"
          placeholder="Your friend username"
          onChange={({ target: { value } }) => setSearchInput(value)}
        />
        {searchedFriend && (
          <div
            className="p-3 cursor-pointer"
            onClick={() => handleCreateChat(searchedFriend.id)}
          >
            {searchedFriend.name}
          </div>
        )}
      </Modal>

      <div className="chat__friendList">
        <div className="p-2">
          <div className="btn btn-info text-white d-block" onClick={showModal}>
            Add Friend
          </div>
        </div>
        {chats.map((chat) => {
          if (chat.user.id === user.id) {
            return (
              <Friend
                name={chat.partner.name}
                onClick={() => onChatClick(chat)}
                key={chat.id.toString()}
              />
            );
          }
          return (
            <Friend
              name={chat.user.name}
              onClick={() => onChatClick(chat)}
              key={chat.id.toString()}
            />
          );
        })}
      </div>
    </>
  );
}
