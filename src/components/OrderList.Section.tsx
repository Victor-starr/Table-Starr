import { TableOrder } from "@/lib/types";
import { Button, Card } from "pixel-retroui";
import { FaTrashAlt } from "react-icons/fa";

interface OrderListSectionProps {
  orderList: TableOrder[];
  activeOrder: TableOrder | null;
  onOrderClick: (order: TableOrder) => void;
  onOrderDelete: (order: TableOrder) => void;
}

function OrderListSection({
  orderList,
  activeOrder,
  onOrderClick,
  onOrderDelete,
}: OrderListSectionProps) {
  return (
    <>
      {orderList.length > 0 ? (
        <ul className="flex flex-col gap-2">
          {orderList.map((order, i) => (
            <li
              key={i}
              onClick={() => onOrderClick(order)}
              className={`cursor-pointer ${
                activeOrder && activeOrder === order ? " bg-primary" : ""
              }`}
            >
              <Card className="flex justify-between items-center">
                <span>{order.orderName}</span>
                <span>${order.price}</span>
                <Button
                  bg="red"
                  textColor="white"
                  className="flex justify-center items-center"
                  onClick={() => onOrderDelete(order)}
                >
                  <FaTrashAlt className="text-lg" />
                </Button>
              </Card>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center">No orders yet.</p>
      )}
    </>
  );
}

export default OrderListSection;
