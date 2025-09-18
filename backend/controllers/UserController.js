const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = "super_secret_key"; // ⚠️ keep in .env file

class UserController {
    static async register(req, res) {
        try {
            const { name, email, password } = req.body;

            const existing = await User.findByEmail(email);
            if (existing) {
                return res.status(400).json({ success: false, message: "Email already in use" });
            }

            const [newUser] = await User.create({ name, email, password });

            res.status(201).json({ success: true, data: newUser });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: "Error registering user" });
        }
    }

    static async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await User.findByEmail(email);

            if (!user) {
                return res.status(400).json({ success: false, message: "Invalid credentials" });
            }

            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                return res.status(400).json({ success: false, message: "Invalid credentials" });
            }

            const token = jwt.sign(
                { id: user.user_id, email: user.email },
                JWT_SECRET,
                { expiresIn: "1d" }
            );

            res.json({ success: true, token });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: "Error logging in" });
        }
    }

    static async profile(req, res) {
        res.json({ success: true, data: req.user }); // comes from auth middleware
    }
}

module.exports = UserController;
