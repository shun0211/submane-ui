import axios, { AxiosResponse } from "axios";
import { Subscription } from "../types";
import { GetSubscriptions } from "../types/api";
import { BadRequestError } from "../utils/custom_error";
import { API_URL } from "./endpoint";

const getSubscriptionsApi = axios.create();

getSubscriptionsApi.interceptors.response.use((response) => {
  const camelCaseSubscriptions = response.data.subscriptions.map(
    (subscription: any) => {
      const camelCaseSubscription = {
        ...subscription,
        contractAt: subscription.contract_at,
      };
      return camelCaseSubscription;
    }
  );

  const camelCasePage = {
    page: response.data.page.page,
    perPage: response.data.page.per_page,
    totalCount: response.data.page.total_count,
    totalPages: response.data.page.total_pages,
  }

  const formattedResponseData = {
    subscriptions: camelCaseSubscriptions,
    page: camelCasePage,
  };
  response.data = formattedResponseData;
  return response;
});

export const getSubscriptions = async (
  userId: number,
  page: number,
  perPage = 10
): Promise<GetSubscriptions> => {
  const res: AxiosResponse<GetSubscriptions> = await getSubscriptionsApi.get(
    `${API_URL}/subscriptions?userId=${userId}&page=${page}&perPage=${perPage}`,
    { withCredentials: true }
  );
  return res.data;
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
