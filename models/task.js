const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  completed: {
    type: Boolean,
    default: false
  },
  dueDate: {
    type: Date
  },
  reminderTime: {
    type: Date
  },
  reminderSent: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['pending', 'upcoming', 'completed', 'overdue'],
    default: 'pending'
  }
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
