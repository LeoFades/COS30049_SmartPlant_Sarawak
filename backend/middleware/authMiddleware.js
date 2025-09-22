const jwt = require('jsonwebtoken');
const JWT_SECRET = "super_secret_key";

function authMiddleware(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer token

    console.log('Auth middleware - Authorization header:', authHeader);
    console.log('Auth middleware - Extracted token:', token ? 'Token present' : 'No token');

    if (!token) {
        console.log('Auth middleware - No token provided');
        return res.status(401).json({ success: false, message: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log('Auth middleware - Token decoded successfully:', decoded);
        req.user = decoded; // attach to request
        next();
    } catch (err) {
        console.log('Auth middleware - Token verification failed:', err.message);
        return res.status(403).json({ success: false, message: "Invalid token" });
    }
}

module.exports = authMiddleware;
