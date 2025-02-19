import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const protectRoute = async (req, res, next) => {
    try {
        const token =req.cookies.jwt;
        if(!token){
            return res.status(401).json({ message: 'You need to be logged in. No token provided' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded){
            return res.status(401).json({ message: 'Invalid token. Please login again' });
        }
        if(decoded){
            console.log("decoded",decoded); 
        }
        const user = await User.findById(decoded.userId).select('-password');
        if(!user){
            return res.status(404).json({ message: 'No user found with this id' });
        }
        req.user = user;
        next();

    } catch (error) {
        console.log("Error in protectRoute", error.message);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
}