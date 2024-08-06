export interface Client {
  id: string;
  name: string;
  gst: string;
  address: string;
  city: string;
  district: string;
  state: string;
}

export interface Product {
  id: string;
  name: string;
  hsncode: string;
  description: string;
}

export type BillProduct = {
  id: string;
  name: string;
  hsncode: string;
  price: number;
  quantity: number;
};