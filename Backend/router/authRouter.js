const express = require("express");
 const router = express.Router();
 const User = require("../models/userModel");
 const bcrypt = require("bcrypt");
 const jwt = require("jsonwebtoken");
 const authMiddleware = require("../middleware/authMiddleware")
 //user registration
 
 router.post("/register", async(req,res)=>{
    try {
        // const {username , email, password} =req.body;
        const saltRound = Number(process.env.ROUNDED_SALT);
        const saltGen = await bcrypt.genSalt(saltRound)
        const hashedPassword = await bcrypt.hash(req.body.password,saltGen);
        const user = new User ({username:req.body.username, email:req.body.email, password:hashedPassword});
        await user.save();
        res.status(201).json({msg:"User registered successfully"})
    } catch (error) {
        res.status(500).json({msg: "Registration failed",error});
       
    }
})

//User login
router.post("/login", async(req,res)=>{
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({error: "Authentication failed"} )
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if(!passwordMatch){
            return res.status(401).json({error: "Authentication failed!"} );
        }
        const token =  jwt.sign({userId: user._id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "1h",});
        res.status(200).json({token});
    } catch (error) {
        res.status(500).json({error:"Login failed", error} );
    }
})
module.exports = router;