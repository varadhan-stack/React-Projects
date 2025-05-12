import mongoose from "mongoose";


const productSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: Array, required: true},
    price: {type: Number, required: true},
    offerPrice: {type: Number, required: true},
    image:[String],
    category: {type: Array, required: true},
    inStock: {type:Boolean, default: true}

},{timestamps : true})

const Product = mongoose.models.Products || mongoose.model('Products',productSchema);

export default Product;