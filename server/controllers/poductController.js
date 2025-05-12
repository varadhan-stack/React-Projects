// Correct imports
import cloudinary from "../configs/cloudinary.js";
import Product from "../models/Product.js";

// ✅ Add Product : /api/product/add
export const addProduct = async (req, res) => {
  try {
    //console.log('Cloudinary uploader:', cloudinary?.uploader);

    // ✅ Parse product data from body
    const productData = JSON.parse(req.body.productData);

    // ✅ Upload images to Cloudinary
    const images = req.files;
    const imageUrl = await Promise.all(
      images.map(async (item) => {
        const result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });

        return result.secure_url;
      })
    );

    // ✅ Save product with images
    await Product.create({ ...productData, image: imageUrl });

    res.json({ success: true, message: "Product Added" });
  } catch (error) {
    console.error(error.message);
    res.json({ success: false, message: error.message });
  }
};

// ✅ Get Products List : /api/product/list
export const productList = async (req, res) => {
  try {
    const products = await Product.find(); // ❗ Fixed: use `Product`, not `productById`
    res.json({ success: true, products });
  } catch (error) {
    console.error(error.message);
    res.json({ success: false, message: error.message });
  }
};

// ✅ Get Product by ID : /api/product/id
export const getProductById = async (req, res) => { // ❗ Renamed to avoid name conflict
  try {
    const { id } = req.body;
    const product = await Product.findById(id);
    res.json({ success: true, product });
  } catch (error) {
    console.error(error.message);
    res.json({ success: false, message: error.message });
  }
};

// ✅ Change Product Stock : /api/product/stock
export const changeStock = async (req, res) => {
  try {
    const { id, inStock } = req.body;
    await Product.findByIdAndUpdate(id, { inStock });
    res.json({ success: true, message: "Stock Updated" });
  } catch (error) {
    console.error(error.message);
    res.json({ success: false, message: error.message });
  }
};
