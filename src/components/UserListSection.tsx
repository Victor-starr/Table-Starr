import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
} from "pixel-retroui";
import { User } from "@/lib/types";
import { useTableContext } from "@/context/TableContext";
import { FaTrashAlt } from "react-icons/fa";
import { FaUserAltSlash } from "react-icons/fa";

interface UserListSectionProps {
  onUserClick: (user: User) => void;

  activeUser: User | null;
  isOwner?: boolean;
  onDeleteOrderFromUser: (username: string, orderId: string) => void;
  onDeleteUserFromTable: (
    requestingUsername: string,
    targetUsername: string,
    tableId: string
  ) => void;
}
function UserListSection({
  onUserClick,
  activeUser,
  isOwner,
  onDeleteOrderFromUser,
  onDeleteUserFromTable,
}: UserListSectionProps) {
  const { tableData } = useTableContext();

  if (!tableData) {
    return (
      <div className="mt-4">
        <h2 className="mb-4">User List</h2>
        <p>Loading users...</p>
      </div>
    );
  }

  const uniqueUsers = tableData.usersList.filter(
    (user, index, self) =>
      index === self.findIndex((u) => u.username === user.username)
  );
  return (
    <div className="mt-4">
      <h2 className="mb-4">User List</h2>
      <Accordion>
        {uniqueUsers.map((user, i) => (
          <AccordionItem key={i} value={`user-${i}`}>
            <AccordionTrigger>
              <p
                className={`cursor-pointer px-5 py-2 ${
                  activeUser && activeUser.username === user.username
                    ? "bg-secondary text-white"
                    : ""
                }`}
                onClick={() => onUserClick && onUserClick(user)}
              >
                {user.username} - {user.totalSpending}$
              </p>
              {isOwner && user.username !== tableData.createdBy && (
                <Button
                  bg="red"
                  textColor="white"
                  className="flex justify-center items-center ml-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteUserFromTable(
                      tableData.createdBy,
                      user.username,
                      tableData._id
                    );
                  }}
                >
                  <FaUserAltSlash />
                </Button>
              )}
            </AccordionTrigger>
            <AccordionContent>
              {user.ordered.length > 0 ? (
                <ul className="max-h-70 overflow-y-scroll cursor-pointer">
                  {user.ordered.map((order, j) => (
                    <li
                      key={j}
                      className="flex justify-between items-center px-4 py-3 borderBottom"
                    >
                      <span>
                        {order.orderName} - ${order.price}
                      </span>
                      <Button
                        bg="red"
                        textColor="white"
                        className="flex justify-center items-center"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteOrderFromUser(user.username, order._id);
                        }}
                      >
                        <FaTrashAlt className="text-lg" />
                      </Button>
                    </li>
                  ))}
                </ul>
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
