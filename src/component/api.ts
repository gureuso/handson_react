import axios from "axios";

const api = axios.create({
  baseURL: "https://youtube-api.devmaker.kr",
  withCredentials: true,
});

export default api;
