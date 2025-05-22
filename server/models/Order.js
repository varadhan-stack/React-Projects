import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product',
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  amount: {
    type: Number,
    required: true,
  },
  address: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Address',
  },
  status: {
    type: String,
    required: true,
    default: "Processing", // ✅ this was Boolean before, now correctly a string
  },
  paymentType: {
    type: String,
    required: true,
    enum: ["COD", "Online"], // optional but recommended
  },
  isPaid: {
    type: Boolean,
    required: true,
    default: false,
  },
}, { timestamps: true });

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);

export default Order;
