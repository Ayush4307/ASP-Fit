// JS/progress.js

const Progress = {
    init: () => {
        // Only run if on the progress page
        const canvas = document.getElementById('volumeChart');
        if (!canvas) return;

        Progress.renderChart();
        Progress.renderPRs();
    },

    renderChart: () => {
        const ctx = document.getElementById('volumeChart').getContext('2d');
        const workouts = Storage.get('workouts') || [];
        
        // Calculate total volume (weight x reps) for each date
        const volumeByDate = {};
        
        workouts.forEach(workout => {
            let sessionVolume = 0;
            workout.exercises.forEach(ex => {
                ex.sets.forEach(set => {
                    sessionVolume += (parseFloat(set.weight) * parseInt(set.reps));
                });
            });
            
            if (volumeByDate[workout.date]) {
                volumeByDate[workout.date] += sessionVolume;
            } else {
                volumeByDate[workout.date] = sessionVolume;
            }
        });

        const labels = Object.keys(volumeByDate).sort(); // X-axis: Dates
        const dataPoints = labels.map(date => volumeByDate[date]); // Y-axis: Volume

        if (labels.length === 0) {
            labels.push("No Data");
            dataPoints.push(0);
        }

        // Draw the Chart.js graph
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Total Volume (kg)',
                    data: dataPoints,
                    backgroundColor: '#2563EB', // Our bright blue accent!
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: { y: { beginAtZero: true } },
                plugins: { legend: { display: false } } // Hide legend for a cleaner look
            }
        });
    },

    renderPRs: () => {
        const prList = document.getElementById('pr-list');
        if (!prList) return;

        const workouts = Storage.get('workouts') || [];
        const prs = {}; // Stores the max weight for each exercise

        workouts.forEach(workout => {
            workout.exercises.forEach(ex => {
                const name = ex.name;
                ex.sets.forEach(set => {
                    const weight = parseFloat(set.weight);
                    const reps = parseInt(set.reps);
                    
                    // Update if we haven't seen this exercise yet, or if the weight is higher
                    if (!prs[name] || weight > prs[name].weight) {
                        prs[name] = { weight, reps, date: workout.date };
                    }
                });
            });
        });

        // Clear the hardcoded HTML examples
        prList.innerHTML = '';

        const exerciseNames = Object.keys(prs);
        
        if (exerciseNames.length === 0) {
            prList.innerHTML = '<p style="color: var(--text-secondary);">Log a workout to see your PRs here!</p>';
            return;
        }

        // Generate the HTML for the real PRs
        exerciseNames.forEach(name => {
            const pr = prs[name];
            const li = document.createElement('li');
            
            // Inline styles to match the flex layout without adding more CSS
            li.style.display = "flex";
            li.style.justifyContent = "space-between";
            li.style.alignItems = "center";
            li.style.padding = "1rem 0";
            li.style.borderBottom = "1px solid var(--border-color)";
            
            li.innerHTML = `
                <div class="pr-info">
                    <strong>${name}</strong>
                    <span style="display:block; color:var(--text-secondary); margin-top:4px;">${pr.weight}kg × ${pr.reps} reps</span>
                </div>
                <span class="pr-date" style="font-size:0.875rem; color:var(--text-secondary);">${pr.date}</span>
            `;
            prList.appendChild(li);
        });
    }
};

document.addEventListener('DOMContentLoaded', Progress.init);