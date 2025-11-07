import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
const router = express.Router();
router.post("/signup", async (req, res) => { try { const user = new User(req.body); await user.save(); res.json({ message: "User registered successfully" }); } catch (err) { res.status(400).json({ error: err.message }); } });
router.post("/login", async (req, res) => { const { email, password } = req.body; const user = await User.findOne({ email }); if (!user) return res.status(404).json({ error: "User not found" }); const isMatch = await bcrypt.compare(password, user.password); if (!isMatch) return res.status(400).json({ error: "Invalid credentials" }); const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET); res.json({ token }); });
export default router;