import http from "./client";

const endpoint = "/auth";

export const login = (data) => {
  return http.post(endpoint + "/login", data);
};
