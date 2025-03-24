// Create a user
app.post('/users', async (req, res) => {
    try {
      const user = new User(req.body);
      const savedUser = await user.save();
      res.json(savedUser);
    } catch (error) {
      res.status(500).json({msg:"you could not create user",error   });
    }
  });
  
  // Get all users
  app.get('/users', async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({msg:"you could not get all users",error  });
    }
  });