import axios from "axios";
import { Subscription } from "../types";
import { BadRequestError } from "../utils/custom_error";
import { API_URL } from "./endpoint";

export const getSubscriptions = (
  userId: number,
  page: number,
  perPage = 10
) => {
  return axios.get(
    `${API_URL}/subscriptions?userId=${userId}&page=${page}&perPage=${perPage}`,
    {
      withCredentials: true,
    }
  );
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
      contract_at: contractAt,
      user_id: userId,
    },
    {
      withCredentials: true,
    }
  );
};

export const putSubscriptionsSubscriptionId = async (
  id: number,
  name: string,
  price: number,
  contractAt: string | null
): Promise<Subscription> => {
  const res = await axios
    .put(
      `${API_URL}/subscriptions/${id}`,
      {
        name: name,
        price: price,
        contract_at: contractAt,
      },
      { withCredentials: true }
    )
    .catch((e) => {
      if (
        axios.isAxiosError(e) &&
        e.response?.status === 400 &&
        Array.isArray(e.response.data)
      ) {
        throw new BadRequestError(e.response.data);
      }
    });
  const subscription: Subscription = res?.data;
  return subscription;
};

export const deleteSubscriptionsSubscriptionId = (id: number) => {
  return axios.delete(`${API_URL}/subscriptions/${id}`, {
    withCredentials: true,
  });
};
