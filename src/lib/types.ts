export interface TableOrder {
  _id: string;
  username: string;
  orderName: string;
  price: number;
  timestamp: Date;
}
export interface Table {
  tableName: string;
  _id: string;
  createdBy: string;
  orders: TableOrder[];
  usersList: User[];
  history: { username: string; action: string; timestamp: Date }[];
  totalSpending: number;
}
export interface User {
  username: string;
  ordered: TableOrder[];
  totalSpending: number;
}
