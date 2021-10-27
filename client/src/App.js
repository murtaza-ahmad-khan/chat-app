import React, { useEffect } from "react";
import { Route, Switch } from "react-router";

import AuthProvider from "./context/AuthProvider";

import ProtectedRoute from "./components/ProtectedRoute";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Register from "./pages/Register";

export default function App() {
  return (
    <AuthProvider>
      <Switch>
        <Route component={Register} path="/signup" />
        <Route component={Login} path="/login" />
        <ProtectedRoute component={Chat} path="/" />
      </Switch>
    </AuthProvider>
  );
}
