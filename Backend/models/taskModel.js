const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  dueDate: Date,
  status: { type: String, enum: ['todo', 'in-progress', 'done'], default: 'todo' },
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;