// Create a task
app.post('/tasks', async (req, res) => {
    try {
      const task = new Task(req.body);
      const savedTask = await task.save();
      res.json(savedTask);
    } catch (error) {
      res.status(500).json({ msg:"you could not add",error });
    }
  });
  // Get all tasks
app.get('/tasks', async (req, res) => {
    try {
      const tasks = await Task.find();
      res.json(tasks);
    } catch (error) {
      res.status(500).json({msg:"you could not receive",error  });
    }
  });
  
  // Update a task
  app.put('/tasks/:id', async (req, res) => {
    try {
      const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(task);
    } catch (error) {
      res.status(500).json({msg:"you could not update",error   });
    }
  });
  
  // Delete a task
  app.delete('/tasks/:id', async (req, res) => {
    try {
      await Task.findByIdAndDelete(req.params.id);
      res.json({ message: 'Task deleted successfully' });
    } catch (error) {
      res.status(500).json({msg:"you could not delete",error   });
    }
  });