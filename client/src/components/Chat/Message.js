import React from "react";

export default function Message({ self }) {
  const classes =
    "messenger__message align-self-" + (self ? "end self" : "start");

  return <div className={classes}>Hello Every one</div>;
}
