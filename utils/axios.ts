import axios from "axios";

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || "localhost";
const SERVER_PORT = process.env.SERVER_PORT || 5000;

// Default Options
const defaultOptions = {
  baseURL: `http://${SERVER_HOSTNAME}:${SERVER_PORT}/api`,
  withCredentials: true,
};

// Create Instance
const instance = axios.create(defaultOptions);

export default instance;
