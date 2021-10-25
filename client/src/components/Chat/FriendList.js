import React, { useState } from "react";
import { Modal } from "antd";

import Friend from "./Friend";

export default function FriendList() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleAddFriend = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Modal
        title="Add a friend"
        visible={isModalVisible}
        onOk={handleAddFriend}
        onCancel={handleCancel}
        okText="Add"
      >
        <input className="form-control" placeholder="Your friend username" />
      </Modal>

      <div className="chat__friendList">
        <div className="p-2">
          <div className="btn btn-info text-white d-block" onClick={showModal}>
            Add Friend
          </div>
        </div>
        <Friend />
        <Friend />
      </div>
    </>
  );
}
