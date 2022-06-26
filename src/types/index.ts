export type User = {
  id: number;
  email: string;
  name: string | null;
};

export type Subscription = {
  id: number;
  name: string;
  price: number;
  contractedAt: string | null;
};

export type Subscriptions = Subscription[];

export type Page = {
  page: number;
  perPage: number;
  totalCount: number;
  totalPages: number;
};

export type errorMessage = {
  message: string;
  forDeveloperMessage: string;
};
