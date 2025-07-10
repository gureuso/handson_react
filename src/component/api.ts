import axios from "axios";
import { APP_MODE } from '@/config.json';

const api = axios.create({
  baseURL: APP_MODE === "development" ? "http://localhost:8888" : "https://youtube.devmaker.kr/api",
  withCredentials: true,
});

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      const status = error.response.status;

      if (status === 403) {
        if(APP_MODE === "development") {
          window.location.href = "http://localhost:8888/youtube/api/signout";
        } else {
          window.location.href = "https://youtube.devmaker.kr/api/youtube/api/signout";
        }
      }
    }

    return Promise.reject(error);
  }
);

export default api;
