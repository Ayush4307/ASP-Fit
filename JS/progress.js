// JS/progress.js

const Progress = {
    init: () => {
        if (!document.getElementById('volumeChart')) return;
        Progress.renderSummaryStats();
        Progress.renderChart();
        Progress.renderHeatmap();
        Progress.renderPRs();
    },

    // ---- SUMMARY STATS ----
    renderSummaryStats: () => {
        const workouts = Storage.get('workouts') || [];
        const prs = Storage.get('prs') || {};

        let totalVolume = 0;
        workouts.forEach(w => {
            (w.exercises || []).forEach(ex => {
                (ex.sets || []).forEach(s => {
                    if (s.done !== false) {
                        totalVolume += (parseFloat(s.kg) || parseFloat(s.weight) || 0) * (parseInt(s.reps) || 0);
                    }
                });
            });
        });

        const streak = Progress.calcStreak(workouts);

        const set = (id, val) => { const el = document.getElementById(id); if (el) el.innerText = val; };
        set('p-total', workouts.length);
        set('p-volume', totalVolume >= 1000 ? (totalVolume / 1000).toFixed(1) + 'k' : totalVolume);
        set('p-streak', streak);
        set('p-prs', Object.keys(prs).length);
    },

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

    // ---- VOLUME CHART ----
    renderChart: () => {
        const ctx = document.getElementById('volumeChart').getContext('2d');
        const workouts = Storage.get('workouts') || [];

        const volumeByDate = {};
        workouts.forEach(w => {
            let vol = 0;
            (w.exercises || []).forEach(ex => {
                (ex.sets || []).forEach(s => {
                    vol += (parseFloat(s.kg) || parseFloat(s.weight) || 0) * (parseInt(s.reps) || 0);
                });
            });
            volumeByDate[w.date] = (volumeByDate[w.date] || 0) + vol;
        });

        const labels = Object.keys(volumeByDate).sort().slice(-10);
        const data = labels.map(d => volumeByDate[d]);

        if (labels.length === 0) {
            labels.push('No Data Yet');
            data.push(0);
        }

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels,
                datasets: [{
                    label: 'Volume (kg)',
                    data,
                    backgroundColor: 'rgba(37,99,235,0.8)',
                    borderRadius: 6,
                    borderSkipped: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: 'rgba(0,0,0,0.05)' },
                        ticks: { color: '#64748B' }
                    },
                    x: {
                        grid: { display: false },
                        ticks: { color: '#64748B', maxRotation: 45 }
                    }
                }
            }
        });
    },

    // ---- CONSISTENCY HEATMAP ----
    renderHeatmap: () => {
        const container = document.getElementById('consistency-heatmap');
        if (!container) return;

        const workouts = Storage.get('workouts') || [];
        const workoutDates = new Set(workouts.map(w => w.date));

        // Build last 12 weeks (84 days) grid
        const cells = [];
        const today = new Date();
        today.setHours(0,0,0,0);

        for (let i = 83; i >= 0; i--) {
            const d = new Date(today);
            d.setDate(today.getDate() - i);
            const dateStr = d.toISOString().split('T')[0];
            const hasWorkout = workoutDates.has(dateStr);
            cells.push({ date: dateStr, active: hasWorkout });
        }

        container.innerHTML = cells.map(c => {
            const level = c.active ? 'level-3' : 'level-0';
            return `<div class="heatmap-cell ${level}" title="${c.date}"></div>`;
        }).join('');
    },

    // ---- PERSONAL RECORDS ----
    renderPRs: () => {
        const prList = document.getElementById('pr-list');
        if (!prList) return;

        const prs = Storage.get('prs') || {};
        const entries = Object.entries(prs);

        if (entries.length === 0) {
            prList.innerHTML = `
                <div class="empty-state">
                    <p>No PRs yet. Log a workout to set your first record!</p>
                    <a href="tracker.html" class="btn-primary" style="display:inline-block;margin-top:0.75rem;text-decoration:none;">Start Logging →</a>
                </div>`;
            return;
        }

        // Sort by weight descending
        entries.sort((a, b) => b[1] - a[1]);

        prList.innerHTML = entries.map(([name, weight]) => `
            <li class="pr-item">
                <div class="pr-info">
                    <strong>${name}</strong>
                    <span>${weight} kg</span>
                </div>
                <span class="pr-badge">🏆 PR</span>
            </li>
        `).join('');
    }
};

document.addEventListener('DOMContentLoaded', Progress.init);