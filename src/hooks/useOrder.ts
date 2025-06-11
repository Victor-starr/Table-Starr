"use client";
import { NotificationContext } from "@/context/NotificationContext";
import { TableOrder, User, ServerErrorMessage } from "@/lib/types";
import axios from "axios";
import { useContext, useState } from "react";
import { useUserExp } from "./useUserExp";

interface UseOrderProps {
  tableId: string;
  username: string;
  fetchTableData: () => Promise<void>;
}

export default function useOrder({
  tableId,
  username,
  fetchTableData,
}: UseOrderProps) {
  const [activeOrder, setActiveOrder] = useState<TableOrder | null>(null);
  const [activeUser, setActiveUser] = useState<User | null>(null);
  const [assigning, setAssigning] = useState(false);
  const { showNotification } = useContext(NotificationContext);
  const { startLoading, stopLoading, setErrorMessage, loading, error } =
    useUserExp();

  const handleOrderClick = (order: TableOrder) => {
    setActiveOrder(order);
  };
  const handleUserClick = async (user: User) => {
    setActiveUser(user);
    if (activeOrder && !assigning) {
      setAssigning(true);
      try {
        startLoading();
        const res = await axios.post("/api/order/add", {
          username: user.username,
          tableId,
          orderData: activeOrder,
        });
        fetchTableData();
        showNotification(res);
      } catch (error) {
        setErrorMessage((error as ServerErrorMessage).data.error);
        showNotification(error as ServerErrorMessage);
      } finally {
        stopLoading();
        setAssigning(false);
        setActiveOrder(null);
        setActiveUser(null);
      }
    }
  };
  const createOrder = async (
    orderData: {
      orderName: string;
      price: string;
    },
    username: string
  ) => {
    try {
      startLoading();
      const res = await axios.post("/api/order/create", {
        username,
        tableId,
        orderData,
      });
      fetchTableData();
      showNotification(res);
    } catch (error) {
      setErrorMessage((error as ServerErrorMessage).data.error);
      showNotification(error as ServerErrorMessage);
    } finally {
      stopLoading();
    }
  };
  const handleOrderSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    username: string
  ) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const orderData = {
      orderName: formData.get("order") as string,
      price: formData.get("price") as string,
    };
    createOrder(orderData, username);
    form.reset();
  };

  const clearActiveOrder = () => setActiveOrder(null);

  const handleOrderDelete = async (order: TableOrder) => {
    const orderId = order._id;
    try {
      const res = await axios.delete("/api/order/delete", {
        data: {
          username,
          tableId: tableId as string,
          orderId: orderId,
        },
      });
      showNotification(res);
      clearActiveOrder();
    } catch (error) {
      showNotification(error as ServerErrorMessage);
    }
  };

  return {
    loading,
    error,
    handleOrderClick,
    handleUserClick,
    createOrder,
    activeOrder,
    activeUser,
    handleOrderSubmit,
    handleOrderDelete,
  };
}
