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
  usersList: string[];
  history: { username: string; action: string; timestamp: Date }[];
}
