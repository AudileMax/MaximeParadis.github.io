document.addEventListener("DOMContentLoaded", () => {
    // Declare variables
    const myButton = document.getElementById('brushTeeth');
    const streakElement = document.getElementById('streakTeeth');
    const delay = 3600; // cooldown in seconds (1 hour)

    // Load streak from localStorage
    let streak = Number(localStorage.getItem("teethStreak")) || 0;
    streakElement.textContent = streak;

    // Function to start cooldown
    function startCooldown(timeLeft) {
        myButton.disabled = true;

        const interval = setInterval(() => {
            if (timeLeft > 60) {
                myButton.textContent = `Teeth has been brushed! Wait ${Math.floor(timeLeft / 60)}m`;
            } else {
                myButton.textContent = `Teeth has been brushed! Wait ${timeLeft}s`;
            }

            timeLeft--;

            if (timeLeft < 0) {
                clearInterval(interval);
                myButton.disabled = false;
                myButton.textContent = "Brush Your Teeth!";
                myButton.style.backgroundColor = "#FF0000";
                localStorage.removeItem("lastClick"); // cooldown finished
            }
        }, 1000);
    }

    // Check if there’s an ongoing cooldown
    const lastClick = localStorage.getItem("lastClick");
    if (lastClick) {
        const elapsed = Math.floor((Date.now() - Number(lastClick)) / 1000);
        const remaining = delay - elapsed;
        if (remaining > 0) {
            startCooldown(remaining);
            myButton.style.backgroundColor = "#5cb85c";
        }
    }

    // Handle button click
    myButton.addEventListener('click', () => {
        streak += 1;
        streakElement.textContent = streak;
        localStorage.setItem("teethStreak", streak);

        // Save timestamp of click
        localStorage.setItem("lastClick", Date.now());

        // Change button style and start cooldown
        myButton.style.backgroundColor = "#5cb85c";
        startCooldown(delay);

        console.log('Button was clicked!');
    });
});
