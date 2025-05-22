import User from "../models/User.js";

// Update User cart data : /api/cart/update
export const updateCart = async (req, res) => {
  try {
    const userId = req.userId; // ✅ from middleware
    const { cartItems } = req.body;

    // Basic validation
    if (!userId || !Array.isArray(cartItems)) {
      return res.status(400).json({ success: false, message: "Invalid userId or cartItems" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { cartItems },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, message: "Cart Updated", user: updatedUser });

  } catch (error) {
    console.error("Cart update error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
