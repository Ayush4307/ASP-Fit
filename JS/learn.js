// JS/learn.js

const Learn = {

    articles: [
        {
            id: 1,
            category: 'Training',
            emoji: '🏋️',
            title: 'The Science of Progressive Overload',
            summary: 'Why lifting heavier over time is the only way to grow muscle.',
            body: `
                <p><strong>Progressive overload</strong> is the single most important principle in strength training. It means gradually increasing the stress placed on your body during exercise over time.</p>
                <h3>Why it works</h3>
                <p>Your muscles adapt to stress by growing stronger. When you do the same workout repeatedly, your body adapts and stops growing. The only way to keep growing is to keep increasing the challenge.</p>
                <h3>How to apply it</h3>
                <ul>
                    <li><strong>Add weight</strong> — even 1.25kg more per week adds up to 65kg+ in a year</li>
                    <li><strong>Add reps</strong> — if you hit the top of your rep range, increase the weight</li>
                    <li><strong>Add sets</strong> — go from 3 sets to 4 sets over several weeks</li>
                    <li><strong>Reduce rest time</strong> — same weight, same reps, less rest = harder</li>
                </ul>
                <h3>Tracking is key</h3>
                <p>You cannot progressively overload without tracking. Use your ASP Fit tracker to log every set so you always know what to beat next session.</p>
                <p><strong>Bottom line:</strong> Beat last week's numbers. That's the entire game.</p>
            `
        },
        {
            id: 2,
            category: 'Recovery',
            emoji: '😴',
            title: 'Optimizing Sleep for Hypertrophy',
            summary: 'How missing out on sleep silently destroys your gains.',
            body: `
                <p>Sleep is not optional — it is when your body actually builds muscle. Growth hormone peaks during deep sleep, and protein synthesis accelerates while you're unconscious.</p>
                <h3>What happens during sleep</h3>
                <ul>
                    <li>Growth hormone surges (up to 70% of daily GH is released during sleep)</li>
                    <li>Testosterone production peaks in the early morning hours</li>
                    <li>Muscle protein synthesis continues rebuilding damaged muscle fibers</li>
                    <li>Cortisol levels drop, reducing muscle breakdown</li>
                </ul>
                <h3>How much do you need?</h3>
                <p>Athletes need <strong>8–9 hours</strong>. Most people get 6. That 2-hour deficit is costing you meaningful muscle and performance every single night.</p>
                <h3>Practical tips</h3>
                <ul>
                    <li>Set a consistent bedtime — even weekends</li>
                    <li>Stop screens 1 hour before bed</li>
                    <li>Keep your room cold (18–20°C is optimal)</li>
                    <li>Avoid caffeine after 2pm</li>
                    <li>Eat a protein-rich meal before bed (casein or cottage cheese)</li>
                </ul>
            `
        },
        {
            id: 3,
            category: 'Nutrition',
            emoji: '🥗',
            title: 'Protein Timing: Does it Matter?',
            summary: 'The truth about the anabolic window and post-workout meals.',
            body: `
                <p>For years, gym culture insisted you had a <strong>30-minute anabolic window</strong> after your workout to consume protein or your gains would vanish. The science tells a more nuanced story.</p>
                <h3>What the research actually says</h3>
                <p>The post-workout anabolic window is real — but it's closer to <strong>4–6 hours</strong> wide, not 30 minutes. If you ate a protein-rich meal before training, your muscles are still digesting and absorbing amino acids well into your workout and beyond.</p>
                <h3>What actually matters more</h3>
                <ul>
                    <li><strong>Total daily protein</strong> — aim for 1.6–2.2g per kg of bodyweight</li>
                    <li><strong>Protein distribution</strong> — spread across 3–5 meals throughout the day</li>
                    <li><strong>Leucine content</strong> — each meal should have 2–3g of leucine to trigger muscle protein synthesis</li>
                </ul>
                <h3>Practical approach</h3>
                <p>Don't sprint to a shake the moment you rack the bar. Just ensure you eat a solid protein-containing meal within 1–2 hours of training. That's it.</p>
                <p>Good sources: chicken, eggs, Greek yogurt, cottage cheese, fish, lean beef, whey protein.</p>
            `
        },
        {
            id: 4,
            category: 'Training',
            emoji: '🏋️',
            title: 'Volume vs. Intensity: What Builds More Muscle?',
            summary: 'Should you lift heavy with fewer reps or moderate weight for more reps?',
            body: `
                <p>The eternal gym debate: should you train like a powerlifter (heavy, low reps) or a bodybuilder (moderate weight, higher reps)?</p>
                <h3>The research answer</h3>
                <p>Studies show that a wide rep range (5–30 reps) can all build similar amounts of muscle — <strong>as long as you train close to failure</strong>. The stimulus for hypertrophy is mechanical tension and metabolic stress, not the weight on the bar.</p>
                <h3>What this means practically</h3>
                <ul>
                    <li><strong>Heavy sets (4–6 reps)</strong> — build strength and dense muscle, good for compounds</li>
                    <li><strong>Moderate sets (8–15 reps)</strong> — the sweet spot for hypertrophy, best muscle pump</li>
                    <li><strong>High rep sets (15–30 reps)</strong> — great for isolation exercises, joint-friendly</li>
                </ul>
                <h3>Best approach</h3>
                <p>Use a mix. Heavy compound movements (squats, deadlifts, bench) in lower rep ranges. Accessories and isolation work in higher rep ranges. Both contribute to overall growth.</p>
            `
        },
        {
            id: 5,
            category: 'Nutrition',
            emoji: '🥗',
            title: 'Creatine: The One Supplement That Actually Works',
            summary: 'Everything you need to know about the most researched supplement in existence.',
            body: `
                <p>If you could only take one supplement, make it <strong>creatine monohydrate</strong>. It is the single most researched, most proven, safest performance supplement available.</p>
                <h3>What it does</h3>
                <p>Creatine increases your muscles' phosphocreatine stores, which are used to produce ATP (energy) during short, intense efforts like lifting. More energy = more reps = more progressive overload = more muscle.</p>
                <h3>Proven benefits</h3>
                <ul>
                    <li>5–15% increase in strength and power output</li>
                    <li>Faster recovery between sets</li>
                    <li>1–2kg lean mass gain over the first month (mostly water in muscle, not fat)</li>
                    <li>Possible cognitive benefits (brain also uses creatine)</li>
                </ul>
                <h3>How to take it</h3>
                <p><strong>3–5g per day</strong>, every day. No loading phase needed. No need to cycle it. Take it at any time — with or without food. Creatine monohydrate is the only form you need. Ignore expensive alternatives.</p>
            `
        },
        {
            id: 6,
            category: 'Mindset',
            emoji: '🧠',
            title: 'Building Consistency: The 2-Day Rule',
            summary: 'The simple mental rule that will keep you training for life.',
            body: `
                <p>Motivation is unreliable. Some days you'll be fired up, most days you won't. The athletes who build the best physiques aren't the most motivated — they're the most <strong>consistent</strong>.</p>
                <h3>The 2-Day Rule</h3>
                <p>Simple: <strong>Never miss two days in a row.</strong></p>
                <p>Missed Monday? Fine. Tuesday becomes non-negotiable. This rule removes the all-or-nothing thinking that kills most people's progress. One missed session is a rest day. Two in a row is the start of a habit of quitting.</p>
                <h3>Identity-based habits</h3>
                <p>Instead of saying "I want to get fit," say "I am someone who works out." Every session you complete is a vote for that identity. The goal isn't the outcome — it's becoming the type of person who shows up.</p>
                <h3>Practical tips</h3>
                <ul>
                    <li>Pack your gym bag the night before</li>
                    <li>Schedule workouts like meetings — non-negotiable calendar blocks</li>
                    <li>Track your streak in ASP Fit — don't break the chain</li>
                    <li>On low-energy days, commit to just 10 minutes. You'll usually finish the workout.</li>
                </ul>
            `
        }
    ],

    currentFilter: 'All',

    init: () => {
        if (!document.getElementById('articles-grid')) return;
        Learn.renderArticles();
        Learn.setupFilters();
    },

    renderArticles: () => {
        const grid = document.getElementById('articles-grid');
        const filtered = Learn.currentFilter === 'All'
            ? Learn.articles
            : Learn.articles.filter(a => a.category === Learn.currentFilter);

        grid.innerHTML = filtered.map(a => `
            <article class="article-card card" onclick="Learn.openModal(${a.id})">
                <div class="article-emoji-banner">${a.emoji}</div>
                <div class="article-content">
                    <span class="article-category">${a.category}</span>
                    <h3>${a.title}</h3>
                    <p>${a.summary}</p>
                    <span class="btn-read-more">Read Article →</span>
                </div>
            </article>
        `).join('');
    },

    setupFilters: () => {
        document.querySelectorAll('.learn-filter-bar .filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.learn-filter-bar .filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                Learn.currentFilter = btn.dataset.cat;
                Learn.renderArticles();
            });
        });
    },

    openModal: (id) => {
        const article = Learn.articles.find(a => a.id === id);
        if (!article) return;
        document.getElementById('modal-title').innerText = article.title;
        document.getElementById('modal-category').innerText = `${article.emoji} ${article.category}`;
        document.getElementById('modal-body').innerHTML = article.body;
        document.getElementById('article-modal').classList.add('open');
        document.body.style.overflow = 'hidden';
        // Mark as read for Scholar achievement badge
        Storage.save('readArticle', true);
    },

    closeModal: () => {
        document.getElementById('article-modal').classList.remove('open');
        document.body.style.overflow = '';
    }
};

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') Learn.closeModal();
});

document.addEventListener('DOMContentLoaded', Learn.init);
