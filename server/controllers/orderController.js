import Order from "../models/Order.js";
import Product from "../models/Product.js";

// place order cod : /api/order/cod
export const placeOrderCOD = async (req, res) => {
    try {
        const { userId, items, address } = req.body;

        // Validate
        if (!userId || !items || !Array.isArray(items) || items.length === 0 || !address) {
            return res.status(400).json({ success: false, message: "Missing required fields." });
        }

        // Recalculate total amount based on actual product data
        let amount = 0;

        for (const item of items) {
            if (!item.product || !item.quantity) {
                return res.status(400).json({ success: false, message: "Invalid item data" });
            }

            const product = await Product.findById(item.product);
            if (!product) {
                return res.status(404).json({ success: false, message: `Product not found: ${item.product}` });
            }

            amount += product.offerPrice * item.quantity;
        }

        const tax = Math.round((amount * 2) / 100);
        const totalAmount = amount + tax;

        // Create order
        const newOrder = await Order.create({
            userId,
            items,
            address,
            amount: totalAmount,
            tax,
            status: true, // default status
            paymentType: "COD",
        });

        res.json({ success: true, message: "Order placed successfully", order: newOrder });
    } catch (error) {
        console.error("Order error:", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
// export const placeOrderCOD = async (req, res) => {
//     try {
//         const { userId, items, address } = req.body;
//         if(!address || items.length === 0){
//             return res.json({success: false, message: "invalid data"})
//         }
//         // calculate amount using items
//         let amount = await items.reduce(async (acc, item) => {
//             const product = await Product.findById(item.product);
//             return (await acc) + product.offerPrice * item.quantity
//         })

//         // add tax charge 2%
//         amount += Math.floor( amount * 0.02 );

//         await Order.create({
//             userId,
//             items,
//             amount,
//             address,
//             paymentType: "COD"
//         })

//         return res.json({success:true, message: "Order Placed Successfully"})

//     } catch (error) {
//         console.log(error.message);
//         res.json({success: false, message: error.message})
//     }
// }

// Get orders by user id : /api/order/user
export const getUserOrders = async (req, res) => {
    try {
        //const { userId } = req.body;
        const userId = req.userId; // ✅ from middleware
        console.log("get user order "+userId)
        const orders = await Order.find({
            userId,
            $or: [{paymentType: "COD"},{isPaid: true}]
        }).populate("items.product address").sort({createdAt: -1});
        res.json({success: true, orders})
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}

// Get orders by user id : /api/order/user
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            $or: [{paymentType: "COD"},{isPaid: true}]
        }).populate("items.product address").sort({createdAt: -1}); // show recent order data top
        res.json({success: true, orders})
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}

