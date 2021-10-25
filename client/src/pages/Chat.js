import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Chat/Header";
import FriendList from "../components/Chat/FriendList";
import Messenger from "../components/Chat/Messenger";

export default function Chat() {
  return (
    <>
      <Header />
      <FriendList />
      <div className="chat">
        <Messenger />
      </div>
    </>
  );
}
