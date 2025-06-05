import { connectToDB, Table } from "@/lib/db/index";

const createTable = async (tableData: {
  tableName: string;
  createdBy: string;
}) => {
  await connectToDB();
  const newTable = new Table({
    tableName: `${tableData.tableName.trim()}-${Date.now()}`,
    createdBy: tableData.createdBy,
    usersList: [],
    orders: [],
    history: [
      {
        username: tableData.createdBy,
        action: "Created the table",
      },
    ],
  });

  await newTable.save();
  return newTable;
};

const allTables = async (username: string) => {
  await connectToDB();
  const tables = await Table.find({ createdBy: username }).sort({
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
  if (!table.usersList.includes(username)) {
    table.usersList.push(username);
    table.history.push({
      username,
      action: "Joined the table",
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

const tableServices = {
  createTable,
  allTables,
  getCurrentTable,
  deleteTable,
  userCheck,
  createOrder,
};

export default tableServices;
