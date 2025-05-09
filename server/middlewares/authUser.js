
// const authUser = async (req, res, next) => {
    
//     const { token } = req.cookies;
//     if(!token){
//         return res.json({ success: false, message: "Not Authorized"})
//     }

//     try {
//         const tokenDecode = jwt.verify(token, process.env.JWT_SECRET)
//         if(tokenDecode.id){
//             req.body.userId = tokenDecode.id;
//         }else{
//             return res.json({ success: false, message: "Not Authorized"})
//         }
//         next();
//     } catch (error) {
//         return res.json({ success: false, message: error.message})
//     }
// }

// export default authUser;

import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
    // 1. Get token from cookies
    const { token } = req.cookies;
    
    if (!token) {
        return res.status(401).json({ 
            success: false, 
            message: "Authorization token missing" 
        });
    }

    try {
        // 2. Verify token
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
        
        // 3. Check if decoded token has expected structure
        if (!tokenDecode?.id) {
            return res.status(401).json({ 
                success: false, 
                message: "Invalid token structure" 
            });
        }

        // 4. Attach user ID to request
        req.user = { id: tokenDecode.id };
        next();

    } catch (error) {
        // Handle different JWT error types specifically
        let message = "Authentication failed";
        
        if (error.name === 'TokenExpiredError') {
            message = "Token expired";
        } else if (error.name === 'JsonWebTokenError') {
            message = "Invalid token";
        }

        return res.status(401).json({ 
            success: false, 
            message,
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

export default authUser;