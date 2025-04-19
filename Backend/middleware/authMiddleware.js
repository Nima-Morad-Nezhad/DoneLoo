const jwt = require("jsonwebtoken");
const blacklist = new Set();
 function verifyToken(req, res,next){
     const header = req.header("Authorization");
     if(!header) return res.status(401).json({error: "Access denied"});
     const token = header.split(" ")[1];
     if (blacklist.has(token)) {
      return res.status(401).json({ error: "Token has been logged out" });
  }
     try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.userId = decoded;
        //req.userId = decoded.decoded_id
   next();
     } catch (error) {
        res.status(401).json({ msg: "Invalid or expired token" });
     }
   
res.status(401).json({error: "Invalid token"})}
module.exports =  verifyToken;