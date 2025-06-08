"use client";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ServerErrorMessage, Table, TableOrder } from "@/lib/types";
import { NotificationContext } from "@/context/NotificationContext";

interface UseTableDataProps {
  tableId: string;
}

export default function useTableData({ tableId }: UseTableDataProps) {
  const [username, setUsername] = useState<string | null>(null);
  const [tableData, setTableData] = useState<Table | null>(null);
  const [orderList, setOrderList] = useState<TableOrder[]>([]);
  const { showNotification } = useContext(NotificationContext);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    setUsername(storedUsername);
    localStorage.setItem("tableId", tableId);

    if (storedUsername) {
      axios
        .post("/api/username/check", { username: storedUsername, tableId })
        .then((res) => {
          setTableData(res.data.userCheck);
          setOrderList(res.data.userCheck.orders || []);
        })
        .catch((err) => showNotification(err as ServerErrorMessage));
    } else {
      fetchTableData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableId]);

  const fetchTableData = async () => {
    try {
      const res = await axios.post("/api/table/all", { tableId });
      setTableData(res.data.currentTable);
      setOrderList(res.data.currentTable.orders || []);
    } catch (error) {
      showNotification(error as ServerErrorMessage);
    }
  };

  const connectToTable = async (usernameInput: string) => {
    localStorage.setItem("username", usernameInput);
    localStorage.setItem("tableId", tableId);

    try {
      const res = await axios.post("/api/username/check", {
        username: usernameInput,
        tableId,
      });
      setUsername(usernameInput);
      setTableData(res.data.userCheck);
    } catch (error) {
      showNotification(error as ServerErrorMessage);
    }
  };

  const handleUsernameSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const usernameInput = e.currentTarget.username.value;
    connectToTable(usernameInput);
  };
  const handleDeleteOrderFromUser = async (
    username: string,
    orderId: string
  ) => {
    try {
      const res = await axios.delete("/api/username/order-delete", {
        data: {
          username,
          tableId,
          orderId,
        },
      });
      fetchTableData();
      showNotification(res);
    } catch (error) {
      showNotification(error as ServerErrorMessage);
    }
  };
  return {
    username,
    tableData,
    orderList,
    connectToTable,
    fetchTableData,
    setOrderList,
    handleUsernameSubmit,
    handleDeleteOrderFromUser,
  };
}
