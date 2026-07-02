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

// --- 3. Dashboard Logic (Daily Quote & Task) ---
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
        const quoteEl = document.getElementById('daily-quote');
        const taskEl = document.getElementById('daily-task-text');

        if (quoteEl && taskEl) {
            const today = new Date();
            const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);

            const randomQuote = Dashboard.quotes[dayOfYear % Dashboard.quotes.length];
            const randomTask = Dashboard.tasks[dayOfYear % Dashboard.tasks.length];

            quoteEl.innerText = `"${randomQuote}"`;
            taskEl.innerText = randomTask;
        }
    }
};

// --- 4. App Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    Storage.init();
    ThemeManager.init();
    Dashboard.init();
});
