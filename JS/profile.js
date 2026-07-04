// JS/profile.js

const Profile = {

    // Badge definitions — condition checked against real data
    badges: [
        {
            id: 'first-workout',
            icon: '🔥',
            name: 'First Workout',
            desc: 'Log your first session',
            check: (data) => data.workouts.length >= 1
        },
        {
            id: 'ten-workouts',
            icon: '💪',
            name: '10 Workouts',
            desc: 'Log 10 sessions',
            check: (data) => data.workouts.length >= 10
        },
        {
            id: 'seven-streak',
            icon: '📅',
            name: '7-Day Streak',
            desc: 'Work out 7 days in a row',
            check: (data) => Profile.calcStreak(data.workouts) >= 7
        },
        {
            id: 'fifty-sets',
            icon: '🏋️',
            name: '50 Sets Logged',
            desc: 'Complete 50 total sets',
            check: (data) => {
                let total = 0;
                data.workouts.forEach(w => (w.exercises || []).forEach(ex => total += (ex.sets || []).length));
                return total >= 50;
            }
        },
        {
            id: 'hundred-kg',
            icon: '⚖️',
            name: '100kg Club',
            desc: 'Lift 100kg in any exercise',
            check: (data) => Object.values(data.prs).some(w => w >= 100)
        },
        {
            id: 'set-pr',
            icon: '🥇',
            name: 'First PR',
            desc: 'Set a personal record',
            check: (data) => Object.keys(data.prs).length >= 1
        },
        {
            id: 'dark-mode',
            icon: '🌙',
            name: 'Night Owl',
            desc: 'Enable dark mode',
            check: () => Storage.get('theme') === 'dark'
        },
        {
            id: 'read-article',
            icon: '📚',
            name: 'Scholar',
            desc: 'Read an article',
            check: (data) => data.readArticle === true
        }
    ],

    calcStreak: (workouts) => {
        if (!workouts.length) return 0;
        const dates = [...new Set(workouts.map(w => w.date))].sort().reverse();
        let streak = 0, check = new Date(); check.setHours(0,0,0,0);
        for (const d of dates) {
            const wd = new Date(d); wd.setHours(0,0,0,0);
            const diff = Math.round((check - wd) / 86400000);
            if (diff === 0 || diff === 1) { streak++; check = wd; } else break;
        }
        return streak;
    },

    init: () => {
        if (!document.getElementById('badges-grid')) return;
        Profile.loadGoals();
        Profile.renderMiniStats();
        Profile.renderBadges();
        Profile.setupGoalsForm();
        Profile.setupExport();
        Profile.setupReset();
    },

    // ---- MINI STATS IN HEADER ----
    renderMiniStats: () => {
        const workouts = Storage.get('workouts') || [];
        const prs = Storage.get('prs') || {};
        const streak = Profile.calcStreak(workouts);

        const set = (id, val) => { const el = document.getElementById(id); if (el) el.innerText = val; };
        set('ph-workouts', `${workouts.length} workout${workouts.length !== 1 ? 's' : ''}`);
        set('ph-streak', `${streak} day streak`);
        set('ph-prs', `${Object.keys(prs).length} PR${Object.keys(prs).length !== 1 ? 's' : ''}`);
    },

    // ---- BADGES ----
    renderBadges: () => {
        const grid = document.getElementById('badges-grid');
        const data = {
            workouts: Storage.get('workouts') || [],
            prs: Storage.get('prs') || {},
            readArticle: Storage.get('readArticle') || false
        };

        grid.innerHTML = Profile.badges.map(badge => {
            const earned = badge.check(data);
            return `
                <div class="badge ${earned ? 'earned' : 'locked'}" title="${badge.desc}">
                    <div class="badge-icon">${badge.icon}</div>
                    <p>${badge.name}</p>
                    ${earned ? '<span class="badge-earned-label">Earned ✓</span>' : '<span class="badge-locked-label">Locked</span>'}
                </div>
            `;
        }).join('');
    },

    // ---- GOALS FORM ----
    loadGoals: () => {
        const profile = Storage.get('profile') || {};
        if (profile.name) {
            const nameInput = document.getElementById('profile-name-input');
            if (nameInput) nameInput.value = profile.name;
            const nameEl = document.getElementById('profile-name');
            if (nameEl) nameEl.innerText = profile.name;

            // Update avatar initials
            const avatar = document.getElementById('profile-avatar');
            if (avatar && profile.name) {
                const parts = profile.name.trim().split(' ');
                avatar.innerText = parts.map(p => p[0]).join('').toUpperCase().slice(0, 2);
            }
        }
        if (profile.targetWeight) {
            const el = document.getElementById('target-weight');
            if (el) el.value = profile.targetWeight;
        }
        if (profile.weeklyGoal) {
            const el = document.getElementById('weekly-workouts');
            if (el) el.value = profile.weeklyGoal;
        }
        if (profile.program) {
            const el = document.getElementById('current-program');
            if (el) el.value = profile.program;
        }
    },

    setupGoalsForm: () => {
        const form = document.getElementById('goals-form');
        if (!form) return;
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('profile-name-input').value.trim();
            const profile = {
                name: name || 'Ayush Singh Pawar',
                targetWeight: document.getElementById('target-weight').value,
                weeklyGoal: document.getElementById('weekly-workouts').value,
                program: document.getElementById('current-program').value
            };
            Storage.save('profile', profile);

            // Update displayed name and avatar
            const nameEl = document.getElementById('profile-name');
            if (nameEl) nameEl.innerText = profile.name;
            const avatar = document.getElementById('profile-avatar');
            if (avatar && profile.name) {
                const parts = profile.name.trim().split(' ');
                avatar.innerText = parts.map(p => p[0]).join('').toUpperCase().slice(0, 2);
            }

            // Show saved toast
            const msg = document.getElementById('goals-toast');
            if (msg) {
                msg.style.display = 'block';
                setTimeout(() => msg.style.display = 'none', 2500);
            }
        });
    },

    // ---- EXPORT ----
    setupExport: () => {
        const btn = document.getElementById('export-data-btn');
        if (!btn) return;
        btn.addEventListener('click', () => {
            const data = {
                workouts: Storage.get('workouts') || [],
                prs: Storage.get('prs') || {},
                profile: Storage.get('profile') || {},
                exportedAt: new Date().toISOString()
            };
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `aspfit-data-${new Date().toISOString().split('T')[0]}.json`;
            a.click();
            URL.revokeObjectURL(url);
        });
    },

    // ---- RESET ----
    setupReset: () => {
        const btn = document.getElementById('reset-data-btn');
        if (!btn) return;
        btn.addEventListener('click', () => {
            if (confirm('⚠️ This will permanently delete ALL your workouts, PRs and goals. Are you sure?')) {
                localStorage.clear();
                window.location.href = 'index.html';
            }
        });
    }
};

document.addEventListener('DOMContentLoaded', Profile.init);
