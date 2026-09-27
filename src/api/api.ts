import axios from "axios";

const BASE_URL = "http://localhost:3000";

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const API_URL = "https://jsonplaceholder.typicode.com";

export const http = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
