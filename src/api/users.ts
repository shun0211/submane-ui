import axios from "axios";
import { API_URL } from "./endpoint";

export const getUsersUserId = (id: number) => {
  return axios.get(`${API_URL}/users/${id}`);
};

export const getCurrentUser = () => {
  return axios.get(`${API_URL}/current-user`)
}
