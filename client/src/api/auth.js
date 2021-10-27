import http from "./client";

const endpoint = "/auth";

export const login = async (data) => {
  const res = await http.post(endpoint + "/login", data);
  const user = res.data.user;
  const token = res.data.token;

  setAuthorization(user, token, http);

  return res.data;
};

export const signup = async (data) => {
  const res = await http.post(endpoint + "/signup", data);
  const user = res.data.user;
  const token = res.data.token;

  setAuthorization(user, token);

  return res.data;
};

export const logout = () => {
  http.defaults.headers["Authorization"] = "";
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};

function setAuthorization(user, token) {
  // Save user and token in localStorage
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("token", JSON.stringify(token));
  // Set http headers
  http.defaults.headers["Authorization"] = `Bearer ${token}`;
}
