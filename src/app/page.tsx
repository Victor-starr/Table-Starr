"use client";
import { Input, Button } from "pixel-retroui";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function HomeCreate() {
  const router = useRouter();
  const [username, setUsername] = useState<string>("");
  const tableConnectionHandler = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    localStorage.setItem("username", username);
    router.push("/tables-list");
  };

  return (
    <>
      <h1 className="text-center">Table Starr ⭐</h1>
      <form
        onSubmit={tableConnectionHandler}
        className="flex flex-col gap-4 py-5"
      >
        <Input
          placeholder="Enter your username..."
          name="username"
          required
          className="w-full"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
