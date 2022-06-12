import axios from "axios";
import { API_URL } from "./endpoint";

export const getSubscriptions = (userId: number) => {
  return axios.get(`${API_URL}/subscriptions?userId=${userId}`, {
    withCredentials: true,
  });
};

export const getSubscriptionsSubscriptionId = (id: number) => {
  return axios.get(`${API_URL}/subscriptions/${id}`, {
    withCredentials: true,
  });
};

export const postSubscriptions = (
  name: string,
  price: number,
  contractAt: string | null,
  userId: number
) => {
  return axios.post(
    `${API_URL}/subscriptions`,
    {
      name: name,
      price: price,
      contractAt: contractAt,
      userId: userId,
    },
    {
      withCredentials: true,
    }
  );
};

export const putSubscriptionsSubscriptionId = (
  id: number,
  name: string,
  price: number,
  contractAt: string | null
) => {
  return axios.put(
    `${API_URL}/subscriptions/${id}`,
    {
      name: name,
      price: price,
      contractAt: contractAt,
    },
    {
      withCredentials: true,
    }
  );
};

export const deleteSubscriptionsSubscriptionId = (id: number) => {
  return axios.delete(`${API_URL}/subscriptions/${id}`, {
    withCredentials: true,
  });
};
