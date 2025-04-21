const authMiddleware = require('../middleware/authMiddleware');
// Create a user
app.post('/users', authMiddleware ,async (req, res) => {
    try {
      const user = new User(req.body);
      const savedUser = await user.save();
      res.send({msg:"User created successfully", user: savedUser});
    } catch (error) {
      res.send({msg:"you could not create user",error   });
    }
  });
  
  // Get all users
  app.get('/users', authMiddleware ,async (req, res) => {
    try {
      let userId = req.userId.userId;
      let users = await User.find({author: userId});
      return res.send(users);
    } catch (error) {
      res.send({msg:"you could not get all users",error  });
    }
  });
 