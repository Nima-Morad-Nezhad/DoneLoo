const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
  

//user registration

router.post("/register", async(req,res)=>{
    try {
        const {username , email, password} =req.body;
        const hashedPassword = await bcrypt.hash(password, process.env.ROUNDED_SALT);
        const user = new User ({username, email, password:hashedPassword});
        await user.save();
        res.status(201).json({msg:"User registered successfully", error})
    } catch (error) {
        res.status(500).json({msg: "Registration failed",error})
    }
})

//User login
router.post("/login", async(req,res)=>{
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username});
        if(!user){
            return res.status(401).json({error: "Authentication failed", error}, )
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if(!passwordMatch){
            return res.status(401).json({error: "Authentication failed!", error} );
        }
        const token =  jwt.sign({userId: user.email}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "1h",});
        res.status(200).json({token});
    } catch (error) {
        res.status(500).json({error:"Login failed", error} );
    }
})
module.exports = router;