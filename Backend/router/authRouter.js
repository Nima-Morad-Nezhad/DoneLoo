const express = require("express");
 const router = express.Router();
 const User = require("../models/userModel");
 const bcrypt = require("bcrypt");
 const jwt = require("jsonwebtoken");
 const authMiddleware = require("../middleware/authMiddleware")
 //user registration
 
 router.post("/register",async(req,res)=>{
    try {
        const {username , email, password} =req.body;
        if(!username || !email || !password){
            res.status(400).send({ msg: "All input is required" });
        }
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(405).send({ msg: "User Already Exist. Please Login" });
        }
        const saltRound = Number(process.env.ROUNDED_SALT);
        const saltGen = await bcrypt.genSalt(saltRound)
        const hashedPassword = await bcrypt.hash(password,saltGen);
        const user = new User ({username:req.body.username, email:req.body.email, password:hashedPassword});
        await user.save();
        res.status(201).json({msg:"User registered successfully"})
    } catch (error) {
        res.status(500).json({msg: "Registration failed",error});
       
    }
})

//User login
router.post("/login" ,async(req,res)=>{
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return res.send({error: "Please provide email and password"})
        }
        const user = await User.findOne({email});
        if(!user){
            return res.send({error: "Authentication failed, user not found please register first"} )

        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if(!passwordMatch){
            return res.send({error: "Authentication failed!, invalid password"} );
        }
        let payload ={
            userId: user._id,
            email: user.email
        }
        const token =  jwt.sign({payload}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "1h",});
        return   res.send({msg:"Login Successfully",token});
    } catch (error) {
        res.status(500).json({error:"Login failed", error} );
        console.log(error);
    }
  
  
})

module.exports = router;