const Task = require('../models/task');

// CREATE
exports.createTask = async (req, res) => {
  try {
    const { title, description, dueDate, reminderTime } = req.body;
    if (!title || typeof title !== 'string' || title.trim() === '') {
      return res.status(400).json({ message: 'Title is required' });
    }

    let status = 'pending';
    if (dueDate && new Date(dueDate) > new Date()) {
      status = 'upcoming';
    } else if (dueDate && new Date(dueDate) <= new Date()) {
      status = 'overdue';
    }

    const newTask = new Task({ 
      title: title.trim(), 
      description, 
      dueDate, 
      reminderTime,
      status 
    });
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET BY ID
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE
exports.updateTask = async (req, res) => {
  try {
    const { title, description, completed, dueDate, reminderTime, status } = req.body;
    
    let updateData = { title, description, completed, dueDate, reminderTime, status };
    
    // Auto update status if not provided and dueDate is present
    if (!status && dueDate) {
      if (new Date(dueDate) > new Date()) {
        updateData.status = 'upcoming';
      } else {
        updateData.status = 'overdue';
      }
    }
    
    if (completed) updateData.status = 'completed';

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedTask) return res.status(404).json({ message: "Task not found" });

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET UPCOMING
exports.getUpcomingTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ status: 'upcoming' }).sort({ dueDate: 1 });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET OVERDUE
exports.getOverdueTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ status: 'overdue' }).sort({ dueDate: 1 });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE
exports.deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);

    if (!deletedTask) return res.status(404).json({ message: "Task not found" });

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};