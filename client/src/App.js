import React, { useEffect } from "react";
import { Route, Switch } from "react-router";

import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Register from "./pages/Register";

export default function App() {
  return (
    <>
      <Switch>
        <Route component={Register} path="/signup" />
        <Route component={Login} path="/login" />
        <Route component={Chat} path="/" />
      </Switch>
    </>
  );
}
