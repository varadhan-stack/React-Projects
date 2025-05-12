import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: {type: String, required: true, ref: 'product'},
    items: [{
        product: {type: String, required: true, ref: 'product'},
        quantity: {type: Number, required: true}
    }],
    amount: {type: Number, required: true},
    address: {type: String, required: true, ref: 'address'},
    status: {type: Boolean,required: true},
    paymentType: {type: String, required: true},
    isPaid: {type: Boolean, required: true, default: false}
},{timestamps: true})

const Order = mongoose.models.Order || mongoose.model('Order',orderSchema);

export default Order;