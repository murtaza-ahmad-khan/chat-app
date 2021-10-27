import http from "./client";

const endpoint = "/chats";

export function getChats() {
  return http.get(endpoint);
}

export function createChat(data) {
  return http.post(endpoint, data);
}

export function getChatMessages(chatId) {
  return http.get(endpoint + "/" + chatId);
}
