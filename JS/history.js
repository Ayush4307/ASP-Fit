// JS/history.js

const History = {

    currentFilter: 'All',
    currentSearch: '',

    init: () => {
        if (!document.getElementById('history-list')) return;
        History.setupSearch();
        History.setupFilters();
        History.render();
    },

    // ---- GET FILTERED WORKOUTS ----
    getFiltered: () => {
        const all = (Storage.get('workouts') || []).slice().reverse(); // newest first
        const q = History.currentSearch.toLowerCase();
        const s = History.currentFilter;

        return all.filter(w => {
            const matchSplit = s === 'All' || (w.split || '').toLowerCase().includes(s.toLowerCase());
            const matchSearch = !q ||
                (w.split || '').toLowerCase().includes(q) ||
                (w.exercises || []).some(ex => ex.name.toLowerCase().includes(q));
            return matchSplit && matchSearch;
        });
    },

    // ---- RENDER ----
    render: () => {
        const list = document.getElementById('history-list');
        const workouts = History.getFiltered();

        // Update summary bar
        History.updateSummary(workouts);

        if (workouts.length === 0) {
            list.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">📋</div>
                    <h3>No workouts found</h3>
                    <p>${History.currentFilter === 'All' && !History.currentSearch
                        ? "You haven't logged any workouts yet."
                        : "No workouts match your filter."}</p>
                    <a href="tracker.html" class="btn-primary" style="display:inline-block;margin-top:1rem;text-decoration:none;">
                        Start Your First Workout →
                    </a>
                </div>`;
            return;
        }

        list.innerHTML = workouts.map(w => History.renderCard(w)).join('');

        // Wire up toggle + delete buttons
        list.querySelectorAll('.hist-toggle-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.dataset.id;
                const body = document.getElementById(`hist-body-${id}`);
                const isOpen = body.classList.contains('open');
                body.classList.toggle('open', !isOpen);
                btn.innerText = isOpen ? '▼ Show exercises' : '▲ Hide exercises';
            });
        });

        list.querySelectorAll('.hist-delete-btn').forEach(btn => {
            btn.addEventListener('click', () => History.deleteWorkout(Number(btn.dataset.id)));
        });
    },

    renderCard: (w) => {
        const exercises = w.exercises || [];
        const totalSets = exercises.reduce((acc, ex) => acc + (ex.sets || []).length, 0);
        const totalVol = exercises.reduce((acc, ex) =>
            acc + (ex.sets || []).reduce((a, s) =>
                a + (parseFloat(s.kg) || parseFloat(s.weight) || 0) * (parseInt(s.reps) || 0), 0), 0);

        const dateFormatted = History.formatDate(w.date);
        const splitLabel = w.split || 'Workout';

        return `
            <div class="hist-card card" id="hist-card-${w.id}">
                <div class="hist-card-header">
                    <div class="hist-card-meta">
                        <div class="hist-date-badge">
                            <span class="hist-month">${dateFormatted.month}</span>
                            <span class="hist-day">${dateFormatted.day}</span>
                        </div>
                        <div>
                            <h3 class="hist-split-name">${splitLabel} Day</h3>
                            <p class="hist-stats-line">
                                ${exercises.length} exercise${exercises.length !== 1 ? 's' : ''} &nbsp;·&nbsp;
                                ${totalSets} set${totalSets !== 1 ? 's' : ''} &nbsp;·&nbsp;
                                ${totalVol > 0 ? totalVol.toLocaleString() + ' kg' : '—'}
                            </p>
                        </div>
                    </div>
                    <div class="hist-card-actions">
                        <button class="hist-toggle-btn" data-id="${w.id}">▼ Show exercises</button>
                        <button class="hist-delete-btn" data-id="${w.id}" title="Delete workout">🗑</button>
                    </div>
                </div>

                <!-- Collapsible exercise detail -->
                <div class="hist-card-body" id="hist-body-${w.id}">
                    ${exercises.map(ex => `
                        <div class="hist-exercise">
                            <p class="hist-ex-name">💪 ${ex.name}</p>
                            <div class="hist-sets">
                                ${(ex.sets || []).map((s, i) => `
                                    <div class="hist-set-row ${s.done ? 'done' : ''}">
                                        <span>Set ${i + 1}</span>
                                        <span>${s.kg || s.weight || 0} kg</span>
                                        <span>${s.reps || 0} reps</span>
                                        ${s.done ? '<span class="hist-done-tag">✓</span>' : ''}
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    },

    // ---- SUMMARY BAR ----
    updateSummary: (workouts) => {
        let totalVol = 0, totalSets = 0;
        workouts.forEach(w => {
            (w.exercises || []).forEach(ex => {
                (ex.sets || []).forEach(s => {
                    totalSets++;
                    totalVol += (parseFloat(s.kg) || parseFloat(s.weight) || 0) * (parseInt(s.reps) || 0);
                });
            });
        });
        const set = (id, val) => { const el = document.getElementById(id); if (el) el.innerText = val; };
        set('hist-count', `${workouts.length} workout${workouts.length !== 1 ? 's' : ''}`);
        set('hist-volume', `${totalVol > 0 ? totalVol.toLocaleString() : 0} kg total volume`);
        set('hist-sets', `${totalSets} total sets`);
    },

    // ---- DELETE ----
    deleteWorkout: (id) => {
        if (!confirm('Delete this workout? This cannot be undone.')) return;
        let all = Storage.get('workouts') || [];
        all = all.filter(w => w.id !== id);
        Storage.save('workouts', all);
        // Animate card out
        const card = document.getElementById(`hist-card-${id}`);
        if (card) {
            card.style.transition = 'opacity 0.3s, transform 0.3s';
            card.style.opacity = '0';
            card.style.transform = 'translateX(30px)';
            setTimeout(() => History.render(), 350);
        }
        History.showToast('🗑 Workout deleted');
    },

    // ---- SEARCH ----
    setupSearch: () => {
        const input = document.getElementById('history-search');
        if (!input) return;
        input.addEventListener('input', () => {
            History.currentSearch = input.value.trim();
            History.render();
        });
    },

    // ---- FILTER ----
    setupFilters: () => {
        document.querySelectorAll('#history-filter-bar .filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('#history-filter-bar .filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                History.currentFilter = btn.dataset.split;
                History.render();
            });
        });
    },

    // ---- HELPERS ----
    formatDate: (dateStr) => {
        const d = new Date(dateStr + 'T00:00:00');
        return {
            month: d.toLocaleString('default', { month: 'short' }).toUpperCase(),
            day: d.getDate(),
            full: d.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
        };
    },

    showToast: (msg) => {
        const t = document.getElementById('hist-toast');
        if (!t) return;
        t.innerText = msg;
        t.className = 'toast toast-success show';
        setTimeout(() => t.classList.remove('show'), 2500);
    }
};

document.addEventListener('DOMContentLoaded', History.init);
