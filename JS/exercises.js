// JS/exercises.js

const ExerciseLibrary = {
    init: () => {
        // Only run if we are on the exercises page
        const grid = document.getElementById('exercise-grid');
        if (!grid) return;

        // 1. Set up Filter Buttons
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Remove 'active' class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                
                // Add 'active' class to the button that was clicked
                e.target.classList.add('active');
                
                // Filter the grid based on the button text
                const muscle = e.target.innerText;
                ExerciseLibrary.filterGrid(muscle);
            });
        });

        // 2. Set up Search Bar
        const searchInput = document.getElementById('exercise-search');
        if (searchInput) {
            searchInput.addEventListener('keyup', (e) => {
                ExerciseLibrary.searchGrid(e.target.value.toLowerCase());
            });
        }
    },

    filterGrid: (muscle) => {
        const cards = document.querySelectorAll('.exercise-card');
        
        cards.forEach(card => {
            if (muscle === "All") {
                card.style.display = "block";
            } else {
                // Look at the data-muscle attribute we put in the HTML
                const cardMuscle = card.getAttribute('data-muscle');
                if (cardMuscle === muscle) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            }
        });
        
        // Reset search bar when using filter buttons
        const searchInput = document.getElementById('exercise-search');
        if (searchInput) searchInput.value = '';
    },

    searchGrid: (query) => {
        const cards = document.querySelectorAll('.exercise-card');
        
        cards.forEach(card => {
            const exerciseName = card.querySelector('h3').innerText.toLowerCase();
            if (exerciseName.includes(query)) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });

        // Reset filter buttons so "All" is highlighted when actively typing a search
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(b => b.classList.remove('active'));
        if (filterBtns.length > 0) filterBtns[0].classList.add('active'); 
    }
};

// Initialize when the page loads
document.addEventListener('DOMContentLoaded', ExerciseLibrary.init);