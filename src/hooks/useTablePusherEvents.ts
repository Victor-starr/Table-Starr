"use client";
import { pusherClient } from "@/lib/pusherClient";
import { useEffect, useCallback } from "react";
import { TableOrder, User, HistoryEntry } from "@/lib/types";
import { useTableContext } from "@/context/TableContext";

export function useTablePusherEvents(
  tableId: string,
  fetchTableData: () => Promise<void>
) {
  const { tableData, setTableData, orderList, setOrderList } =
    useTableContext();

  const updateHistorytable = useCallback(
    (username: string, action: string, timestamp: Date) => {
      setTableData((prevTable) => {
        if (!prevTable) return prevTable;
        const history = prevTable.history || [];
        return {
          ...prevTable,
          history: [{ username, action, timestamp }, ...history],
        };
      });
    },
    [setTableData]
  );

  useEffect(() => {
    const channel = pusherClient.subscribe(`table-${tableId}`);

    const handlerNewOrder = (data: {
      order: TableOrder;
      historyEntry: HistoryEntry;
    }) => {
      setOrderList((prevOrders) => [...prevOrders, data.order]);
      updateHistorytable(
        data.historyEntry.username,
        data.historyEntry.action,
        new Date(data.historyEntry.timestamp)
      );
    };

    const handlerOrderDeleted = (data: {
      username: string;
      order: TableOrder;
      historyEntry: HistoryEntry;
    }) => {
      setOrderList((prevOrders) =>
        prevOrders.filter((order) => order._id !== data.order._id)
      );
      updateHistorytable(
        data.historyEntry.username,
        data.historyEntry.action,
        new Date(data.historyEntry.timestamp)
      );
    };

    const handlerOrderAdd = (data: {
      user: User;
      username: string;
      historyEntry: HistoryEntry;
    }) => {
      setTableData((prevTable) => {
        if (!prevTable) return prevTable;
        const updatedUsersList = prevTable.usersList.map((user) =>
          user.username === data.username ? data.user : user
        );
        return {
          ...prevTable,
          usersList: updatedUsersList,
        };
      });
      updateHistorytable(
        data.historyEntry.username,
        data.historyEntry.action,
        new Date(data.historyEntry.timestamp)
      );
    };

    const handlerUserOrderDeleted = (data: {
      user: User;
      username: string;
      historyEntry: HistoryEntry;
    }) => {
      setTableData((prevTable) => {
        if (!prevTable) return prevTable;
        const updatedUsersList = prevTable.usersList.map((user) =>
          user.username === data.username ? data.user : user
        );
        return {
          ...prevTable,
          usersList: updatedUsersList,
        };
      });
      updateHistorytable(
        data.historyEntry.username,
        data.historyEntry.action,
        new Date(data.historyEntry.timestamp)
      );
    };

    const handlerUserJoined = (data: {
      historyEntry: HistoryEntry;
      usersList: User[];
    }) => {
      updateHistorytable(
        data.historyEntry.username,
        data.historyEntry.action,
        new Date(data.historyEntry.timestamp)
      );

      setTableData((prevTable) => {
        if (!prevTable) return prevTable;
        return {
          ...prevTable,
          usersList: data.usersList,
        };
      });
    };

    const handlerWheelChallengeResult = (data: {
      historyEntry: HistoryEntry;
      history: HistoryEntry[];
    }) => {
      updateHistorytable(
        data.historyEntry.username,
        data.historyEntry.action,
        new Date(data.historyEntry.timestamp)
      );
    };
    channel.bind("order-created", handlerNewOrder);
    channel.bind("order-deleted", handlerOrderDeleted);
    channel.bind("order-add", handlerOrderAdd);
    channel.bind("table-user-order-deleted", handlerUserOrderDeleted);
    channel.bind("user-joined", handlerUserJoined);
    channel.bind("wheel-challenge-result", handlerWheelChallengeResult);

    return () => {
      channel.unbind("order-created", handlerNewOrder);
      channel.unbind("order-deleted", handlerOrderDeleted);
      channel.unbind("order-add", handlerOrderAdd);
      channel.unbind("table-user-order-deleted", handlerUserOrderDeleted);
      channel.unbind("user-joined", handlerUserJoined);
      channel.unbind("wheel-challenge-result", handlerWheelChallengeResult);
      pusherClient.unsubscribe(`table-${tableId}`);
    };
  }, [tableId, fetchTableData, setOrderList, setTableData, updateHistorytable]);

  return {
    tableData,
    setTableData,
    orderList,
    setOrderList,
  };
}
