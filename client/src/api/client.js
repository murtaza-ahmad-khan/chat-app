import axios from "axios";

let token = localStorage.getItem("token");
if (token) {
  token = JSON.parse(token);
}

export default axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${token || ""}`,
  },
});
