import { Schema, model, models } from "mongoose";

const OrderSchema = new Schema({
  username: String,
  orderName: String,
  price: Number,
  timestamp: { type: Date, default: Date.now },
});

const UserSchema = new Schema({
  username: String,
  ordered: [OrderSchema],
  totalSpending: { type: Number, default: 0 },
});
const TableSchema = new Schema(
  {
    tableName: String,
    createdBy: String,
    orders: [OrderSchema],
    usersList: [UserSchema],
    history: [
      {
        username: String,
        action: String,
        timestamp: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

export const Table = models.Table || model("Table", TableSchema);
