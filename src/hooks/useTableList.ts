"use client";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ServerErrorMessage, Table } from "@/lib/types";
import { useRouter } from "next/navigation";
import { NotificationContext } from "@/context/NotificationContext";
import { useUserExp } from "./useUserExp";

export const useTableList = () => {
  const { showNotification } = useContext(NotificationContext);
  const [tableList, setTableList] = useState<Table[]>([]);
  const { startLoading, stopLoading, setErrorMessage, loading, error } =
    useUserExp();
  const router = useRouter();

  const fetchTables = async () => {
    try {
      startLoading();
      const username = localStorage.getItem("username");
      const res = await axios.post("/api/table/all", { username });
      setTableList(res.data.tableList);
    } catch (error) {
      setErrorMessage((error as ServerErrorMessage).data.error);
      showNotification(error as ServerErrorMessage);
    } finally {
      stopLoading();
    }
  };

  const createTable = async (tableName: string) => {
    startLoading();
    try {
      const createdBy = localStorage.getItem("username");
      const res = await axios.post("/api/table/create", {
        tableName,
        createdBy,
      });
      setTableList((prev) => [...prev, res.data.newTable]);
      showNotification(res);
    } catch (error) {
      setErrorMessage((error as ServerErrorMessage).data.error);
      showNotification(error as ServerErrorMessage);
    } finally {
      stopLoading();
    }
  };

  const deleteTable = async (tableId: string) => {
    startLoading();
    try {
      await axios.delete("/api/table/delete", { data: { tableId } });
      setTableList((prev) => prev.filter((t) => t._id !== tableId));
    } catch (error) {
      setErrorMessage((error as ServerErrorMessage).data.error);
      showNotification(error as ServerErrorMessage);
    } finally {
      stopLoading();
    }
  };

  const connectToTable = (tableId: string) => {
    localStorage.setItem("tableId", tableId);
    router.push(`/${tableId}`);
  };
  const handleCreateTable = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const tableName = form.tableName.value.trim();
    if (tableName === "Hel") {
      setErrorMessage("Table name cannot be 'Hel'");
      return;
    }
    if (!tableName) return;
    createTable(tableName);
    form.reset();
  };

  useEffect(() => {
    fetchTables();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    tableList,
    createTable,
    deleteTable,
    connectToTable,
    handleCreateTable,
    loading,
    error,
  };
};
