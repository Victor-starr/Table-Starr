"use client";
import { pusherClient } from "@/lib/pusherClient";
import { Table, TableOrder } from "@/lib/types";
import { useEffect, useState } from "react";

export function useTablePusherEvents(
  tableId: string,
  fetchTableData: () => Promise<void>
) {
  const [tableData, setTableData] = useState<Table | null>(null);
  const [orderList, setOrderList] = useState<TableOrder[]>([]);

  const updateHistorytable = (
    username: string,
    action: string,
    timestamp: Date
  ) => {
    setTableData((prevTable) => {
      if (!prevTable) return prevTable;
      const history = prevTable.history || [];
      return {
        ...prevTable,
        history: [{ username, action, timestamp }, ...history],
      };
    });
  };

  useEffect(() => {
    const channel = pusherClient.subscribe(`table-${tableId}`);

    const handlerNewOrder = (data: { order: TableOrder }) => {
      setOrderList((prevOrders) => [...prevOrders, data.order]);
      updateHistorytable(
        data.order.username,
        `Added a new order: ${data.order.orderName}`,
        new Date(data.order.timestamp)
      );
    };

    const handlerOrderDeleted = (data: {
      username: string;
      order: TableOrder;
    }) => {
      setOrderList((prevOrders) =>
        prevOrders.filter((order) => order._id !== data.order._id)
      );
      updateHistorytable(
        data.order.username,
        `Deleted an order: ${data.order.orderName}`,
        new Date(data.order.timestamp)
      );
    };

    channel.bind("order-created", handlerNewOrder);
    channel.bind("order-deleted", handlerOrderDeleted);
    channel.bind("order-add", fetchTableData);
    channel.bind("table-user-order-deleted", fetchTableData);
    channel.bind("joined-user", fetchTableData);
    return () => {
      channel.unbind("order-created", handlerNewOrder);
      channel.unbind("order-deleted", handlerOrderDeleted);
      channel.unbind("order-add", fetchTableData);
      channel.unbind("table-user-order-deleted", fetchTableData);
      channel.unbind("joined-user", fetchTableData);
      pusherClient.unsubscribe(`table-${tableId}`);
    };
  }, [tableId, fetchTableData]);

  return {
    tableData,
    setTableData,
    orderList,
    setOrderList,
  };
}
