
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

addTaskBtn.addEventListener("click", function () {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    const li = document.createElement("li");
    const taskName = document.createElement("span");
    const completeBtn = document.createElement("button");
    const deleteBtn = document.createElement("button");

    taskName.textContent = taskText;

    completeBtn.textContent = "Complete";
    deleteBtn.textContent = "Delete";

    completeBtn.addEventListener("click", function () {
        taskName.style.textDecoration =
            taskName.style.textDecoration === "line-through"
                ? "none"
                : "line-through";
    });

    deleteBtn.addEventListener("click", function () {
        li.remove();
    });

    li.appendChild(taskName);
    li.appendChild(completeBtn);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);

    taskInput.value = "";
});
