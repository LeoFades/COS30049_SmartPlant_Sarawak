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
            console.log('Login attempt for email:', email);
            
            const user = await User.findByEmail(email);
            console.log('User found in database:', user ? { user_id: user.user_id, name: user.name, email: user.email } : 'No user found');

            if (!user) {
                console.log('Login failed: User not found');
                return res.status(400).json({ success: false, message: "Invalid credentials" });
            }

            const match = await bcrypt.compare(password, user.password);
            console.log('Password match:', match);
            
            if (!match) {
                console.log('Login failed: Invalid password');
                return res.status(400).json({ success: false, message: "Invalid credentials" });
            }

            const tokenPayload = { id: user.user_id, email: user.email };
            console.log('Creating JWT token with payload:', tokenPayload);
            
            const token = jwt.sign(
                tokenPayload,
                JWT_SECRET,
                { expiresIn: "1d" }
            );

            console.log('Login successful, token generated');
            res.json({ success: true, token });
        } catch (error) {
            console.error('Login error:', error);
            res.status(500).json({ success: false, message: "Error logging in" });
        }
    }

    static async profile(req, res) {
        res.json({ success: true, data: req.user }); // comes from auth middleware
    }
}

module.exports = UserController;
