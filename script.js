// Get the button element from the HTML
const myButton = document.getElementById('brushTeeth');
const delay = 3600; // seconds to disable
let streak = Number(localStorage.getItem("teethStreak")) || 0;
const streakElement = document.getElementById('streakTeeth');

document.addEventListener("DOMContentLoaded", () => {
    console.log("Page fully loaded!");
    console.log(streak);
    streakElement.TextContent = streak;

    // Add a "click" event listener to the button
    myButton.addEventListener('click', () => {
        //const mainContent = document.querySelector('main button');

        //Change element style
        myButton.style.backgroundColor = "#5cb85c";
        myButton.disabled = true;
        myButton.textContent = `Teeth has been brushed!`;

        //update and save streak
        streak += 1;
        streakElement.textContent = streak;
        localStorage.setItem("teethStreak", streak);

        //start cooldown timer
        let timeLeft = delay;

        const interval = setInterval(() => {

            if (timeLeft > 60) {
                myButton.textContent = `Teeth has been brushed! Wait ${Math.floor(timeLeft / 60)}m`;
            } else {
                myButton.textContent = `Teeth has been brushed! Wait ${timeLeft}s`;
            }

            timeLeft--;

            if (timeLeft < 0) {
                clearInterval(interval);          // stop the countdown
                myButton.disabled = false;        // re-enable the button
                myButton.textContent = "Click me"; // restore original text
                myButton.style.backgroundColor = "#FF0000";
            }
        }, 1000);

        // Optional: Log a message to the browser console
        console.log('Button was clicked!');
    });


});

