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

  useEffect(() => {
    const channel = pusherClient.subscribe(`table-${tableId}`);

    const handlerNewOrder = (data: { order: TableOrder }) => {
      setOrderList((prevOrders) => [...prevOrders, data.order]);
    };
    const handlerOrderDeleted = (data: {
      username: string;
      orderId: string;
    }) => {
      setOrderList((prevOrders) =>
        prevOrders.filter((order) => order._id !== data.orderId)
      );
    };

    channel.bind("order-created", handlerNewOrder);
    channel.bind("order-deleted", handlerOrderDeleted);
    channel.bind("order-add", fetchTableData);
    return () => {
      channel.unbind("order-created", handlerNewOrder);
      channel.unbind("order-deleted", handlerOrderDeleted);
      channel.unbind("order-add", fetchTableData);
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
