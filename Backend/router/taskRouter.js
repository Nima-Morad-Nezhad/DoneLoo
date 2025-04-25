const express = require("express");
 const router = express.Router();
 const Task = require("../models/taskModel")
 const user = require("../models/userModel")
  const auth = require("../middleware/authMiddleware")
// Create a task
router.post('/add',auth ,async (req, res) => {
  console.log("req.user",req.user)
 let ownerId = req.user.payload.userId;
    try {
 
      const task =await Task.create({  title: req.body.title,
        description: req.body.description,
        owner: ownerId});


      res.status(201).json(task);
      console.log("Added successfully!");
    } catch (error) {
      res.status(500).json({ msg:"you could not add",error });
      console.error("error adding task",error)
    }
  });
  // Get all tasks
router.get('/get', auth ,async (req, res) => {
    try {
      const ownerId = req.user.payload.userId;
     
        const tasks = await Task.find({owner: ownerId});
        res.send(tasks);
            
     
     
    } catch (error) {
      res.status(500).json({msg:"you could not receive",error  });
      console.log(error, "error");
    }
  });
  
  // Update a task
  router.put('/update/:id', async (req, res) => {
    const id = req.params.id;
    const update = req.body;
    try {
      const task = await Task.findById(id);
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      const newValue = await Task.findByIdAndUpdate(id, update, {
        new: true,
      })
      res.json({ msg: "updated successfully...", newValue });
      console.log("tast has updated!")
    } catch (error) {
      res.status(500).send({msg:"you could not update",error   });
    }
  });
  
  // Delete a task
  router.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;
    try {
      const task = await Task.findById(id);
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
     const deletedValue = await Task.findByIdAndDelete(id);
     let tasks = await Task.find()
      res.send({ message: 'Task deleted successfully' });
      console.log("task has deleted!")
    } catch (error) {
      res.send("Can not delete");
    }
  });
module.exports = router;
  //"67eb36ec59a378d7ed855e40"