import express from "express";
import Product from "../models/Product.js";
import { verifyAdmin } from "../middleware/authMiddleware.js";
const router = express.Router();
router.get("/", async (req, res) => { const products = await Product.find(); res.json(products); });
router.post("/", verifyAdmin, async (req, res) => { const product = new Product(req.body); await product.save(); res.json({ message: "Product added successfully!" }); });
router.put("/:id", verifyAdmin, async (req, res) => { const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true }); res.json(updated); });
router.delete("/:id", verifyAdmin, async (req, res) => { await Product.findByIdAndDelete(req.params.id); res.json({ message: "Product deleted" }); });
export default router;