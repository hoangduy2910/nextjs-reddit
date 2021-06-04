import axios from "axios";

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || "localhost";
const SERVER_PORT = process.env.SERVER_PORT || 5000;

const instance = axios.create({
  baseURL: `http://${SERVER_HOSTNAME}:${SERVER_PORT}/api`,
  withCredentials: true,
});

export default instance;
