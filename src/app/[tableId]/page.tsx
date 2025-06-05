"use client";
import { useParams } from "next/navigation";
import { Button, Input } from "pixel-retroui";
import { IoSend } from "react-icons/io5";
import Nav from "@/components/_Nav";
import HistorySection from "@/components/HistorySection";
import useTableData from "@/hooks/useTableData";

export default function TablePage() {
  const { tableId } = useParams();
  const {
    username,
    tableData,
    orderList,
    historySection,
    connectToTable,
    createOrder,
    toggleHistorySection,
  } = useTableData({ tableId: tableId as string });

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
    <section className="relative flex flex-col justify-center px-15 py-10 w-full h-full text-black">
      <Nav navigate="/tables-list" historyLogHandler={toggleHistorySection} />
      <h2 className="text-center">
        {tableData?.tableName.split("-")[0]}`s Table
      </h2>
      <form className="flex flex-col gap-2 py-5" onSubmit={handleOrderSubmit}>
        <div className="flex-1">
          <label className="text-sm" htmlFor="order">
            Order Name
          </label>
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
      {orderList.length > 0 ? (
        <ul>
          {orderList.map((order, i) => (
            <li
              key={i}
              className="flex justify-between items-center p-2 border-b"
            >
              <span>{order.orderName}</span>
              <span>${order.price}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center">No orders yet.</p>
      )}

      {historySection && tableData && <HistorySection tableData={tableData} />}
    </section>
  );
}
