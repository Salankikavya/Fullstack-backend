import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: String,
    items: [
      {
        productId: String,
        name: String,
        price: Number,
        quantity: Number,
      },
    ],
    total: Number,
    status: { type: String, default: "Placed" },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
