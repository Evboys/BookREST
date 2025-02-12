const jwt = require('jsonwebtoken');
require('dotenv').config()
const SECRET_KEY = process.env.JWT_SECRET

const verifyToken = (req, res, next) => {
    const token = req.headers["authorization"];

    if (!token) {
        return res.status(403).json({ success: false, message: "Token manquant" });
    }

    const tokenParts = token.split(" ");
    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
        return res.status(400).json({ success: false, message: "Format du token invalide. Utilisez 'Bearer <token>'" });
    }

    const actualToken = tokenParts[1];

    
    jwt.verify(actualToken, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ success: false, message: "Token invalide", error: err.message });
        }

        req.user = decoded; 
        next(); 
    });
};

module.exports = verifyToken;
