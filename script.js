document.addEventListener("DOMContentLoaded", () => {
    // Declare variables
    const myButton = document.getElementById('brushTeeth');
    const streakElement = document.getElementById('streakTeeth');
    const delay = 3600; // cooldown in seconds (1 hour)

    const slider = document.getElementById('mySlider');
    const sliderValue = document.getElementById('sliderValue');

    const createBTN = document.getElementById('createButton');

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
    let streak = Number(localStorage.getItem("teethStreak")) || 0;
    streakElement.textContent = streak;

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

    function createNewButton(type, taskName, timesPerDay, timesCompleted = 0)
    {

        if (type == '1') // Button
        {
            const btn = document.createElement('button');
            btn.textContent = taskName.value;
            btn.style.backgroundColor = "#5cb85c";
            btn.id = taskName.value + 'Task' + '1';
            // add to main
            const main = document.querySelector('main');
            main.appendChild(btn);

            const tempTask = new newTask(btn.textContent, btn.id, 2, timesCompleted, timesPerDay);
            tasks.push(tempTask);
        }
        else if (type == '2')
        {
            const btn = document.createElement('button');
            btn.textContent = taskName.value;
            btn.style.backgroundColor = "#5cb85c";
            btn.id = taskName.value + 'Task' + '2';
            // add to main
            const main = document.querySelector('main');
            main.appendChild(btn);

            const tempTask = new newTask(btn.textContent, btn.id, "option2", timesCompleted, timesPerDay);
            tasks.push(tempTask);
        }
        else if (type == '3')
        {

        }
        localStorage.setItem("tasks", JSON.stringify(tasks));
        savedTasks = tasks;
    }

    const main = document.querySelector('main');

    savedTasks.forEach(taskData => {
        createNewButton(taskData.taskType, taskData.name, taskData.completionsNeeded, taskData.timesCompleted);

    });

    main.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON' && event.target.id.includes("Task")) {
        const taskName = event.target.textContent;
        startCooldown(2, event.target);
        event.target.style.backgroundColor = "#FF0000";
        alert(`Task "${taskName}" clicked!`);

        if (event.target.id.includes('1'))
        {
            event.target.remove(); 
        }

    }
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

    createBTN.addEventListener('click', () => {
         const selected = document.querySelector('input[name="myChoice"]:checked');

         let taskName = document.getElementById('newTaskName');
         let timesPerDay = document.getElementById('newTPD');

            if (selected) 
            {
                createNewButton(selected.value, taskName, timesPerDay, 0);
            } 
            else 
            {
                alert('No option selected yet!');
            }
    })

    // Handle button click
    myButton.addEventListener('click', () => {
        streak += 1;
        streakElement.textContent = streak;
        localStorage.setItem("teethStreak", streak);

        // Save timestamp of click
        localStorage.setItem("lastClick", Date.now());

        // Change button style and start cooldown
        myButton.style.backgroundColor = "#FF0000";
        startCooldown(delay, myButton);

        console.log('Button was clicked!');
    });

    slider.addEventListener('input', () => {
        sliderValue.textContent = slider.value;
    });

});
