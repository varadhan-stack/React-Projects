
import User from "../models/User.js";

// Update User cart data : /api/cart/update

export const updateCart = async (params) => {

    try {
        const { userId, cartItems } =req.body;
        await User.findByIDAndUpdate(userId, {cartItems});
        res.json({success:true, message: "Cart Updated"})
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }

}