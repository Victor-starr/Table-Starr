"use client";

import axios from "axios";

export default function Home() {
  const handleCreateTable = async () => {
    const tableData = {
      createdBy: "Victor",
    };
    try {
      const res = await axios.post("/api/table/create", tableData);
      console.log("table created successfully:", res.data.tableList);
    } catch (error) {
      console.error("Error creating table:", error);
      alert("Failed to create table. Please try again.");
    }
  };
  return (
    <main className="flex flex-col justify-between items-center p-24 min-h-screen">
      <h1 className="mb-4 font-bold text-4xl">Welcome to Table Starr</h1>
      <p className="mb-8 text-lg">
        An application that allows users to keep track of their orders and how
        the bill should be split.
      </p>
      <button
        onClick={handleCreateTable}
        className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded text-white transition"
      >
        Create Table
      </button>
    </main>
  );
}
