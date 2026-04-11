const cron = require('node-cron');
const Task = require('../models/task');
const { DateTime } = require('luxon');

const initScheduler = () => {
    // Run every minute
    cron.schedule('* * * * *', async () => {
        console.log('--- Running Task Scheduler Job ---');
        const now = DateTime.now().toJSDate();

        try {
            // 1. Check for reminders
            const tasksToNotify = await Task.find({
                reminderTime: { $lte: now },
                reminderSent: false,
                completed: false
            });

            if (tasksToNotify.length > 0) {
                console.log(`Sending notifications for ${tasksToNotify.length} tasks...`);
                for (const task of tasksToNotify) {
                    sendNotification(task);
                    task.reminderSent = true;
                    await task.save();
                }
            }

            // 2. Check for overdue tasks
            const overdueTasks = await Task.find({
                dueDate: { $lte: now },
                status: 'upcoming',
                completed: false
            });

            if (overdueTasks.length > 0) {
                console.log(`Marking ${overdueTasks.length} tasks as overdue...`);
                for (const task of overdueTasks) {
                    task.status = 'overdue';
                    await task.save();
                }
            }

        } catch (error) {
            console.error('Error in scheduler job:', error);
        }
    });
};

const sendNotification = (task) => {
    // Mock notification: In a real app, this could be an email, push notification, or WebSocket event
    console.log(`[NOTIFICATION] Reminder for task: "${task.title}"!`);
    console.log(`Description: ${task.description || 'No description'}`);
    console.log(`Due at: ${task.dueDate}`);
};

module.exports = { initScheduler };
