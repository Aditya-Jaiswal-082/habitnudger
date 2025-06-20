// routes/reminders.js
const express = require("express");
const Reminder = require("../models/Reminder");
const router = express.Router();

// Create a new reminder
router.post("/set", async (req, res) => {
    try {
        const { userId, reminderTime } = req.body;

        const newReminder = new Reminder({
            userId,
            reminderTime,
            isCompleted: false,
        });

        await newReminder.save();
        res.status(201).json({ message: "Reminder set successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get reminders for a specific user
router.get("/:userId", async (req, res) => {
    try {
        const reminders = await Reminder.find({ userId: req.params.userId });
        res.status(200).json(reminders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update reminder as completed
router.put("/:id", async (req, res) => {
    try {
        const reminder = await Reminder.findById(req.params.id);
        if (!reminder) {
            return res.status(404).json({ error: "Reminder not found" });
        }
        reminder.isCompleted = true;
        await reminder.save();
        res.status(200).json({ message: "Reminder marked as completed" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
