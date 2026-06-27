// JS/tracker.js

const Tracker = {
    init: () => {
        // Only run this script if we are on the tracker page
        const form = document.getElementById('workout-form');
        if (!form) return;

        // 1. Set today's date automatically in the input field
        document.getElementById('workout-date').valueAsDate = new Date();

        // 2. Set up the '+ Add Exercise' button
        document.getElementById('add-exercise-btn').addEventListener('click', Tracker.addExerciseBlock);

        // 3. Set up the 'Finish Workout' submit event
        form.addEventListener('submit', Tracker.saveWorkout);

        // 4. Set up the Rest Timer
        document.getElementById('start-timer-btn').addEventListener('click', Tracker.startTimer);
    },

    addExerciseBlock: () => {
        const container = document.getElementById('exercise-list-container');
        
        // Create a new exercise block
        const block = document.createElement('div');
        block.className = 'exercise-block';
        block.style.marginTop = '20px';
        block.style.paddingTop = '20px';
        block.style.borderTop = '1px solid var(--border-color)';
        
        // HTML structure for the new block
        block.innerHTML = `
            <input type="text" placeholder="Exercise Name (e.g. Squat)" class="exercise-name-input" required style="width: 100%; margin-bottom: 10px; padding: 0.5rem; border-radius: 8px; border: 1px solid var(--border-color);">
            <div class="set-row">
                <span class="set-number" style="margin-right: 10px; font-weight: 500;">Set 1</span>
                <input type="number" placeholder="kg" class="weight-input" required style="width: 80px; margin-right: 5px;">
                <input type="number" placeholder="reps" class="reps-input" required style="width: 80px; margin-right: 5px;">
                <input type="checkbox" class="done-check" style="transform: scale(1.2);">
            </div>
            <button type="button" class="btn-secondary add-set-btn" style="margin-top: 15px; font-size: 0.8rem; padding: 0.5rem 1rem;">+ Add Set</button>
        `;

        // Add event listener to the "+ Add Set" button inside this new block
        const addSetBtn = block.querySelector('.add-set-btn');
        addSetBtn.addEventListener('click', () => {
            const setRows = block.querySelectorAll('.set-row');
            const newSetNum = setRows.length + 1;
            
            const newSet = document.createElement('div');
            newSet.className = 'set-row';
            newSet.style.marginTop = '10px';
            newSet.innerHTML = `
                <span class="set-number" style="margin-right: 10px; font-weight: 500;">Set ${newSetNum}</span>
                <input type="number" placeholder="kg" class="weight-input" required style="width: 80px; margin-right: 5px;">
                <input type="number" placeholder="reps" class="reps-input" required style="width: 80px; margin-right: 5px;">
                <input type="checkbox" class="done-check" style="transform: scale(1.2);">
            `;
            // Insert it right before the "Add Set" button
            block.insertBefore(newSet, addSetBtn);
        });

        container.appendChild(block);
    },

    startTimer: () => {
        const btn = document.getElementById('start-timer-btn');
        let timeLeft = 60; // 60 seconds rest timer
        
        // Prevent clicking multiple times
        if (btn.disabled) return;
        
        btn.disabled = true;
        btn.style.backgroundColor = '#10B981'; // Turn green
        
        const timerInterval = setInterval(() => {
            btn.innerText = `⏱ Rest: ${timeLeft}s`;
            timeLeft--;

            if (timeLeft < 0) {
                clearInterval(timerInterval);
                btn.innerText = "⏱ Start Rest Timer";
                btn.disabled = false;
                btn.style.backgroundColor = "var(--accent-blue)";
                
                // Play a simple beep sound
                const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
                const oscillator = audioCtx.createOscillator();
                oscillator.type = 'sine';
                oscillator.frequency.setValueAtTime(800, audioCtx.currentTime);
                oscillator.connect(audioCtx.destination);
                oscillator.start();
                oscillator.stop(audioCtx.currentTime + 0.5);
                
                alert("Rest time is up! Get back to work! 💪");
            }
        }, 1000);
    },

    saveWorkout: (e) => {
        e.preventDefault(); // Stop the page from reloading
        
        const date = document.getElementById('workout-date').value;
        const split = document.getElementById('workout-type').value;
        
        // Gather all exercises and sets
        const exercises = [];
        const blocks = document.querySelectorAll('.exercise-block');
        
        blocks.forEach(block => {
            // Check if it's the hardcoded block or a newly added one
            const nameInput = block.querySelector('.exercise-name-input');
            const name = nameInput ? nameInput.value : block.querySelector('h4').innerText;
            
            const sets = [];
            block.querySelectorAll('.set-row').forEach(row => {
                // Only save sets that were marked as "done" (checkbox checked)
                const isDone = row.querySelector('.done-check').checked;
                if (isDone) {
                    sets.push({
                        weight: row.querySelector('.weight-input').value,
                        reps: row.querySelector('.reps-input').value
                    });
                }
            });
            
            if (sets.length > 0) {
                exercises.push({ name, sets });
            }
        });

        if (exercises.length === 0) {
            alert("You didn't complete any sets! Make sure to check the boxes when a set is done.");
            return;
        }

        const workoutData = {
            id: Date.now(),
            date: date,
            split: split,
            exercises: exercises
        };

        // Save it using the Storage object from app.js
        let allWorkouts = Storage.get('workouts') || [];
        allWorkouts.push(workoutData);
        Storage.save('workouts', allWorkouts);

        alert("Workout saved successfully! 🚀");
        
        // Redirect to dashboard
        window.location.href = "index.html";
    }
};

// Initialize when the page loads
document.addEventListener('DOMContentLoaded', Tracker.init);