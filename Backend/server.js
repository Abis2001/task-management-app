
const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

// Temporary task data
const tasks = [
    { id: 1, title: "Learn Node.js", completed: false },
    { id: 2, title: "Learn Express", completed: false }
];

// Home endpoint
app.get("/", (req, res) => {
    res.send("Task Management API is running!");
});

// Get all tasks
app.get("/api/tasks", (req, res) => {
    res.json(tasks);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.post("/api/tasks", (req, res) => {
    const { title } = req.body;

    if (!title || !title.trim()) {
        return res.status(400).json({
            error: "Task title is required"
        });
    }

    const newTask = {
        id: Date.now(),
        title: title.trim(),
        completed: false
    };

    tasks.push(newTask);

    res.status(201).json(newTask);
});
