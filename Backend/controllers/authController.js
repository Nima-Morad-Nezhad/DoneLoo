const User = require("../models/userModel");
const saltRounds = Number(process.env.ROUNDED_SALT);
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose"); //Needed At checkUserExists function

const registerUser = async (req, res) => {
  try {

    const { username, email, password } = req.body;
    if(!username || !password || !email){
      return res.status(400).json({message: "All fields are required"});
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(String(password), saltRounds);

    // Rearranged the code to create the user first and then generate the token
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword
    });

    let payload = {
      userId: newUser._id,
      email: newUser.email
    };
    
    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    
    res.status(201).json({
      _id: newUser._id,
      username: User.username,
      email: User.email,
      token
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: error.message });
  }
};//There was a bug here 


const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    let payload = {
      userId: user._id,
      email: user.email
    };

    const token = jwt.sign(
      payload,
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );

    // Return the user ID with the token
    return res.json({
      msg: "Login Successfully", 
      token, 
      userId: user._id
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const debugToken = async (req, res) => {
    try {
      // Extract user ID from request
      const userId = req.user._id;
      
      // Return detailed debug information
      res.status(200).json({
        message: "Token debug info",
        requestUser: {
          id: req.user._id,
          username: req.user.username,
          email: req.user.email
        },
        tokenInfo: {
          authHeader: req.headers.authorization,
          tokenPresent: !!req.headers.authorization
        }
      });
    } catch (error) {
      console.error("Debug token error:", error);
      res.status(500).json({ message: error.message, stack: error.stack });
    }
};//Did not understand this function
  

const checkUserExists = async (req, res) => {
    try {
      const { userId } = req.params;
      
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: "Invalid user ID format" });
      }//did not understand this. 
      
      const user = await User.findById(userId).select("-password");
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      res.status(200).json({
        message: "User exists",
        user: {
          id: user._id,
          username: user.username,
          email: user.email
        }
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};//Need to understand this Better .


const testTokenGeneration = async (req, res) => {
    try {
      // Create a simple test token
      const testPayload = { test: "data" };
      const testToken = jwt.sign(testPayload, 123);
      
      // Verify we can decode the token
      const decoded = jwt.verify(testToken, 123);
      
      res.status(200).json({
        success: true,
        testToken,
        decoded,
        secretAvailable: !!process.env.ACCESS_TOKEN_SECRET,
        secretPreview: process.env.ACCESS_TOKEN_SECRET ? 
          process.env.ACCESS_TOKEN_SECRET.substring(0, 3) + "..." : "undefined"
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
}; 

  // Export it
    module.exports = {
        registerUser,
        loginUser,
        debugToken,
        checkUserExists,
        testTokenGeneration
      };