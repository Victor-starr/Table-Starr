"use client";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ServerErrorMessage } from "@/lib/types";
import { NotificationContext } from "@/context/NotificationContext";
import { useUserExp } from "./useUserExp";
import { useTableContext } from "@/context/TableContext";
import { useTablePusherEvents } from "./useTablePusherEvents";

interface UseTableDataProps {
  tableId: string;
}

export default function useTableData({ tableId }: UseTableDataProps) {
  const { showNotification } = useContext(NotificationContext);
  const { startLoading, stopLoading, setErrorMessage, loading, error } =
    useUserExp();
  const [username, setUsername] = useState<string | null>(null);
  const { tableData, setTableData, orderList, setOrderList } =
    useTableContext();

  const fetchUserData = async () => {
    const storedUsername = localStorage.getItem("username");
    setUsername(storedUsername);
    if (storedUsername) {
      try {
        startLoading();
        const res = await axios.post("/api/username/check", {
          username: storedUsername,
          tableId,
        });
        setTableData(res.data.table);
        setOrderList(res.data.table.orders || []);
      } catch (err) {
        setErrorMessage((err as ServerErrorMessage).data.error);
        showNotification(err as ServerErrorMessage);
      } finally {
        stopLoading();
      }
    } else {
      fetchTableData();
    }
  };

  const fetchTableData = async () => {
    try {
      startLoading();
      const res = await axios.post("/api/table/all", { tableId });
      setTableData(res.data.currentTable);
      setOrderList(res.data.currentTable.orders || []);
    } catch (error) {
      setErrorMessage((error as ServerErrorMessage).data.error);
      showNotification(error as ServerErrorMessage);
    } finally {
      stopLoading();
    }
  };

  useTablePusherEvents(tableId, fetchTableData);

  useEffect(() => {
    fetchUserData();
    localStorage.setItem("tableId", tableId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableId]);

  const connectToTable = async (usernameInput: string) => {
    try {
      startLoading();
      const res = await axios.post("/api/username/check", {
        username: usernameInput,
        tableId,
      });
      setUsername(usernameInput);
      setTableData(res.data.userCheck);
    } catch (error) {
      setErrorMessage((error as ServerErrorMessage).data.error);
      showNotification(error as ServerErrorMessage);
    } finally {
      localStorage.setItem("username", usernameInput);
      localStorage.setItem("tableId", tableId);
      stopLoading();
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
      startLoading();
      const res = await axios.delete("/api/username/order-delete", {
        data: {
          username,
          tableId,
          orderId,
        },
      });
      showNotification(res);
    } catch (error) {
      setErrorMessage((error as ServerErrorMessage).data.error);
      showNotification(error as ServerErrorMessage);
    } finally {
      stopLoading();
    }
  };

  const delteUserFromTable = async (
    requestingUsername: string,
    targetUsername: string,
    tableId: string
  ) => {
    try {
      startLoading();
      console.log("DELETING USER FROM ");
      const res = await axios.delete("/api/table/delete/user", {
        data: {
          requestingUsername,
          targetUsername,
          tableId,
        },
      });
      showNotification(res);
    } catch (error) {
      setErrorMessage((error as ServerErrorMessage).data.error);
      showNotification(error as ServerErrorMessage);
    } finally {
      stopLoading();
    }
  };

  return {
    loading,
    error,
    username,
    tableData,
    orderList,
    connectToTable,
    fetchTableData,
    setOrderList,
    handleUsernameSubmit,
    handleDeleteOrderFromUser,
    delteUserFromTable,
  };
}
