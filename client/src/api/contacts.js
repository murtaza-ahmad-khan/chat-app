import http from "./client";

const endpoint = "/contacts";

export const createContact = (data) => {
  return http.post(endpoint, data);
};

export const getContacts = (q = "") => {
  return http.get(endpoint + q);
};
