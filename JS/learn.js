// JS/learn.js

const KnowledgeHub = {
    // This acts as our mini-database for the articles
    articles: {
        "The Science of Progressive Overload": `
            <p>Progressive overload is the most important principle in strength training and muscle growth (hypertrophy). It means gradually increasing the weight, frequency, or number of repetitions in your strength training routine.</p>
            <br>
            <h4>How to apply it:</h4>
            <ul style="margin-left: 20px; margin-top: 10px;">
                <li style="margin-bottom: 8px;"><strong>Increase the weight:</strong> If you lifted 50kg for 3 sets of 10 last week, try 52.5kg this week.</li>
                <li style="margin-bottom: 8px;"><strong>Increase the reps:</strong> If the weight feels too heavy to increase, try doing 3 sets of 11 instead of 10.</li>
                <li><strong>Improve your form:</strong> Lifting the same weight with better control and slower eccentrics is also progressive overload!</li>
            </ul>
        `,
        "Optimizing Sleep for Hypertrophy": `
            <p>You don't build muscle in the gym; you build muscle in your bed. When you lift weights, you are actually creating micro-tears in your muscle fibers. Sleep is when your body repairs those tears to make them bigger and stronger.</p>
            <br>
            <h4>The Science:</h4>
            <p style="margin-top: 10px;">Human Growth Hormone (HGH) is primarily released during deep sleep. If you are getting less than 7-8 hours of sleep, you are short-changing your body's natural ability to recover. Lack of sleep also increases cortisol (the stress hormone), which can lead to muscle breakdown and fat storage.</p>
        `,
        "Protein Timing: Does it Matter?": `
            <p>For years, "bro-science" dictated that you had to chug a protein shake within 30 minutes of finishing your workout (the "anabolic window") or you would lose your gains. Modern sports science has proven this false.</p>
            <br>
            <h4>What actually matters:</h4>
            <p style="margin-top: 10px;">Your total daily protein intake is vastly more important than the exact time you consume it. As long as you are hitting your daily goal (roughly 1.6 to 2.2 grams of protein per kilogram of body weight), your muscles will have the building blocks they need. Timing only really matters for elite athletes training multiple times a day.</p>
        `
    },

    init: () => {
        // Only run if on the learn page
        const modal = document.getElementById('article-modal');
        if (!modal) return;

        // Get all the "Read Article" buttons
        const readBtns = document.querySelectorAll('.btn-read-more');
        const closeBtn = document.querySelector('.close-modal');

        // Add click events to open the modal
        readBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Find the title of the article inside the same card that was clicked
                const card = e.target.closest('.article-card');
                const title = card.querySelector('h3').innerText;
                
                KnowledgeHub.openModal(title);
            });
        });

        // Add click event to the "X" button to close the modal
        closeBtn.addEventListener('click', () => {
            modal.style.display = "none";
        });

        // Close modal if user clicks the dark background outside the white box
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = "none";
            }
        });
    },

    openModal: (title) => {
        const modal = document.getElementById('article-modal');
        const modalTitle = document.getElementById('modal-title');
        const modalBody = document.getElementById('modal-body');

        // Inject the content based on the title clicked
        modalTitle.innerText = title;
        modalTitle.style.marginBottom = "1rem";
        
        modalBody.innerHTML = KnowledgeHub.articles[title] || "<p>Article content not found.</p>";

        // Style and Display the modal
        modal.style.display = "flex"; 
        modal.style.position = "fixed";
        modal.style.top = "0";
        modal.style.left = "0";
        modal.style.width = "100%";
        modal.style.height = "100%";
        modal.style.backgroundColor = "rgba(15, 23, 42, 0.7)"; // Dark semi-transparent background
        modal.style.justifyContent = "center";
        modal.style.alignItems = "center";
        modal.style.zIndex = "1000";

        // Style the inner white box
        const modalContent = modal.querySelector('.modal-content');
        modalContent.style.backgroundColor = "var(--bg-surface)";
        modalContent.style.padding = "2.5rem";
        modalContent.style.borderRadius = "var(--border-radius)";
        modalContent.style.maxWidth = "650px";
        modalContent.style.width = "90%";
        modalContent.style.position = "relative";
        modalContent.style.boxShadow = "var(--shadow-md)";
        
        // Style the "X" close button
        const closeBtn = modal.querySelector('.close-modal');
        closeBtn.style.position = "absolute";
        closeBtn.style.top = "1.5rem";
        closeBtn.style.right = "1.5rem";
        closeBtn.style.fontSize = "1.5rem";
        closeBtn.style.cursor = "pointer";
        closeBtn.style.color = "var(--text-secondary)";
    }
};

// Initialize when the page loads
document.addEventListener('DOMContentLoaded', KnowledgeHub.init);