import React from "react";

export default function Message({ self, message }) {
  const classes =
    "messenger__message align-self-" + (self ? "end self" : "start");

  return <div className={classes}>{message.message}</div>;
}
