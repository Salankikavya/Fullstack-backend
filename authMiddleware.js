import jwt from "jsonwebtoken";

export const verifyUser = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        // Check if header exists and starts with "Bearer "
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ error: "No token provided" });
        }

        // Extract the actual token
        const token = authHeader.split(" ")[1];

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach user info to request
        req.user = decoded;
        next();
    } catch (err) {
        console.error("JWT Error:", err.message);

        if (err.name === "TokenExpiredError") {
            return res.status(401).json({ error: "Token expired" });
        } else if (err.name === "JsonWebTokenError") {
            return res.status(401).json({ error: "Invalid token" });
        } else {
            return res.status(500).json({ error: "Server error verifying token" });
        }
    }
};
