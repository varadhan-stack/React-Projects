import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Register User: POST /api/user/register
export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validation
        if (!name || !email || !password) {
            return res.status(400).json({ 
                success: false,
                message: 'All fields are required' 
            });
        }

        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email format'
            });
        }

        // Password strength validation
        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: 'Password must be at least 8 characters long'
            });
        }

        const existingUser = await User.findOne({ email:email });
        //let existingUser = false
        if (existingUser) {
            return res.status(409).json({ 
                success: false,
                message: 'User already exists' 
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ 
            name, 
            email, 
            password: hashedPassword 
        });

        const token = jwt.sign(
            { id: user._id }, 
            process.env.JWT_SECRET, // Make sure this matches your .env variable
            { expiresIn: '7d' }
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 * 1000,
        });

        // Return user data (excluding password)
        const userResponse = {
            _id: user._id,
            name: user.name,
            email: user.email,
           // createdAt: user.createdAt
        };

        return res.status(201).json({
            success: true,
            message: 'User registered successfully',
            user: userResponse,
            token // Optional: You may choose to send token in response too
        });

    } catch (error) {
        console.error('Registration error:', error);
        return res.status(500).json({ 
            success: false, 
            message: 'Internal server error',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};



// Login User: POST /api/user/login
export const login = async (req,res) => {
    try {
        const { email, password} = req.body;
        if(!email || !password){
            return res.status(409).json({ 
                success: false,
                message: 'Email and password required' 
            });
        }

        const user = await User.findOne({email});
        if(!user){
            return res.status(409).json({ 
                success: false,
                message: 'Invalid email or password' 
            });
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(409).json({ 
                success: false,
                message: 'Invalid email or password' 
            });
        }

        const token = jwt.sign(
            { id: user._id }, 
            process.env.JWT_SECRET, // Make sure this matches your .env variable
            { expiresIn: '7d' }
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        // Return user data (excluding password)
        const userResponse = {
            _id: user._id,
            name: user.name,
            email: user.email,
           // createdAt: user.createdAt
        };

        return res.status(201).json({
            success: true,
            message: 'User registered successfully',
            user: userResponse,
            token // Optional: we can choose to send token in response too
        });

    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}

// Check Auth : /api/user/is-auth
export const isAuth = async (req, res) => {
    try {
        // Get userId from req.user (set by auth middleware)
        const user = await User.findById(req.user.id).select("-password");
        
        if (!user) {
            return res.status(404).json({ 
                success: false, 
                message: "User not found" 
            });
        }

        return res.json({ success: true, user });
    } catch (error) {
        console.error("isAuth error:", error);
        return res.status(500).json({ 
            success: false, 
            message: "Authentication check failed",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}

// Logout : /api/user/logout
export const logout = async (req,res) => {
    try {
        res.clearCookie('token',{
            httpOnly:true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        })
        return res.json({success: true, message: "Logged Out"})
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}