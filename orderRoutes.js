import express from "express";
import Order from "../models/Order.js";
import Cart from "../models/cart.js";
import { verifyUser } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/checkout", verifyUser, async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await Cart.findOne({ userId });
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const total = cart.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const order = new Order({
      userId,
      items: cart.items,
      total,
      status: "Placed",
    });

    await order.save();
    await Cart.findOneAndDelete({ userId });

    res.json({
      message: "Order placed successfully!",
      orderId: order._id,
      total,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/my-orders", verifyUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await Order.find({ userId });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
