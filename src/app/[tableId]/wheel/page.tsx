"use client";
import WheelSection from "@/components/WheelSection";
import Nav from "@/components/_Nav";
import useTableData from "@/hooks/useTableData";
import { User } from "@/lib/types";
import { useParams } from "next/navigation";
import { Button, Card } from "pixel-retroui";
import { useState } from "react";
import HistorySection from "@/components/HistorySection";

export default function TableWheelPage() {
  const { tableId } = useParams();
  const [userWinner, setWinner] = useState<User | null>(null);
  const { tableData, loading } = useTableData({
    tableId: tableId as string,
  });
  const [isSpinning, setIsSpinning] = useState(false);
  const [displayedUser, setDisplayedUser] = useState<User | null>(null);
  const [showHistoryList, setShowHistoryList] = useState(false);

  const pickRandomUser = () => {
    if (!tableData || tableData.usersList.length === 0) {
      setWinner(null);
      setDisplayedUser(null);
      return;
    }

    setIsSpinning(true);
    setWinner(null);

    const spinDuration = 2000;
    const intervalTime = 80;
    const users = tableData.usersList;
    let elapsed = 0;

    const interval = setInterval(() => {
      const randomUser = users[Math.floor(Math.random() * users.length)];
      setDisplayedUser(randomUser);
      elapsed += intervalTime;
      if (elapsed >= spinDuration) {
        clearInterval(interval);
        const winner = users[Math.floor(Math.random() * users.length)];
        setWinner(winner);
        setDisplayedUser(winner);
        setIsSpinning(false);
      }
    }, intervalTime);
  };

  if (loading || !tableData) {
    return <WheelLoadingPage />;
  }

  return (
    <section className="relative flex flex-col items-center px-15 w-full h-full text-black">
      <Nav
        navigate={`/${tableId}`}
        historyLogHandler={() => setShowHistoryList((prev) => !prev)}
      />
      <h3 className="mt-custom-28 text-primary">Wheel of Fortune</h3>
      <h5 className="w-full text-thirdary">The User Who is spinning</h5>
      <Card
        className="flex flex-row justify-between items-center gap-4 w-full"
        bg="#70d4ff"
        borderColor="#000000"
        shadowColor="#006eff"
      >
        <h2 className="flex-1 font-bold text-secondary text-2xl text-left truncate">
          {isSpinning
            ? displayedUser?.username || "Spinning..."
            : userWinner
            ? userWinner.username
            : "Spin ->"}
        </h2>
        <Button
          onClick={pickRandomUser}
          disabled={isSpinning}
          className="flex-shrink-0 w-25"
          bg="#5165f5"
          textColor="#ffffff"
          borderColor="#000ecc"
          shadow="#009e8c"
        >
          {isSpinning ? "Spinning..." : "Click"}
        </Button>
      </Card>
      {showHistoryList ? (
        <HistorySection />
      ) : (
        <WheelSection userWinner={userWinner?.username || ""} />
      )}
    </section>
  );
}

const WheelLoadingPage = () => {
  return (
    <section className="flex flex-col justify-center items-center w-full h-full text-black text-center">
      <h1 className="w-full text-thirdary">Loading...</h1>
    </section>
  );
};
