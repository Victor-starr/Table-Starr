export interface HistoryEntry {
  username: string;
  action: string;
  timestamp: Date;
}

export interface TableOrder {
  _id: string;
  username: string;
  orderName: string;
  price: number;
  timestamp: Date;
}

export interface Table {
  _id: string;
  tableName: string;
  createdBy: string;
  orders: TableOrder[];
  usersList: User[];
  history: HistoryEntry[];
  totalSpending: number;
}

export interface User {
  username: string;
  ordered: TableOrder[];
  totalSpending: number;
}

type ServerResponde = {
  status: number;
  data: {
    message: string;
  };
};
export type ServerErrorMessage = {
  status: number;
  data: {
    error: string;
  };
};

type CustomNotification = {
  message: string;
  status: number;
};
export type NotificationType =
  | ServerErrorMessage
  | ServerResponde
  | CustomNotification;
