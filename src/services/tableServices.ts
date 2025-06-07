import { connectToDB, Table } from "@/lib/db/index";
import { TableOrder, User } from "@/lib/types";
import { formatDate } from "@/utils/Time";
const createTable = async (tableData: {
  tableName: string;
  createdBy: string;
}) => {
  await connectToDB();
  const newTable = new Table({
    tableName: `${tableData.tableName.trim()}-${formatDate(new Date())}`,
    createdBy: tableData.createdBy,
    usersList: [],
    orders: [],
    history: [
      {
        username: tableData.createdBy,
        action: "Created the table",
      },
    ],
    totalSpending: 0,
  });

  await newTable.save();
  return newTable;
};

const allTables = async (username: string) => {
  await connectToDB();
  const tables = await Table.find({
    $or: [{ createdBy: username }, { "usersList.username": username }],
  }).sort({
    createdAt: -1,
  });

  return tables;
};

const getCurrentTable = async (tableId: string) => {
  await connectToDB();
  const currentTable = await Table.findById(tableId);
  if (!currentTable) {
    throw new Error("Table not found");
  }
  return currentTable;
};

const deleteTable = async (tableId: string) => {
  await connectToDB();
  const deletedTable = await Table.findByIdAndDelete(tableId);
  if (!deletedTable) {
    throw new Error("Table not found");
  }
  return deletedTable;
};

const userCheck = async (username: string, tableId: string) => {
  await connectToDB();
  const table = await Table.findById(tableId);
  if (!table) {
    throw new Error("Table not found");
  }
  const userExists = table.usersList.find(
    (user: User) => user.username === username
  );

  if (!userExists) {
    table.usersList.push({
      username,
      ordered: [],
      totalSpending: 0,
    });
    table.history.push({
      username,
      action: "Joined the table",
      timestamp: new Date(),
    });
    await table.save();
  }
  return table;
};

const createOrder = async (
  username: string,
  tableId: string,
  orderData: { orderName: string; price: number }
) => {
  await connectToDB();
  const table = await Table.findById(tableId);
  if (!table) {
    throw new Error("Table not found");
  }
  const newOrder = {
    username,
    orderName: orderData.orderName,
    price: orderData.price,
    timestamp: new Date(),
  };
  table.orders.push(newOrder);
  table.history.push({
    username,
    action: `Created an order: ${orderData.orderName}`,
    timestamp: new Date(),
  });
  await table.save();
  return newOrder;
};

const addOrderToUser = async (
  tableId: string,
  username: string,
  orderData: TableOrder
) => {
  await connectToDB();
  const table = await Table.findById(tableId);
  if (!table) {
    throw new Error("Table not found");
  }
  const user = table.usersList.find((user: User) => user.username === username);
  if (!user) {
    throw new Error("User not found in the table");
  }
  user.ordered.push({
    orderName: orderData.orderName,
    price: orderData.price,
    timestamp: new Date(),
  });
  user.totalSpending += orderData.price;
  table.totalSpending += orderData.price;
  table.history.push({
    username,
    action: `Added an order: ${orderData.orderName}`,
    timestamp: new Date(),
  });
  await table.save();
  return user;
};
const deleteOrder = async (
  username: string,
  tableId: string,
  orderId: string
) => {
  await connectToDB();
  const table = await Table.findById(tableId);
  if (!table) {
    throw new Error("Table not found");
  }
  const order = table.orders.find(
    (ord: TableOrder) => ord._id.toString() === orderId
  );
  table.orders = table.orders.filter(
    (ord: TableOrder) => ord._id.toString() !== orderId
  );
  table.history.push({
    username,
    action: `Deleted an order: ${order.orderName}`,
    timestamp: new Date(),
  });
  table.save();
  return table;
};

const deleteOrderFromUser = async (
  username: string,
  tableId: string,
  orderId: string
) => {
  await connectToDB();
  const table = await Table.findById(tableId);
  if (!table) {
    throw new Error("Table not found");
  }
  const user = table.usersList.find((user: User) => user.username === username);
  if (!user) {
    throw new Error("User not found in the table");
  }
  const userOrder = user.ordered.find(
    (ord: TableOrder) => ord._id.toString() === orderId
  );
  user.ordered = user.ordered.filter(
    (ord: TableOrder) => ord._id.toString() !== orderId
  );
  if (userOrder) {
    user.totalSpending -= userOrder.price;
    table.totalSpending -= userOrder.price;
    table.history.push({
      username,
      action: `Deleted an order: ${userOrder.orderName}`,
      timestamp: new Date(),
    });
  }
  await table.save();
  return user;
};

const tableServices = {
  createTable,
  allTables,
  getCurrentTable,
  deleteTable,
  userCheck,
  createOrder,
  addOrderToUser,
  deleteOrder,
  deleteOrderFromUser,
};

export default tableServices;
