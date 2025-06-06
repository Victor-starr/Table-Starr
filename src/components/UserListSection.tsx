import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "pixel-retroui";
import { User } from "@/lib/types";
interface UserListSectionProps {
  userList: User[];
}
function UserListSection({ userList }: UserListSectionProps) {
  return (
    <div className="mt-4">
      <h2 className="mb-4">User List</h2>
      <Accordion>
        {userList.map((user, i) => (
          <AccordionItem key={i} value={`user-${i}`}>
            <AccordionTrigger>
              <p>
                {user.username} - {user.totalSpending}$
              </p>
            </AccordionTrigger>
            <AccordionContent>
              {user.ordered.length > 0 ? (
                user.ordered.map((order, j) => (
                  <li
                    key={j}
                    className="flex justify-between py-3 borderBottom"
                  >
                    <span>{order.orderName}</span>
                    <span>${order.price}</span>
                  </li>
                ))
              ) : (
                <p className="text-center">No orders yet.</p>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

export default UserListSection;
