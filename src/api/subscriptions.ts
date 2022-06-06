import axios from "axios";
import { API_URL } from "./endpoint";

export const getSubscriptions = () => {
  return axios.get(`${API_URL}/subscriptions`, {
    withCredentials: true,
    headers: { withCredentials: true },
  });
};

export const getSubscriptionsSubscriptionId = (id: number) => {
  return axios.get(`${API_URL}/subscriptions/${id}`);
};

export const postSubscriptions = (
  name: string,
  price: number,
  contractAt: string | null,
  userId: number
) => {
  return axios.post(`${API_URL}/subscriptions`, {
    name: name,
    price: price,
    contractAt: contractAt,
    userId: userId,
  });
};

export const putSubscriptionsSubscriptionId = (
  id: number,
  name: string,
  price: number,
  contractAt: string
) => {
  return axios.put(`${API_URL}/subscriptions/${id}`, {
    name: name,
    price: price,
    contractAt: contractAt,
  });
};

export const deleteSubscriptionsSubscriptionId = (id: number) => {
  return axios.delete(`${API_URL}/subscriptions/${id}`);
};
