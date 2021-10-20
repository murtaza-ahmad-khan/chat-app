import http from "./client";

const endpoint = "/users";

export const createUser = (data) => {
  return http.post(endpoint, data);
};
