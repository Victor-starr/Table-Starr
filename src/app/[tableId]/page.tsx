"use client";
import { useParams } from "next/navigation";
import { Button, Card, Input } from "pixel-retroui";
import { IoSend, IoCaretDown, IoCaretUp } from "react-icons/io5";
import Nav from "@/components/_Nav";
import HistorySection from "@/components/HistorySection";
import useTableData from "@/hooks/useTableData";
import UserListSection from "@/components/UserListSection";
import OrderListSection from "@/components/OrderList.Section";
import { useState } from "react";
import { TableOrder, User } from "@/lib/types";
import axios from "axios";

export default function TablePage() {
  const { tableId } = useParams();
  const {
    username,
    tableData,
    orderList,
    historySection,
    userListSection,
    connectToTable,
    createOrder,
    toggleHistorySection,
    toggleUserListSection,
    fetchTableData, // Now available from useTableData
  } = useTableData({ tableId: tableId as string });

  const [activeOrder, setActiveOrder] = useState<TableOrder | null>(null);
  const [activeUser, setActiveUser] = useState<User | null>(null);
  const [assigning, setAssigning] = useState(false);
  const [toggleOrderList, setToggleOrderList] = useState(true);

  const handleUsernameSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const usernameInput = e.currentTarget.username.value;
    connectToTable(usernameInput);
  };

  const handleOrderSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const orderData = {
      orderName: formData.get("order") as string,
      price: formData.get("price") as string,
    };

    createOrder(orderData);
    form.reset();
  };

  // New: handle order click
  const handleOrderClick = (order: TableOrder) => {
    setActiveOrder(order);
  };

  // New: handle user click
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
        // handle error
      } finally {
        setAssigning(false);
        setActiveOrder(null);
        setActiveUser(null);
      }
    }
  };

  if (!username) {
    return (
      <>
        <h1 className="text-center">Set your Username ⭐</h1>
        <form
          onSubmit={handleUsernameSubmit}
          className="flex flex-col gap-4 py-5"
        >
          <Input
            placeholder="Enter your Username..."
            type="text"
            name="username"
            required
            className="w-full"
          />
          <div className="flex gap-2">
            <Button type="submit" className="flex-1">
              All Tables
            </Button>
          </div>
        </form>
      </>
    );
  }

  return (
    <section className="relative flex flex-col justify-start px-15 pt-30 pb-10 w-full h-full text-black">
      <Nav
        navigate="/tables-list"
        historyLogHandler={toggleHistorySection}
        userListHandler={toggleUserListSection}
      />

      <h3 className="text-primary text-center">
        {tableData ? (
          <>
            <span>{`${tableData.tableName.split("-")[0]}'s Table - `}</span>
            <span className="text-text">{` $${tableData.totalSpending}`}</span>
          </>
        ) : (
          "Loading..."
        )}
      </h3>
      <h2>Create Your Order</h2>
      <form className="flex flex-col gap-2 pb-5" onSubmit={handleOrderSubmit}>
        <div className="flex-1">
          <Input
            placeholder="Order your food here..."
            name="order"
            type="text"
            required
            className="w-full"
          />
        </div>
        <div className="flex flex-1 gap-2">
          <Input
            placeholder="$ 0.00.."
            name="price"
            type="number"
            required
            className="flex-1"
          />
          <Button
            type="submit"
            shadow="#999999"
            className="flex flex-1 justify-center items-center"
          >
            <IoSend className="size-5 text-center" />
          </Button>
        </div>
      </form>
      <Card>
        <div className="flex flex-row gap-2 mb-4">
          <h2>Created Orders</h2>
          <Button
            onClick={() => setToggleOrderList(!toggleOrderList)}
            className="flex justify-center items-center w-10"
          >
            {toggleOrderList ? (
              <IoCaretUp size={20} />
            ) : (
              <IoCaretDown size={20} />
            )}
          </Button>
        </div>

        {toggleOrderList && (
          <OrderListSection
            orderList={orderList}
            activeOrder={activeOrder}
            onOrderClick={handleOrderClick}
          />
        )}
      </Card>

      {historySection && tableData && <HistorySection tableData={tableData} />}
      {userListSection && tableData && (
        <UserListSection
          userList={tableData.usersList}
          onUserClick={handleUserClick}
          activeUser={activeUser}
        />
      )}
    </section>
  );
}
