import http from "./client";

const endpoint = "/users";

export const createUser = (data) => {
  return http.post(endpoint, data);
};

export const searchUser = (username) => {
  return http.get(endpoint + "/search?username=" + username);
};
