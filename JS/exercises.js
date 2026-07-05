// JS/exercises.js

const ExerciseLibrary = {

    // All built-in exercises as a data array
    builtIn: [
        // CHEST
        { name: 'Barbell Bench Press',    muscle: 'Chest',     sets: '4 × 8–10', difficulty: 'Beginner' },
        { name: 'Incline Dumbbell Press', muscle: 'Chest',     sets: '3 × 10–12', difficulty: 'Intermediate' },
        { name: 'Cable Chest Fly',        muscle: 'Chest',     sets: '3 × 12–15', difficulty: 'Beginner' },
        { name: 'Dips (Chest)',           muscle: 'Chest',     sets: '3 × 10–15', difficulty: 'Intermediate' },
        { name: 'Push-Ups',               muscle: 'Chest',     sets: '3 × 15–20', difficulty: 'Beginner' },
        // BACK
        { name: 'Pull-Ups',              muscle: 'Back',      sets: '4 × 6–10',  difficulty: 'Intermediate' },
        { name: 'Barbell Deadlift',       muscle: 'Back',      sets: '4 × 5',     difficulty: 'Advanced' },
        { name: 'Seated Cable Row',       muscle: 'Back',      sets: '3 × 10–12', difficulty: 'Beginner' },
        { name: 'Lat Pulldown',           muscle: 'Back',      sets: '3 × 10–12', difficulty: 'Beginner' },
        { name: 'Dumbbell Row',           muscle: 'Back',      sets: '3 × 10–12', difficulty: 'Beginner' },
        { name: 'T-Bar Row',              muscle: 'Back',      sets: '4 × 8–10',  difficulty: 'Intermediate' },
        { name: 'Face Pulls',             muscle: 'Back',      sets: '3 × 15–20', difficulty: 'Beginner' },
        // LEGS
        { name: 'Barbell Squat',         muscle: 'Legs',      sets: '4 × 6–8',   difficulty: 'Intermediate' },
        { name: 'Romanian Deadlift',      muscle: 'Legs',      sets: '3 × 10–12', difficulty: 'Intermediate' },
        { name: 'Leg Press',              muscle: 'Legs',      sets: '4 × 10–15', difficulty: 'Beginner' },
        { name: 'Bulgarian Split Squat',  muscle: 'Legs',      sets: '3 × 8–10',  difficulty: 'Advanced' },
        { name: 'Leg Curl',               muscle: 'Legs',      sets: '3 × 12–15', difficulty: 'Beginner' },
        { name: 'Leg Extension',          muscle: 'Legs',      sets: '3 × 12–15', difficulty: 'Beginner' },
        { name: 'Calf Raises',            muscle: 'Legs',      sets: '4 × 15–20', difficulty: 'Beginner' },
        // SHOULDERS
        { name: 'Overhead Press',        muscle: 'Shoulders', sets: '4 × 6–8',   difficulty: 'Intermediate' },
        { name: 'Lateral Raises',         muscle: 'Shoulders', sets: '3 × 15–20', difficulty: 'Beginner' },
        { name: 'Arnold Press',           muscle: 'Shoulders', sets: '3 × 10–12', difficulty: 'Intermediate' },
        { name: 'Rear Delt Fly',          muscle: 'Shoulders', sets: '3 × 15',    difficulty: 'Beginner' },
        { name: 'Upright Row',            muscle: 'Shoulders', sets: '3 × 10–12', difficulty: 'Intermediate' },
        // ARMS
        { name: 'Barbell Curl',          muscle: 'Arms',      sets: '3 × 10–12', difficulty: 'Beginner' },
        { name: 'Tricep Pushdown',        muscle: 'Arms',      sets: '3 × 12–15', difficulty: 'Beginner' },
        { name: 'Hammer Curl',            muscle: 'Arms',      sets: '3 × 12',    difficulty: 'Beginner' },
        { name: 'Skull Crushers',         muscle: 'Arms',      sets: '3 × 10–12', difficulty: 'Intermediate' },
        { name: 'Concentration Curl',     muscle: 'Arms',      sets: '3 × 12',    difficulty: 'Beginner' },
        { name: 'Dips (Triceps)',         muscle: 'Arms',      sets: '3 × 10–15', difficulty: 'Intermediate' },
        // CORE
        { name: 'Plank',                 muscle: 'Core',      sets: '3 × 60s',   difficulty: 'Beginner' },
        { name: 'Cable Crunch',           muscle: 'Core',      sets: '3 × 15–20', difficulty: 'Beginner' },
        { name: 'Hanging Leg Raise',      muscle: 'Core',      sets: '3 × 12–15', difficulty: 'Intermediate' },
        { name: 'Ab Wheel Rollout',       muscle: 'Core',      sets: '3 × 10',    difficulty: 'Advanced' },
        { name: 'Russian Twist',          muscle: 'Core',      sets: '3 × 20',    difficulty: 'Beginner' },
        { name: 'Hollow Body Hold',       muscle: 'Core',      sets: '3 × 30s',   difficulty: 'Intermediate' },
    ],

    currentFilter: 'All',
    currentSearch: '',

    init: () => {
        if (!document.getElementById('exercise-grid')) return;
        ExerciseLibrary.render();
        ExerciseLibrary.setupFilters();
        ExerciseLibrary.setupSearch();
        ExerciseLibrary.setupCustomForm();
    },

    // ---- RENDER ----
    getFiltered: () => {
        const custom = (Storage.get('customExercises') || []).map(e => ({ ...e, custom: true }));
        const all = [...ExerciseLibrary.builtIn, ...custom];
        const q = ExerciseLibrary.currentSearch.toLowerCase();
        const m = ExerciseLibrary.currentFilter;
        return all.filter(ex =>
            (m === 'All' || ex.muscle === m) &&
            (!q || ex.name.toLowerCase().includes(q))
        );
    },

    render: () => {
        const grid = document.getElementById('exercise-grid');
        const countEl = document.getElementById('exercise-count');
        const exercises = ExerciseLibrary.getFiltered();

        if (countEl) countEl.innerText = `${exercises.length} exercise${exercises.length !== 1 ? 's' : ''}`;

        if (exercises.length === 0) {
            grid.innerHTML = `
                <div class="empty-state" style="grid-column:1/-1;">
                    <p>No exercises found. Try a different filter or search.</p>
                </div>`;
            return;
        }

        grid.innerHTML = exercises.map(ex => `
            <div class="exercise-card card ${ex.custom ? 'custom-ex-card' : ''}" data-muscle="${ex.muscle}">
                <div class="exercise-card-top">
                    <span class="muscle-tag">${ex.muscle}</span>
                    <span class="difficulty-tag ${ex.difficulty ? ex.difficulty.toLowerCase() : 'beginner'}">${ex.difficulty || 'Custom'}</span>
                </div>
                <h3>${ex.name}${ex.custom ? ' <span class="custom-label">Custom</span>' : ''}</h3>
                <p class="sets-info">${ex.sets || '—'}</p>
                <button class="btn-add-to-workout" onclick="ExerciseLibrary.addToWorkout('${ex.name.replace(/'/g, "\\'")}')">
                    + Add to Workout
                </button>
            </div>
        `).join('');
    },

    // ---- FILTER ----
    setupFilters: () => {
        document.querySelectorAll('#filter-bar .filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('#filter-bar .filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                ExerciseLibrary.currentFilter = btn.dataset.muscle;
                ExerciseLibrary.render();
            });
        });
    },

    // ---- SEARCH ----
    setupSearch: () => {
        const input = document.getElementById('exercise-search');
        if (!input) return;
        input.addEventListener('input', () => {
            ExerciseLibrary.currentSearch = input.value.trim();
            // Reset filter to All when searching
            if (ExerciseLibrary.currentSearch) {
                document.querySelectorAll('#filter-bar .filter-btn').forEach(b => b.classList.remove('active'));
                document.querySelector('#filter-bar .filter-btn[data-muscle="All"]').classList.add('active');
                ExerciseLibrary.currentFilter = 'All';
            }
            ExerciseLibrary.render();
        });
    },

    // ---- CUSTOM EXERCISE FORM ----
    setupCustomForm: () => {
        const form = document.getElementById('add-custom-exercise-form');
        if (!form) return;
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('custom-ex-name').value.trim();
            const muscle = document.getElementById('custom-ex-muscle').value;
            if (!name) return;
            const list = Storage.get('customExercises') || [];
            list.push({ name, muscle, difficulty: 'Custom', sets: '3 × 10–12', custom: true });
            Storage.save('customExercises', list);
            form.reset();
            ExerciseLibrary.currentFilter = 'All';
            ExerciseLibrary.currentSearch = '';
            document.querySelector('#filter-bar .filter-btn[data-muscle="All"]').classList.add('active');
            ExerciseLibrary.render();
            ExerciseLibrary.showToast(`✅ "${name}" added to your library!`);
        });
    },

    // ---- ADD TO WORKOUT ----
    addToWorkout: (name) => {
        // Store the exercise name in sessionStorage, then go to tracker
        const pending = JSON.parse(sessionStorage.getItem('pendingExercises') || '[]');
        if (!pending.includes(name)) {
            pending.push(name);
            sessionStorage.setItem('pendingExercises', JSON.stringify(pending));
        }
        ExerciseLibrary.showToast(`💪 "${name}" added! Go to Tracker to log it.`);
    },

    // ---- TOAST ----
    showToast: (msg) => {
        const toast = document.getElementById('ex-toast');
        if (!toast) return;
        toast.innerText = msg;
        toast.className = 'toast toast-success show';
        setTimeout(() => toast.classList.remove('show'), 3000);
    }
};

document.addEventListener('DOMContentLoaded', ExerciseLibrary.init);
