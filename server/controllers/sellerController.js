import jwt from 'jsonwebtoken'

export const sellerLogin = async (req, res) => {
    try {
      const { email, password } = req.body;

        if (!email || !password) {
        return res.status(400).json({ success: false, message: "All fields are required" });
        }

  
      if (
        password !== process.env.SELLER_PASSWORD ||
        email !== process.env.SELLER_EMAIL
      ) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials',
        });
      }
  
      const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: '7d',
      });
  
      // Set cookie
      res.cookie('sellerToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });
  
      // Also return token in response
      return res.json({
        success: true,
        message: 'Login successful',
        token, // <-- send token back
      });
    } catch (error) {
      console.error('Login error:', error);
      return res.status(500).json({
        success: false,
        message: 'Login failed',
      });
    }
  };
  

// Seller Authentication
export const isSellerAuth = async (req, res) => {
    try {
        return res.json({success: true});
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}

// Logout Seller Authentication
export const sellerLogout = async (req, res) => {
    try {
        res.clearCookie('sellerToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict'
        });
        return res.json({success:true, message:"Logged Out"});

    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
} 

//export default sellerLogin;