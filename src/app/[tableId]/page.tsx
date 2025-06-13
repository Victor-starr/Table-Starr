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
import useOrder from "@/hooks/useOrder";
import DeleteComfirm from "@/components/DeleteConfirm";
import { TableOrder } from "@/lib/types";

type deleteTargetType =
  | {
      type: "order";
      order: TableOrder;
    }
  | {
      type: "userOrder";
      username: string;
      orderId: string;
    };
export default function TablePage() {
  const [toggleOrderList, setToggleOrderList] = useState(true);
  const [historySection, setHistorySection] = useState<boolean>(false);
  const [userListSection, setUserListSection] = useState<boolean>(false);
  const [deleteConfirm, setDeleteConfirm] = useState<boolean>(false);
  const [deleteTarget, setDeleteTarget] = useState<deleteTargetType | null>(
    null
  );
  const { tableId } = useParams();
  const {
    loading,
    error,
    username,
    tableData,
    orderList,
    fetchTableData,
    handleUsernameSubmit,
    handleDeleteOrderFromUser,
  } = useTableData({
    tableId: tableId as string,
  });

  const {
    handleOrderClick,
    handleUserClick,
    activeOrder,
    activeUser,
    handleOrderSubmit,
    handleOrderDelete,
  } = useOrder({
    tableId: tableId as string,
    username: username as string,
    fetchTableData,
  });

  const toggleHistorySection = () => {
    setHistorySection((prev) => !prev);
    setUserListSection(false);
  };
  const toggleUserListSection = () => {
    setUserListSection((prev) => !prev);
    setHistorySection(false);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    if (deleteTarget.type === "order") {
      await handleOrderDelete(deleteTarget.order);
    } else if (deleteTarget.type === "userOrder") {
      await handleDeleteOrderFromUser(
        deleteTarget.username,
        deleteTarget.orderId
      );
    }
    setDeleteConfirm(false);
    setDeleteTarget(null);
  };

  if (!username) {
    return (
      <>
        <h1 className="text-center">Set your Username ⭐</h1>
        <form
          onSubmit={handleUsernameSubmit}
          className="flex flex-col gap-4 my-15"
        >
          <Input
            placeholder="Enter your Username..."
            type="text"
            name="username"
            required
            className="w-full"
            maxLength={14}
          />
          <div className="flex gap-2">
            <Button
              type="submit"
              className="flex-1"
              disabled={loading}
              bg={loading ? "#ccc" : "#6a4c93"}
              textColor="white"
            >
              All Tables
            </Button>
          </div>
        </form>
        {error && <p className="text-red-500">{error}</p>}
      </>
    );
  }

  return (
    <section className="relative flex flex-col justify-start items-center px-15 w-full h-full text-black">
      <Nav
        navigate="/tables-list"
        historyLogHandler={toggleHistorySection}
        userListHandler={toggleUserListSection}
        // DISABLED WHEEL PAGE FOR NOW
        // wheelPage={`/${tableId}/wheel`}
      />
      {deleteConfirm && (
        <DeleteComfirm
          onCancel={() => {
            setDeleteConfirm(false);
            setDeleteTarget(null);
          }}
          onDelete={handleDeleteConfirm}
        />
      )}
      <h3 className="mt-custom-28 text-primary text-center">
        {tableData ? (
          <>
            <span>{`${tableData.tableName.split("-")[0]}'s Table - `}</span>
            <span className="text-text">{` $${tableData.totalSpending}`}</span>
          </>
        ) : (
          "Loading..."
        )}
      </h3>
      {!historySection ? (
        <>
          <h2>Create Your Order</h2>
          <form
            className="flex flex-col gap-2 pb-5"
            onSubmit={(e) => handleOrderSubmit(e, username as string)}
          >
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
                shadow={loading ? "#454545" : "#002594"}
                disabled={loading}
                bg={loading ? "#dedede" : "#1982c4"}
                textColor={loading ? "#383838" : "white"}
                className="flex flex-1 justify-center items-center"
              >
                {loading ? (
                  <span>Creating...</span>
                ) : (
                  <IoSend className="size-5 text-center" />
                )}
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
                // Instead of calling handleOrderDelete directly, open confirm dialog
                onOrderDelete={(order) => {
                  setDeleteTarget({ type: "order", order });
                  setDeleteConfirm(true);
                }}
              />
            )}
          </Card>
        </>
      ) : (
        tableData && <HistorySection tableData={tableData} />
      )}

      {userListSection && tableData && (
        <UserListSection
          userList={tableData.usersList}
          onUserClick={handleUserClick}
          activeUser={activeUser}
          // Instead of calling handleDeleteOrderFromUser directly, open confirm dialog
          onDeleteOrderFromUser={(username, orderId) => {
            setDeleteTarget({ type: "userOrder", username, orderId });
            setDeleteConfirm(true);
          }}
        />
      )}
    </section>
  );
}
