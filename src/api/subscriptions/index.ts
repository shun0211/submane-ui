import axios from "axios";
import { API_URL } from "../endpoint";

export const getSubscriptions = () => {
  return axios
    .get(`${API_URL}/subscriptions`)
    .then((res) => res.data)
    .catch((e) => console.error(e));
};

export const getSubscriptionsSubscriptionId = (id: number) => {
  return axios
    .get(`${API_URL}/subscriptions/${id}`)
    .then((res) => res.data)
    .catch((e) => console.error(e));
};

export const postSubscriptions = (
  name: string,
  price: number,
  contractAt: string | null,
  userId: number
) => {
  return axios
    .post(`${API_URL}/subscriptions`, {
      name: name,
      price: price,
      contractAt: contractAt,
      userId: userId,
    })
};

export const putSubscriptionsSubscriptionId = (
  id: number,
  name: string,
  price: number,
  contractAt: string
) => {
  return axios
    .put(`${API_URL}/subscriptions/${id}`, {
      name: name,
      price: price,
      contractAt: contractAt,
    })
    .then((res) => res.data)
    .catch((e) => console.error(e));
};

export const deleteSubscriptionsSubscriptionId = (id: number) => {
  return axios
    .delete(`${API_URL}/subscriptions/${id}`)
    .then((res) => res.data)
    .catch((e) => console.error(e));
};
