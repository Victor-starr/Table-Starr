"use client";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ServerErrorMessage, Table } from "@/lib/types";
import { useRouter } from "next/navigation";
import { NotificationContext } from "@/context/NotificationContext";

export const useTableList = () => {
  const [tableList, setTableList] = useState<Table[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { showNotification } = useContext(NotificationContext);

  const fetchTables = async () => {
    setLoading(true);
    try {
      const username = localStorage.getItem("username");
      const res = await axios.post("/api/table/all", { username });
      setTableList(res.data.tableList);
    } catch (error) {
      showNotification(error as ServerErrorMessage);
    } finally {
      setLoading(false);
    }
  };

  const createTable = async (tableName: string) => {
    try {
      const createdBy = localStorage.getItem("username");
      const res = await axios.post("/api/table/create", {
        tableName,
        createdBy,
      });
      setTableList((prev) => [...prev, res.data.newTable]);
      showNotification(res);
    } catch (error) {
      setError("Failed to create table.");
      showNotification(error as ServerErrorMessage);
    }
  };

  const deleteTable = async (tableId: string) => {
    try {
      await axios.delete("/api/table/delete", { data: { tableId } });
      setTableList((prev) => prev.filter((t) => t._id !== tableId));
    } catch (error) {
      setError("Failed to delete table.");
      showNotification(error as ServerErrorMessage);
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

    if (!tableName) return;
    createTable(tableName);
    form.reset();
  };

  useEffect(() => {
    fetchTables();
  }, []);

  return {
    tableList,
    loading,
    error,
    createTable,
    deleteTable,
    connectToTable,
    handleCreateTable,
  };
};
