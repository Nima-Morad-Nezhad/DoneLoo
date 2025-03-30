const jwt = require("jsonwebtoken");
 function verifyToken(req, res,next){
     const header = req.header("Authorization");
     if(!header) return res.status(401).json({error: "Access denied"});
     const token = header.split(" ")[1]
     const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
     req.userId = decoded.userId;
     //req.userId = decoded.decoded_id
next();
res.status(401).json({error: "Invalid token"})}
module.exports =verifyToken