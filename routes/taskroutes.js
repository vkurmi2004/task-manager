const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskcontroller');

router.get('/', taskController.getAllTasks);
router.post('/', taskController.createTask);
router.get('/upcoming', taskController.getUpcomingTasks);
router.get('/overdue', taskController.getOverdueTasks);
router.get('/:id', taskController.getTaskById);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

module.exports = router;