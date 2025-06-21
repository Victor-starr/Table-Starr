"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { Table, TableOrder } from "@/lib/types";

interface TableContextType {
  tableData: Table | null;
  setTableData: React.Dispatch<React.SetStateAction<Table | null>>;
  orderList: TableOrder[];
  setOrderList: React.Dispatch<React.SetStateAction<TableOrder[]>>;
}

const TableContext = createContext<TableContextType | undefined>(undefined);

export const TableProvider = ({ children }: { children: ReactNode }) => {
  const [tableData, setTableData] = useState<Table | null>(null);
  const [orderList, setOrderList] = useState<TableOrder[]>([]);

  return (
    <TableContext.Provider
      value={{ tableData, setTableData, orderList, setOrderList }}
    >
      {children}
    </TableContext.Provider>
  );
};

export const useTableContext = () => {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error("useTableContext must be used within a TableProvider");
  }
  return context;
};
