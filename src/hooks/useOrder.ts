"use client";
import { TableOrder, User } from "@/lib/types";
import axios from "axios";
import { useState } from "react";

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

  const handleOrderClick = (order: TableOrder) => {
    setActiveOrder(order);
  };
  const handleUserClick = async (user: User) => {
    setActiveUser(user);
    if (activeOrder && !assigning) {
      setAssigning(true);
      try {
        await axios.post("/api/order/add", {
          username: user.username,
          tableId,
          orderData: activeOrder,
        });
        fetchTableData();
      } catch {
        console.error("Error assigning order to user");
      } finally {
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
      await axios.post("/api/order/create", {
        username,
        tableId,
        orderData,
      });
      fetchTableData();
    } catch (error) {
      console.error("Error creating order:", error);
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
      await axios.delete("/api/order/delete", {
        data: {
          username,
          tableId: tableId as string,
          orderId: orderId,
        },
      });
      fetchTableData();
      clearActiveOrder();
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  return {
    handleOrderClick,
    handleUserClick,
    createOrder,
    activeOrder,
    activeUser,
    handleOrderSubmit,
    handleOrderDelete,
  };
}
