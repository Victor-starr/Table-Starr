import { Schema, model, models } from "mongoose";

const OrderSchema = new Schema({
  username: String,
  orderName: String,
  price: Number,
  timestamp: { type: Date, default: Date.now },
});

const TableSchema = new Schema({
  tableName: String,
  createdBy: String,
  orders: [OrderSchema],
  usersList: [String],
  history: [
    {
      username: String,
      action: String,
      timestamp: { type: Date, default: Date.now },
    },
  ],
});

export const Table = models.Table || model("Table", TableSchema);
