import jwt from 'jsonwebtoken';

const authUser = (req, res, next) => {
  const token = req.cookies.token; // ✅ this is correct
  console.log(req.cookies);
  console.log(req.body);
  //console.log(req)
  if (!token) {
    return res.status(401).json({ success: false, message: "Not Authorized: Token missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id; // ✅ attach to req
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Not Authorized: Invalid token",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

export default authUser;
