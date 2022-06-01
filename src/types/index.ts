export type User = {
  id: number | null;
  email: string | null;
  name: string | null;
}

export type Subscription = {
  id: number;
  name: string;
  price: number;
  contractAt: string;
}
