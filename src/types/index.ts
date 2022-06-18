export type User = {
  id: number;
  email: string;
  name: string | null;
}

export type Subscription = {
  id: number;
  name: string;
  price: number;
  contractAt: string;
}

export type errorMessage = {
  message: string;
  forDeveloperMessage: string;
};
