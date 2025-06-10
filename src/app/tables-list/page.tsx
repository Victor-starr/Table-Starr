"use client";
import { useTableList } from "@/hooks/useTableList";
import { RequireGuest } from "@/guards/Guards";
import Nav from "@/components/_Nav";
import { Button, Card, Input } from "pixel-retroui";
import { FaPlus, FaTrashAlt } from "react-icons/fa";
import React from "react";

export default function TableList() {
  const {
    tableList,
    loading,
    error,
    deleteTable,
    connectToTable,
    handleCreateTable,
  } = useTableList();

  return (
    <RequireGuest>
      <section className="relative flex flex-col justify-center px-5 py-15 w-full h-full text-black">
        <Nav navigate="/" />
        <h2 className="text-center">Create Your Table</h2>

        <form
          onSubmit={(e) => handleCreateTable(e)}
          className="flex flex-row gap-4 my-5 h-15"
        >
          <Input
            className="flex-5 mx-0 text-md"
            type="text"
            placeholder="Table Name..."
            name="tableName"
            required
          />
          <Button
            type="submit"
            bg={loading ? "rgba(0, 0, 0, 0.204)" : "#1982c4"}
            textColor="white"
            disabled={loading}
            className="flex flex-1 justify-center items-center mx-0"
          >
            <FaPlus className="text-3xl" />
          </Button>
        </form>

        {error && <p className="text-red-500">{error}</p>}

        {loading ? (
          <p>Loading tables...</p>
        ) : (
          <>
            {tableList.length > 0 ? (
              <div className="flex flex-col gap-4">
                {tableList.map((table) => (
                  <div
                    key={table._id}
                    className="cursor-pointer"
                    onClick={() => connectToTable(table._id)}
                  >
                    <Card className="flex flex-row justify-center items-center gap-2">
                      <div className="px-2">
                        <h4>{table.tableName}</h4>
                        <p className="text-gray-500 text-sm">
                          {table.createdBy}
                        </p>
                      </div>
                      <Button
                        bg="red"
                        textColor="white"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteTable(table._id);
                        }}
                        className="flex justify-center items-center mx-2"
                      >
                        <FaTrashAlt className="text-3xl" />
                      </Button>
                    </Card>
                  </div>
                ))}
              </div>
            ) : (
              <p>No tables found. Please create one.</p>
            )}
          </>
        )}
      </section>
    </RequireGuest>
  );
}
