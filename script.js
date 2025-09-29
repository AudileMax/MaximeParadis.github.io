document.addEventListener("DOMContentLoaded", () => {
    // Declare variables
    const form = document.getElementById('newTaskForm');
    const accordion = document.getElementById('tasksAccordion');

    let taskCounter = 0; // unique id for each accordion item

    const main = document.querySelector('main');

    const taskSection = document.getElementById('taskList');

    let tasks = [];
    let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    
    //Structs
    function newTask(name, id, taskType, timesCompleted, completionsNeeded){
        this.name = name;
        this.id = id;
        this.taskType = taskType;
        this.timesCompleted = timesCompleted;
        this.completionsNeeded = completionsNeeded;
    }

    // Load streak from localStorage
    //let streak = Number(localStorage.getItem("teethStreak")) || 0;
    //streakElement.textContent = streak;

    // Functions
    function startCooldown(timeLeft, tempBTN) {
        tempBTN.disabled = true;
        let ogText = tempBTN.textContent;
        const interval = setInterval(() => {
            if (timeLeft > 60) {
                tempBTN.textContent = `Task Completed! Wait ${Math.floor(timeLeft / 60)}m`;
            } else {
                tempBTN.textContent = `Task Completed! Wait ${timeLeft}s`;
            }

            timeLeft--;

            if (timeLeft < 0) {
                clearInterval(interval);
                tempBTN.disabled = false;
                tempBTN.textContent = ogText;
                tempBTN.style.backgroundColor = "#5cb85c";
                localStorage.removeItem("lastClick"); // cooldown finished
            }
        }, 1000);
    }

    form.addEventListener('submit', (e) => {
    e.preventDefault();
    const taskNameInput = document.getElementById('taskName');
    const taskName = taskNameInput.value.trim();

    if (taskName) {
        const tempslider = document.getElementById('sliderTimes');
        const taskLabel = document.querySelector('input[name="taskLabel"]:checked').value;
        
        addTask( taskLabel, taskName, tempslider.value, 0);
        taskNameInput.value = ''; // clear input
    }
    });

    function addTask(type, taskName, timesPerDay, timesCompleted = 0) {

        taskCounter++;
        const taskId = `task${taskCounter}${type}`;

        if(type == 1)
        {
            const tempTask = new newTask(taskName, taskId, 1, timesCompleted, timesPerDay);
            tasks.push(tempTask);
        }
        else if (type == 2)
        {
            const tempTask = new newTask(taskName, taskId, 2, timesCompleted, timesPerDay);
            tasks.push(tempTask);
        }
        else if (type == 3)
        {
            const tempTask = new newTask(taskName, taskId, 3, timesCompleted, timesPerDay);
            tasks.push(tempTask);
        }

        localStorage.setItem("tasks", JSON.stringify(tasks));
        savedTasks = tasks;

        // Create accordion item
        const item = document.createElement('div');
        item.className = 'accordion-item';

        const btnId = "Button" + taskId;


        item.innerHTML = `
        <div class="card mb-2 shadow-sm task-card">
            <div class="card-body">
            <span class="fw-bold">${taskName}</span>
            <div class="btn-group">
                <button class="btn btn-sm btn-success finish-task">Finish</button>
                <button class="btn btn-sm btn-danger delete-task">Delete</button>
            </div>
            </div>
        </div>
        `;
        
        // Add delete button functionality
        const deleteBtn = item.querySelector('.btn-danger');
        deleteBtn.addEventListener('click', () => {
            item.remove();
            const index = tasks.findIndex(task => task.id === taskId);
            tasks.splice(index,1);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            savedTasks = tasks;
        });

        const accordionBtn = item.querySelector('.btn-success');
        accordionBtn.addEventListener('click', () => {
            startCooldown(2, accordionBtn);
            accordionBtn.style.backgroundColor = "#FF0000";
            if(type == 1)
            {
                item.remove();
                const index = tasks.findIndex(task => task.id === taskId);
                if(index !== -1){
                    tasks.splice(index,1);
                    localStorage.setItem("tasks", JSON.stringify(tasks));
                    savedTasks = tasks;
                }
            }
        })

        accordion.appendChild(item);
    }

    savedTasks.forEach(taskData => {
        addTask(taskData.taskType, taskData.name, taskData.completionsNeeded, taskData.timesCompleted);
    });

    // Check if there’s an ongoing cooldown
    const lastClick = localStorage.getItem("lastClick");
    if (lastClick) {
        const elapsed = Math.floor((Date.now() - Number(lastClick)) / 1000);
        const remaining = delay - elapsed;
        if (remaining > 0) {
            myButton.style.backgroundColor = "#FF0000";
            startCooldown(remaining, myButton);
        }
        else { // 5cb85c
            myButton.style.backgroundColor = "#5cb85c";
        }
    }
});
