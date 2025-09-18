const jwt = require('jsonwebtoken');
const JWT_SECRET = "super_secret_key";

function authMiddleware(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer token

    if (!token) {
        return res.status(401).json({ success: false, message: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // attach to request
        next();
    } catch (err) {
        return res.status(403).json({ success: false, message: "Invalid token" });
    }
}

module.exports = authMiddleware;
