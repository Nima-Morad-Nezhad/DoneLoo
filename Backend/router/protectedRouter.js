const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware")
router.get("/", verifyToken, async(req ,res)=>{
    return res.status(200).json({msg: "protected route accessed"});
});
module.exports = router;