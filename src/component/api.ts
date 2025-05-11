import axios from "axios";
import { APP_MODE } from '@/config.json';

const api = axios.create({
  baseURL: APP_MODE === "development" ? "http://localhost:8888" : "https://youtube-api.devmaker.kr",
  withCredentials: true,
});

export default api;
