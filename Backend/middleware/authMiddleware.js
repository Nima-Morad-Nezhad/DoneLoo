const jwt = require("jsonwebtoken");

 function verifyToken(req, res,next){
     const header = req.header["authorization"];
     console.log("header",header)
     if(!header) return res.status(401).json({error: "Access denied"});
    

     let token = header.split(" ")[1];
    
     try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.userId = decoded;
      
   next();
     } catch (error) {
        res.send({ msg: "Invalid or expired token",error });
         console.log(error);
     }
   
res.status(401).json({error: "Invalid token"})}
module.exports =  verifyToken;
