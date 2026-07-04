// JS/tracker.js

const Tracker = {

    restDuration: 60,
    restInterval: null,
    restTimeLeft: 60,
    stopwatchTime: 0,
    stopwatchInterval: null,

    init: () => {
        const form = document.getElementById('workout-form');
        if (!form) return;

        // Set today's date
        document.getElementById('workout-date').valueAsDate = new Date();

        // Stopwatch buttons
        document.getElementById('sw-start-btn').addEventListener('click', Tracker.startStopwatch);
        document.getElementById('sw-stop-btn').addEventListener('click', Tracker.stopStopwatch);
        document.getElementById('sw-reset-btn').addEventListener('click', Tracker.resetStopwatch);

        // Rest timer duration selector
        document.querySelectorAll('.rest-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.rest-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                Tracker.restDuration = parseInt(btn.dataset.secs);
                Tracker.restTimeLeft = Tracker.restDuration;
                Tracker.updateRestDisplay();
            });
        });

        // Rest timer start
        document.getElementById('start-timer-btn').addEventListener('click', Tracker.startRestTimer);

        // Add exercise button
        document.getElementById('add-exercise-btn').addEventListener('click', Tracker.addExerciseBlock);

        // Form submit
        form.addEventListener('submit', Tracker.saveWorkout);

        // Add a default exercise block on load
        Tracker.addExerciseBlock();
    },

    // ---- STOPWATCH ----
    updateStopwatchDisplay: () => {
        const h = Math.floor(Tracker.stopwatchTime / 3600);
        const m = Math.floor((Tracker.stopwatchTime % 3600) / 60);
        const s = Tracker.stopwatchTime % 60;
        document.getElementById('stopwatch-display').innerText =
            `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
    },
    startStopwatch: () => {
        if (!Tracker.stopwatchInterval) {
            Tracker.stopwatchInterval = setInterval(() => {
                Tracker.stopwatchTime++;
                Tracker.updateStopwatchDisplay();
            }, 1000);
        }
    },
    stopStopwatch: () => {
        clearInterval(Tracker.stopwatchInterval);
        Tracker.stopwatchInterval = null;
    },
    resetStopwatch: () => {
        Tracker.stopStopwatch();
        Tracker.stopwatchTime = 0;
        Tracker.updateStopwatchDisplay();
    },

    // ---- REST TIMER ----
    updateRestDisplay: () => {
        const m = Math.floor(Tracker.restTimeLeft / 60);
        const s = Tracker.restTimeLeft % 60;
        const el = document.getElementById('rest-display');
        if (el) el.innerText = `${m}:${String(s).padStart(2,'0')}`;
    },
    startRestTimer: () => {
        if (Tracker.restInterval) {
            clearInterval(Tracker.restInterval);
            Tracker.restInterval = null;
        }
        Tracker.restTimeLeft = Tracker.restDuration;
        const btn = document.getElementById('start-timer-btn');
        btn.innerText = 'Stop Rest';
        btn.classList.replace('btn-primary', 'btn-secondary');

        Tracker.restInterval = setInterval(() => {
            Tracker.restTimeLeft--;
            Tracker.updateRestDisplay();
            if (Tracker.restTimeLeft <= 0) {
                clearInterval(Tracker.restInterval);
                Tracker.restInterval = null;
                Tracker.restTimeLeft = Tracker.restDuration;
                Tracker.updateRestDisplay();
                btn.innerText = 'Start Rest';
                btn.classList.replace('btn-secondary', 'btn-primary');
                Tracker.beep();
                Tracker.showToast('⏱ Rest time over! Get back to it! 💪');
            }
        }, 1000);

        // Toggle to stop on second click
        btn.onclick = () => {
            if (Tracker.restInterval) {
                clearInterval(Tracker.restInterval);
                Tracker.restInterval = null;
                Tracker.restTimeLeft = Tracker.restDuration;
                Tracker.updateRestDisplay();
                btn.innerText = 'Start Rest';
                btn.classList.replace('btn-secondary', 'btn-primary');
                btn.onclick = Tracker.startRestTimer;
            }
        };
    },
    beep: () => {
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = ctx.createOscillator();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(880, ctx.currentTime);
            osc.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 0.4);
        } catch(e) {}
    },

    // ---- EXERCISE BLOCKS ----
    addExerciseBlock: () => {
        const container = document.getElementById('exercise-list-container');
        const blockId = `block-${Date.now()}`;

        const block = document.createElement('div');
        block.className = 'exercise-block';
        block.id = blockId;
        block.innerHTML = `
            <div class="exercise-block-header">
                <input type="text" placeholder="Exercise name (e.g. Bench Press)" class="exercise-name-input" required>
                <button type="button" class="remove-block-btn" onclick="document.getElementById('${blockId}').remove()">✕</button>
            </div>
            <div class="sets-table-header">
                <span>Set</span>
                <span>kg</span>
                <span>Reps</span>
                <span>Done</span>
            </div>
            <div class="sets-container"></div>
            <button type="button" class="btn-add-set">+ Add Set</button>
        `;

        // Wire up + Add Set
        const setsContainer = block.querySelector('.sets-container');
        const addSetBtn = block.querySelector('.btn-add-set');
        addSetBtn.addEventListener('click', () => {
            const setNum = setsContainer.querySelectorAll('.set-row').length + 1;
            const row = document.createElement('div');
            row.className = 'set-row';
            row.innerHTML = `
                <span class="set-number">Set ${setNum}</span>
                <input type="number" placeholder="0" class="weight-input" min="0" step="0.5">
                <input type="number" placeholder="0" class="reps-input" min="0">
                <input type="checkbox" class="done-check">
            `;
            setsContainer.appendChild(row);
        });

        // Add first set automatically
        addSetBtn.click();
        container.appendChild(block);
    },

    // ---- SAVE WORKOUT ----
    saveWorkout: (e) => {
        e.preventDefault();
        const date = document.getElementById('workout-date').value;
        const split = document.getElementById('workout-type').value;
        const exercises = [];

        document.querySelectorAll('.exercise-block').forEach(block => {
            const nameInput = block.querySelector('.exercise-name-input');
            const name = nameInput ? nameInput.value.trim() : '';
            if (!name) return;

            const sets = [];
            block.querySelectorAll('.set-row').forEach(row => {
                const kg = row.querySelector('.weight-input').value;
                const reps = row.querySelector('.reps-input').value;
                const done = row.querySelector('.done-check').checked;
                sets.push({ kg: kg || '0', reps: reps || '0', done });
            });

            if (sets.length > 0) exercises.push({ name, sets });
        });

        if (exercises.length === 0) {
            Tracker.showToast('⚠️ Add at least one exercise!', true);
            return;
        }

        const workout = {
            id: Date.now(),
            date,
            split,
            exercises
        };

        const all = Storage.get('workouts') || [];
        all.push(workout);
        Storage.save('workouts', all);

        // Update PRs
        Tracker.updatePRs(exercises);

        Tracker.showToast('✅ Workout saved! Great work! 🔥');
        setTimeout(() => window.location.href = 'index.html', 1500);
    },

    updatePRs: (exercises) => {
        const prs = Storage.get('prs') || {};
        exercises.forEach(ex => {
            const bestKg = Math.max(...ex.sets.map(s => parseFloat(s.kg) || 0));
            if (!prs[ex.name] || bestKg > prs[ex.name]) {
                prs[ex.name] = bestKg;
            }
        });
        Storage.save('prs', prs);
    },

    showToast: (msg, isError = false) => {
        const toast = document.getElementById('toast');
        if (!toast) return;
        toast.innerText = msg;
        toast.className = `toast ${isError ? 'toast-error' : 'toast-success'} show`;
        setTimeout(() => toast.classList.remove('show'), 3000);
    }
};

document.addEventListener('DOMContentLoaded', Tracker.init);
