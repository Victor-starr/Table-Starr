export interface TableOrder {
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
}
export interface User {
  username: string;
  ordered: TableOrder[];
  totalSpending: number;
}
