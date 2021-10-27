import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import { AuthContext } from "../context/AuthProvider";

export default function ProtectedRoute({ component: Component }) {
  const {
    state: { user },
  } = useContext(AuthContext);
  return (
    <div>
      <Route
        render={(props) => {
          if (user) return <Component {...props} />;

          return <Redirect to="/login" />;
        }}
      />
    </div>
  );
}
