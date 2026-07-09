// JS/app.js

// --- 1. Storage Helpers ---
const Storage = {
    save: (key, data) => localStorage.setItem(key, JSON.stringify(data)),
    get: (key) => {
        const d = localStorage.getItem(key);
        return d ? JSON.parse(d) : null;
    },
    init: () => {
        if (!Storage.get('workouts')) Storage.save('workouts', []);
        if (!Storage.get('customExercises')) Storage.save('customExercises', []);
        if (!Storage.get('prs')) Storage.save('prs', {});
        if (!Storage.get('profile')) Storage.save('profile', {
            name: "Ayush Singh Pawar",
            targetWeight: null,
            weeklyGoal: 5
        });
    }
};

// --- 2. Theme Management ---
const ThemeManager = {
    updateBtn: () => {
        const btn = document.querySelector('.nav-theme-btn');
        if (btn) btn.innerText = document.body.classList.contains('dark-theme') ? '☀️ Theme' : '🌙 Theme';
    },
    init: () => {
        if (Storage.get('theme') === 'dark') {
            document.body.classList.add('dark-theme');
            document.documentElement.classList.add('dark-theme');
        }
        ThemeManager.updateBtn();
    },
    toggle: () => {
        document.body.classList.toggle('dark-theme');
        document.documentElement.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        Storage.save('theme', isDark ? 'dark' : 'light');
        ThemeManager.updateBtn();
    }
};
window.toggleTheme = ThemeManager.toggle;

// --- 3. PWA Service Worker Registration ---
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./service-worker.js')
            .then(registration => {
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
            })
            .catch(err => {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}

// --- 3. Stats Calculations ---
const Stats = {
    getTotalWorkouts: () => (Storage.get('workouts') || []).length,

    getStreak: () => {
        const workouts = Storage.get('workouts') || [];
        if (workouts.length === 0) return 0;
        const dates = [...new Set(workouts.map(w => w.date))].sort().reverse();
        let streak = 0;
        let check = new Date(); check.setHours(0,0,0,0);
        for (const d of dates) {
            const wd = new Date(d); wd.setHours(0,0,0,0);
            const diff = Math.round((check - wd) / 86400000);
            if (diff === 0 || diff === 1) { streak++; check = wd; } else break;
        }
        return streak;
    },

    getTotalVolume: () => {
        const workouts = Storage.get('workouts') || [];
        let vol = 0;
        workouts.forEach(w => {
            (w.exercises || []).forEach(ex => {
                (ex.sets || []).forEach(s => {
                    if (s.done) vol += (parseFloat(s.kg) || 0) * (parseInt(s.reps) || 0);
                });
            });
        });
        return vol >= 1000 ? (vol / 1000).toFixed(1) + 'k' : vol;
    },

    getPRCount: () => Object.keys(Storage.get('prs') || {}).length
};

// --- 4. Dashboard Logic ---
const Dashboard = {
    quotes: [
        "The only bad workout is the one that didn't happen.",
        "Discipline is doing what you hate to do, but doing it like you love it.",
        "It never gets easier, you just get stronger.",
        "Don't stop when you're tired. Stop when you're done.",
        "Your body can stand almost anything. It's your mind that you have to convince.",
        "Train insane or remain the same.",
        "Wake up. Work out. Look hot. Kick ass. Repeat."
    ],
    tasks: [
        "Hit 10k steps today.",
        "Drink 3 Liters of water.",
        "Stretch for 10 minutes before bed.",
        "Eat 1g of protein per pound of bodyweight.",
        "Get 8 hours of sleep tonight.",
        "Do a 5-minute meditation after your workout.",
        "Prep your meals for tomorrow."
    ],

    init: () => {
        Dashboard.renderQuoteAndTask();
        Dashboard.renderStats();
        Dashboard.renderStreak();
        Dashboard.renderRecentWorkouts();
    },

    renderQuoteAndTask: () => {
        const quoteEl = document.getElementById('daily-quote');
        const taskEl = document.getElementById('daily-task-text');
        if (!quoteEl || !taskEl) return;
        const day = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
        quoteEl.innerText = `"${Dashboard.quotes[day % Dashboard.quotes.length]}"`;
        taskEl.innerText = Dashboard.tasks[day % Dashboard.tasks.length];
    },

    renderStats: () => {
        const ids = {
            'stat-workouts': Stats.getTotalWorkouts(),
            'stat-streak': Stats.getStreak(),
            'stat-volume': Stats.getTotalVolume(),
            'stat-prs': Stats.getPRCount()
        };
        Object.entries(ids).forEach(([id, val]) => {
            const el = document.getElementById(id);
            if (el) el.innerText = val;
        });
    },

    renderStreak: () => {
        const el = document.getElementById('streak-badge');
        if (!el) return;
        const s = Stats.getStreak();
        el.innerText = s > 0 ? `🔥 ${s} Day Streak!` : '💪 Start Your Streak Today!';
    },

    renderRecentWorkouts: () => {
        const container = document.getElementById('recent-workouts-list');
        if (!container) return;
        const workouts = Storage.get('workouts') || [];
        if (workouts.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <p>No workouts logged yet.</p>
                    <a href="tracker.html" class="btn-primary" style="display:inline-block;margin-top:0.75rem;text-decoration:none;">Log Your First Workout →</a>
                </div>`;
            return;
        }
        const recent = [...workouts].reverse().slice(0, 3);
        container.innerHTML = recent.map(w => {
            const sets = (w.exercises || []).reduce((s, ex) => s + (ex.sets || []).length, 0);
            return `
            <div class="activity-card card">
                <div>
                    <strong>${w.split || 'Workout'}</strong>
                    <span style="display:block;color:var(--text-secondary);font-size:0.85rem;margin-top:2px;">
                        ${(w.exercises || []).length} exercise${(w.exercises||[]).length !== 1 ? 's' : ''} &bull; ${sets} sets
                    </span>
                </div>
                <span style="font-size:0.8rem;color:var(--text-secondary);">${w.date || ''}</span>
            </div>`;
        }).join('');
    }
};

// --- 5. App Init ---
document.addEventListener('DOMContentLoaded', () => {
    Storage.init();
    ThemeManager.init();
    Dashboard.init();
});