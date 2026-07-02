// JS/app.js

// --- 1. Database (localStorage) Helpers ---
const Storage = {
    save: (key, data) => {
        localStorage.setItem(key, JSON.stringify(data));
    },
    get: (key) => {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    },
    init: () => {
        if (!Storage.get('workouts')) Storage.save('workouts', []);
        if (!Storage.get('customExercises')) Storage.save('customExercises', []);
        if (!Storage.get('profile')) Storage.save('profile', {
            name: "Ayush Singh Pawar",
            targetWeight: null,
            weeklyGoal: 5
        });
    }
};

// --- 2. Theme Management ---
// Defined early so toggleTheme() is available as soon as the page loads
const ThemeManager = {
    init: () => {
        const savedTheme = Storage.get('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
        }
    },
    toggle: () => {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        Storage.save('theme', isDark ? 'dark' : 'light');
    }
};
window.toggleTheme = ThemeManager.toggle;

// --- 3. Dashboard Logic (Daily Quote, Task & Dynamic Data) ---
const Dashboard = {
    quotes: [
        "The only bad workout is the one that didn't happen.",
        "Discipline is doing what you hate to do, but doing it like you love it.",
        "It never gets easier, you just get stronger.",
        "Don't stop when you're tired. Stop when you're done.",
        "Your body can stand almost anything. It's your mind that you have to convince."
    ],
    tasks: [
        "Hit 10k steps today.",
        "Drink 3 Liters of water.",
        "Stretch for 10 minutes before bed.",
        "Eat 1g of protein per pound of bodyweight.",
        "Get 8 hours of sleep tonight."
    ],

    init: () => {
        Dashboard.renderQuoteAndTask();
        Dashboard.renderRecentWorkouts();
        Dashboard.renderStreak();
    },

    renderQuoteAndTask: () => {
        const quoteEl = document.getElementById('daily-quote');
        const taskEl = document.getElementById('daily-task-text');
        if (!quoteEl || !taskEl) return;

        const today = new Date();
        const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
        quoteEl.innerText = `"${Dashboard.quotes[dayOfYear % Dashboard.quotes.length]}"`;
        taskEl.innerText = Dashboard.tasks[dayOfYear % Dashboard.tasks.length];
    },

    renderRecentWorkouts: () => {
        const container = document.getElementById('recent-workouts-list');
        if (!container) return;

        const workouts = Storage.get('workouts') || [];

        if (workouts.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <p>No workouts logged yet.</p>
                    <a href="tracker.html" class="btn-primary" style="display:inline-block; margin-top:0.75rem; text-decoration:none;">Log Your First Workout →</a>
                </div>`;
            return;
        }

        // Show last 3 workouts (most recent first)
        const recent = [...workouts].reverse().slice(0, 3);
        container.innerHTML = recent.map(w => {
            const totalSets = w.exercises.reduce((sum, ex) => sum + ex.sets.length, 0);
            return `
                <div class="activity-card card">
                    <div>
                        <strong>${w.split} Day</strong>
                        <span style="display:block; color:var(--text-secondary); font-size:0.875rem; margin-top:2px;">
                            ${w.exercises.length} exercise${w.exercises.length !== 1 ? 's' : ''} &bull; ${totalSets} sets
                        </span>
                    </div>
                    <span style="font-size:0.8rem; color:var(--text-secondary);">${w.date}</span>
                </div>`;
        }).join('');
    },

    calculateStreak: () => {
        const workouts = Storage.get('workouts') || [];
        if (workouts.length === 0) return 0;

        // Get unique workout dates sorted descending
        const dates = [...new Set(workouts.map(w => w.date))].sort().reverse();
        let streak = 0;
        let checkDate = new Date();
        checkDate.setHours(0, 0, 0, 0);

        for (const dateStr of dates) {
            const workoutDate = new Date(dateStr);
            workoutDate.setHours(0, 0, 0, 0);
            const diffDays = Math.round((checkDate - workoutDate) / (1000 * 60 * 60 * 24));

            if (diffDays === 0 || diffDays === 1) {
                streak++;
                checkDate = workoutDate;
            } else {
                break;
            }
        }
        return streak;
    },

    renderStreak: () => {
        const streakEl = document.getElementById('streak-badge');
        if (!streakEl) return;
        const streak = Dashboard.calculateStreak();
        if (streak > 0) {
            streakEl.innerText = `🔥 ${streak} Day Streak`;
            streakEl.style.display = 'inline-block';
        } else {
            streakEl.innerText = `💪 Start Your Streak Today!`;
        }
    }
};

// --- 4. App Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    Storage.init();
    ThemeManager.init();
    Dashboard.init();
});
