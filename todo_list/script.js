window.addEventListener('load', () => {
    const form = document.querySelector("#new-task-form");
    const input = document.querySelector("#new-task-input");
    const list_e1 = document.querySelector("#tasks");

    let taskCount = 0; // Counter for serial numbers

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const task = input.value.trim(); // Remove extra spaces

        if (!task) {
            alert("Please fill out the task");
            return;
        }

        taskCount++; // Increase serial number count

        // Create task container
        const task_e1 = document.createElement("div");
        task_e1.classList.add("task");

        // Create checkbox for completion status
        const task_checkbox_e1 = document.createElement("input");
        task_checkbox_e1.type = "checkbox";
        task_checkbox_e1.classList.add("task-checkbox");

        // Create serial number element
        const task_serial_e1 = document.createElement("span");
        task_serial_e1.classList.add("serial");
        task_serial_e1.innerText = taskCount + ". "; // Add serial number

        // Create content container
        const task_content_e1 = document.createElement("div");
        task_content_e1.classList.add("content");

        // Create input element for task text
        const task_input_e1 = document.createElement("input");
        task_input_e1.classList.add("text");
        task_input_e1.type = "text";
        task_input_e1.value = task;
        task_input_e1.setAttribute("readonly", "readonly");

        // Append checkbox, serial number, and task input to content div
        task_content_e1.appendChild(task_checkbox_e1);
        task_content_e1.appendChild(task_serial_e1);
        task_content_e1.appendChild(task_input_e1);

        // Append content to task container
        task_e1.appendChild(task_content_e1);

        // Create action buttons container
        const task_actions_e1 = document.createElement("div");
        task_actions_e1.classList.add("actions");

        // Create Edit button
        const task_edit_e1 = document.createElement("button");
        task_edit_e1.classList.add("edit");
        task_edit_e1.innerText = "Edit";

        // Create Delete button
        const task_delete_e1 = document.createElement("button");
        task_delete_e1.classList.add("delete");
        task_delete_e1.innerText = "Delete";

        // Append buttons to action div
        task_actions_e1.appendChild(task_edit_e1);
        task_actions_e1.appendChild(task_delete_e1);

        // Append action buttons to task container
        task_e1.appendChild(task_actions_e1);

        // Append task to task list
        list_e1.appendChild(task_e1);

        // Clear input field after adding task
        input.value = "";

        // ✅ Task Finished or Not: Toggle strike-through effect
        task_checkbox_e1.addEventListener("change", () => {
            if (task_checkbox_e1.checked) {
                task_input_e1.classList.add("completed"); // Add CSS class for strike-through
            } else {
                task_input_e1.classList.remove("completed");
            }
        });

        // Edit Task
        task_edit_e1.addEventListener('click', () => {
            if (task_edit_e1.innerText.toLowerCase() === "edit") {
                task_input_e1.removeAttribute("readonly");
                task_input_e1.focus();
                task_edit_e1.innerText = "Save";
            } else {
                task_input_e1.setAttribute("readonly", "readonly");
                task_edit_e1.innerText = "Edit";
            }
        });

        // Delete Task and Update Serial Numbers
        task_delete_e1.addEventListener('click', () => {
            list_e1.removeChild(task_e1);
            updateSerialNumbers(); // Update serial numbers after deletion
        });
    });

    // Function to update serial numbers after deleting a task
    function updateSerialNumbers() {
        const tasks = document.querySelectorAll("#tasks .task .serial");
        taskCount = 0; // Reset counter
        tasks.forEach((serial, index) => {
            serial.innerText = (index + 1) + ". "; // Update serial numbers
            taskCount++; // Maintain count
        });
    }
});
