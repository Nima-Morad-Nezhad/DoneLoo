const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    console.log("Headers received:", req.headers);

    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ msg: "Unauthorized user: No token provided" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        if (!decodedToken || !decodedToken.userId) {
            return res.status(403).json({ msg: "Invalid token structure" });
        }

        req.user = decodedToken;
        next();
    } catch (error) {
        return res.status(403).json({ msg: "Invalid or expired token" });
    }
};

module.exports = authMiddleware;
