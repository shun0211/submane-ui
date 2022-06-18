import axios from "axios";
import { User } from "../types";
import { isErrorMessage, NotFoundError } from "../utils/custom_error";
import { API_URL } from "./endpoint";

// NOTE: ここでユーザを返すようにして、例外時は自前の例外クラスにメッセージを詰めて発生させる
//       こうすることでAxios関連の処理を閉じ込めることができ、fetchAPIへ変更する際も変更箇所が一箇所で済む
export const signIn = async (email: string, uid: string, token: string): Promise<User> => {
  const res = await axios
    .post(
      `${API_URL}/login`,
      { email: email, uid: uid },
      { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
    )
    .catch((e) => {
      if (
        axios.isAxiosError(e) &&
        e.response?.status === 404 &&
        isErrorMessage(e.response.data)
      ) {
        throw new NotFoundError(e.response.data.message);
      }
    });
  const user: User = res?.data;
  return user;
};

export const signUp = (email: string, uid: string, token: string) => {
  return axios.post(
    `${API_URL}/users`,
    { email: email, uid: uid },
    { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
  );
};

export const signOut = () => {
  return axios.delete(`${API_URL}/logout`, { withCredentials: true });
};
