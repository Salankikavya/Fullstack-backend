import express from "express";
import Cart from "../models/cart.js";
import { verifyUser } from "../middleware/authMiddleware.js";

const router = express.Router();

// ➕ Add product to cart
router.post("/add", verifyUser, async (req, res) => {
  try {
    const { userId, product } = req.body;

    let cart = await Cart.findOne({ userId });
    if (!cart) cart = new Cart({ userId, items: [] });

    const existingItem = cart.items.find(
      (item) => item.productId === product.productId
    );

    if (existingItem) {
      existingItem.quantity += product.quantity || 1;
    } else {
      cart.items.push(product);
    }

    await cart.save();
    res.json({ message: "Item added to cart", cart });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ❌ Remove product
router.post("/remove", verifyUser, async (req, res) => {
  try {
    const { userId, productId } = req.body;
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter((i) => i.productId !== productId);
    await cart.save();
    res.json({ message: "Item removed", cart });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 👀 View cart
router.get("/:userId", verifyUser, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    if (!cart) return res.json({ message: "Cart is empty" });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
