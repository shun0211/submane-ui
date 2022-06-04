import axios from "axios";
import { Subscription } from "../../types";
import { API_URL } from "../endpoint";

export const getSubscriptions = async () => {
  return await axios
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

export const postSubscriptions = async (
  name: string,
  price: number,
  contractAt: string
) => {
  return await axios
    .post(`${API_URL}/subscriptions`, {
      name: name,
      price: price,
      contractAt: contractAt,
    })
    .then((res) => res.data)
    .catch((e) => console.error(e));
};

export const putSubscriptionsSubscriptionId = async (
  id: number,
  name: string,
  price: number,
  contractAt: string
) => {
  return await axios
    .put(`${API_URL}/subscriptions/${id}`, {
      name: name,
      price: price,
      contractAt: contractAt,
    })
    .then((res) => res.data)
    .catch((e) => console.error(e));
};

export const deleteSubscriptionsSubscriptionId = async (id: number) => {
  return await axios
    .delete(`${API_URL}/subscriptions/${id}`)
    .then((res) => res.data)
    .catch((e) => console.error(e));
};
