import React, { useEffect } from "react";
import { Route, Switch } from "react-router";

import Header from "./components/Header";

import Chat from "./pages/Chat";
import ChatForm from "./pages/ChatForm";
import Home from "./pages/Home";
import Room from "./pages/Room";
import RoomJoinForm from "./pages/RoomJoinForm";

export default function App() {
  return (
    <>
      <Header />
      <div className="container-sm" style={{ maxWidth: 800, margin: "0 auto" }}>
        <Switch>
          <Route component={ChatForm} path="/chat/join" />
          <Route component={RoomJoinForm} path="/room/join" />
          <Route component={Room} path="/room" />
          <Route component={Chat} path="/chat" />
          <Route component={Home} path="/" />
        </Switch>
      </div>
    </>
  );
}