import { connectToDB, Table } from "@/lib/db/index";
import { v4 as uuidv4 } from "uuid";

const createTable = async (tableData: { createdBy: string }) => {
  await connectToDB();
  const newTable = new Table({
    tableId: uuidv4(),
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
  console.log("Table created successfully:", newTable);
  return newTable;
};

const tableServices = {
  createTable,
};

export default tableServices;
