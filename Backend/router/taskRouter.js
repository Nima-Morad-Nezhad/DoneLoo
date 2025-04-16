const express = require("express");
 const router = express.Router();
 const Task = require("../models/taskModel")
// Create a task
router.post('/add', async (req, res) => {
    try {
      const task =await Task.create({  title: req.body.title,
        description: req.body.description,
       });


      res.status(201).json(task);
      console.log("Added successfully!");
    } catch (error) {
      res.status(500).json({ msg:"you could not add",error });
      console.error("error adding task",error)
    }
  });
  // Get all tasks
router.get('/get', async (req, res) => {
    try {
      const tasks = await Task.find();
      res.status(201).json(tasks);
          
    } catch (error) {
      res.status(500).json({msg:"you could not receive",error  });
    }
  });
  
  // Update a task
  router.put('/update/:id', async (req, res) => {
    try {
      const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.status(201).json(task);
      console.log("tast has updated!")
    } catch (error) {
      res.status(500).json({msg:"you could not update",error   });
    }
  });
  
  // Delete a task
  router.delete('/delete/:id', async (req, res) => {
    try {
      await Task.findByIdAndDelete(req.params.id);
      res.status(201).json({ message: 'Task deleted successfully' });
      console.log("task has deleted!")
    } catch (error) {
      res.status(500).json({msg:"you could not delete",error });
    }
  });
module.exports = router;
  //"67eb36ec59a378d7ed855e40"