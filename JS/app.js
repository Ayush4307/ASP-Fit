// js/app.js

// --- 1. Database (localStorage) Helpers ---
// This acts as our "backend" to save data directly in the browser
const Storage = {
    // Save data to localStorage
    save: (key, data) => {
        localStorage.setItem(key, JSON.stringify(data));
    },
    // Retrieve data from localStorage
    get: (key) => {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    },
    // Initialize default data if it's the user's first time opening the app
    init: () => {
        if (!Storage.get('workouts')) Storage.save('workouts', []);
        if (!Storage.get('profile')) Storage.save('profile', { 
            name: "Ayush Singh Pawar", 
            targetWeight: null, 
            weeklyGoal: 5 
        });
    }
};

// --- 2. Dashboard Logic (Daily Quote & Task) ---
const Dashboard = {
    quotes: [
        "The only bad workout is the one that didn't happen.",
        "Discipline is doing what you hate to do, but doing it like you love it.",
        "It never gets easier, you just get stronger.",
        "Don't stop when you're tired. Stop when you're done.",
        "Your body can stand almost anything. Itâ€™s your mind that you have to convince."
    ],
    tasks: [
        "Hit 10k steps today.",
        "Drink 3 Liters of water.",
        "Stretch for 10 minutes before bed.",
        "Eat 1g of protein per pound of bodyweight.",
        "Get 8 hours of sleep tonight."
    ],

    init: () => {
        // Only run this if we are on the dashboard (index.html)
        const quoteEl = document.getElementById('daily-quote');
        const taskEl = document.getElementById('daily-task-text');

        if (quoteEl && taskEl) {
            // Pick a random quote and task based on the current day of the year
            // This ensures they change daily, but stay the same throughout the same day
            const today = new Date();
            const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
            
            const randomQuote = Dashboard.quotes[dayOfYear % Dashboard.quotes.length];
            const randomTask = Dashboard.tasks[dayOfYear % Dashboard.tasks.length];

            quoteEl.innerText = `"${randomQuote}"`;
            taskEl.innerText = randomTask;
        }
    }
};

// --- 3. App Initialization ---
// This runs as soon as the web page loads
document.addEventListener('DOMContentLoaded', () => {
    Storage.init();
    ThemeManager.init();
    Dashboard.init();
});

// --- Theme Management ---
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
