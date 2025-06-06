import { TableOrder } from "@/lib/types";
import { Card } from "pixel-retroui";

interface OrderListSectionProps {
  orderList: TableOrder[];
}

function OrderListSection({ orderList }: OrderListSectionProps) {
  return (
    <>
      {orderList.length > 0 ? (
        <ul className="flex flex-col gap-2">
          {orderList.map((order, i) => (
            <Card key={i} className="flex justify-between items-center">
              <span>{order.orderName}</span>
              <span>${order.price}</span>
            </Card>
          ))}
        </ul>
      ) : (
        <p className="text-center">No orders yet.</p>
      )}
    </>
  );
}

export default OrderListSection;
