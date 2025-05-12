import jwt from 'jsonwebtoken';

const authSeller = async (req, res, next) => {
  try {
    // ✅ Get token from cookie
    const tokenFromCookie = req.cookies?.sellerToken;

    // ✅ Get token from Authorization header
    const authHeader = req.headers.authorization;
    const tokenFromHeader = authHeader && authHeader.startsWith('Bearer ')
      ? authHeader.split(' ')[1]
      : null;

    // ✅ Use whichever token is available
    const sellerToken = tokenFromCookie || tokenFromHeader;

    if (!sellerToken) {
      return res.status(401).json({
        success: false,
        message: 'Authentication token missing',
      });
    }

    // ✅ Verify the token
    const decoded = jwt.verify(sellerToken, process.env.JWT_SECRET);

    // ✅ Check if email matches the seller email
    if (decoded.email !== process.env.SELLER_EMAIL) {
      return res.status(403).json({
        success: false,
        message: 'Seller not authorized',
      });
    }

    // ✅ Attach seller info to request
    req.seller = decoded;
    next();
  } catch (error) {
    console.error('Authentication error:', error.message);
    return res.status(401).json({
      success: false,
      message: 'Authentication failed',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

export default authSeller;
