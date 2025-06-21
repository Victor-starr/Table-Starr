import { useRouter } from "next/navigation";
import { Button } from "pixel-retroui";
import { IoMdClose } from "react-icons/io";
import { FaHistory, FaShare, FaUser } from "react-icons/fa";
import { LuLoaderPinwheel } from "react-icons/lu";
import { useContext } from "react";
import { NotificationContext } from "@/context/NotificationContext";
interface NavProps {
  navigate: string;
  wheelPage?: string;
  historyLogHandler?: () => void;
  userListHandler?: () => void;
}

const Nav = ({
  navigate,
  historyLogHandler,
  userListHandler,
  wheelPage,
}: NavProps) => {
  const router = useRouter();
  const { showNotification } = useContext(NotificationContext);

  const returnHomePage = () => {
    switch (navigate) {
      case "/":
        localStorage.removeItem("username");
        localStorage.removeItem("tableId");
        break;
      case "/tables-list":
        localStorage.removeItem("tableId");
        break;
    }
    router.push(navigate);
  };

  const shareTableLink = () => {
    const url = window.location.href;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        showNotification({
          message: "Table link copied to clipboard!",
          status: NaN,
        });
      })
      .catch((err) => {
        console.error("Failed to copy table link: ", err);
      });
  };

  return (
    <nav className="top-0 left-0 z-10 fixed flex flex-row justify-between items-center bg-secondary shadow-md p-4 w-full">
      <Button
        onClick={returnHomePage}
        bg="#ff595e"
        textColor="white"
        borderColor="black"
        shadow="#9b2727"
      >
        <IoMdClose className="size-7 cursor-pointer" />
      </Button>
      <span>
        {userListHandler && (
          <Button
            onClick={userListHandler}
            bg="#6c47d1"
            textColor="#ffffff"
            borderColor="#000000"
            shadow="#4900b8"
          >
            <FaUser className="size-7 cursor-pointer" />
          </Button>
        )}

        {/* {historyLogHandler && ( */}
        <Button
          onClick={historyLogHandler}
          bg="#ffca3a"
          textColor="white"
          borderColor="black"
          shadow="#a83b00"
        >
          <FaHistory className="size-7 cursor-pointer" />
        </Button>
        {/* )} */}
        {wheelPage && (
          <Button
            onClick={() => {
              router.push(wheelPage);
            }}
            bg="#ff9500"
            textColor="#ffffff"
            borderColor="#000000"
            shadow="#9e5c00"
          >
            <LuLoaderPinwheel className="size-7 cursor-pointer" />
          </Button>
        )}
        <Button
          onClick={shareTableLink}
          bg="#007bff"
          textColor="#ffffff"
          borderColor="#000000"
          shadow="#0210cf"
        >
          <FaShare className="size-7 cursor-pointer" />
        </Button>
      </span>
    </nav>
  );
};

export default Nav;
