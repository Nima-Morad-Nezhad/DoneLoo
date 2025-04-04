const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  status: String
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;


//  enum: ['todo', 'in-progress', 'done'], default: 'todo'