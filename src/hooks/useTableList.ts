"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "@/lib/types";
import { useRouter } from "next/navigation";

export const useTableList = () => {
  const [tableList, setTableList] = useState<Table[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const fetchTables = async () => {
    setLoading(true);
    try {
      const username = localStorage.getItem("username");
      const res = await axios.post("/api/table", { username });
      setTableList(res.data.tableList);
    } catch {
      setError("Failed to fetch tables.");
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
    } catch {
      setError("Failed to create table.");
    }
  };

  const deleteTable = async (tableId: string) => {
    try {
      await axios.delete("/api/table", { data: { tableId } });
      setTableList((prev) => prev.filter((t) => t._id !== tableId));
    } catch {
      setError("Failed to delete table.");
    }
  };

  const connectToTable = (tableId: string) => {
    localStorage.setItem("tableId", tableId);
    router.push(`/${tableId}`);
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
  };
};
