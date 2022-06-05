import axios from "axios";
import { API_URL } from "./endpoint";

export const signIn = (email: string, uid: string, token: string) => {
  return axios.post(
    `${API_URL}/login`,
    { email: email, uid: uid },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

export const signUp = (email: string, uid: string, token: string) => {
  return axios.post(
    "http://localhost:1323/users",
    { email: email, uid: uid },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};
