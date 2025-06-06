"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Table, TableOrder } from "@/lib/types";

interface UseTableDataProps {
  tableId: string;
}

export default function useTableData({ tableId }: UseTableDataProps) {
  const [username, setUsername] = useState<string | null>(null);
  const [tableData, setTableData] = useState<Table | null>(null);
  const [orderList, setOrderList] = useState<TableOrder[]>([]);
  const [historySection, setHistorySection] = useState<boolean>(false);
  const [userListSection, setUserListSection] = useState<boolean>(false);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    setUsername(storedUsername);
    localStorage.setItem("tableId", tableId);

    if (storedUsername) {
      axios
        .post("/api/username", { username: storedUsername, tableId })
        .then((res) => {
          setTableData(res.data.userCheck);
          setOrderList(res.data.userCheck.orders || []);
        })
        .catch((err) => console.error("Error connecting to table:", err));
    } else {
      fetchTableData();
    }
  }, [tableId]);

  const fetchTableData = async () => {
    try {
      const res = await axios.post("/api/table", { tableId });
      setTableData(res.data.currentTable);
      setOrderList(res.data.currentTable.orders || []);
    } catch (error) {
      console.error("Error fetching table data:", error);
    }
  };

  const connectToTable = async (usernameInput: string) => {
    localStorage.setItem("username", usernameInput);
    localStorage.setItem("tableId", tableId);

    try {
      const res = await axios.post("/api/username", {
        username: usernameInput,
        tableId,
      });
      setUsername(usernameInput);
      setTableData(res.data.userCheck);
    } catch (error) {
      console.error("Error connecting to table:", error);
    }
  };

  const createOrder = async (orderData: {
    orderName: string;
    price: string;
  }) => {
    try {
      const res = await axios.post("/api/order/create", {
        username,
        tableId,
        orderData,
      });
      setOrderList((prev) => [...prev, res.data.order]);
      fetchTableData();
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  const toggleHistorySection = () => {
    setHistorySection((prev) => !prev);
    setUserListSection(false);
  };
  const toggleUserListSection = () => {
    setUserListSection((prev) => !prev);
    setHistorySection(false);
  };

  return {
    username,
    tableData,
    orderList,
    historySection,
    userListSection,
    connectToTable,
    createOrder,
    toggleHistorySection,
    toggleUserListSection,
  };
}
