<div align="center">

# 💪 ASP Fit

**A premium, science-backed fitness tracking web app — built with vanilla HTML, CSS & JavaScript.**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-2563EB?style=for-the-badge&logo=github)](https://ayush4307.github.io/ASP-Fit/)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](/)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](/)
[![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chart.js&logoColor=white)](/)

</div>

---

## 🌐 Live Demo

**[https://ayush4307.github.io/ASP-Fit/](https://ayush4307.github.io/ASP-Fit/)**

> No sign-up required. All data stored locally in your browser.

---

## ✨ Features

### 🏠 Dashboard
- Live stats — total workouts, current streak, total volume lifted, personal records
- Daily motivational quote (rotates every day)
- Quick action buttons to jump straight into a workout

### 📝 Workout Tracker
- Log exercises, sets, weight (kg) and reps
- Built-in **session stopwatch** — track total workout duration
- **Rest timer** with selectable durations (1 min / 90s / 2 min / 3 min)
- Audible beep when rest ends
- Auto-saves **Personal Records** on every session

### 🏋️ Exercise Library
- **36 built-in exercises** across Chest, Back, Legs, Shoulders, Arms, Core
- **Search** by name — filters as you type
- **Filter by muscle group** with pill buttons
- Colour-coded difficulty tags (Beginner / Intermediate / Advanced)
- **Add custom exercises** — saved to your library permanently
- **"+ Add to Workout"** — click any exercise and it pre-fills in the Tracker

### 📊 Progress & Analytics
- **Bar chart** — volume (kg) per session over time (powered by Chart.js)
- **12-week consistency heatmap** — like GitHub's contribution graph
- **Personal Records list** — sorted by weight, with golden PR badge
- Summary stats: total workouts · total volume · streak · PRs

### 📚 Knowledge Hub
- **6 full science-backed articles** — Progressive Overload, Sleep, Protein Timing, Volume vs Intensity, Creatine, Consistency
- Category filter pills: Training / Nutrition / Recovery / Mindset
- Click any card → smooth **fullscreen reading modal**

### 👤 Profile
- **8 auto-unlocking achievements** based on real workout data
- Save fitness goals (target weight, weekly goal, current split)
- Dynamic avatar with name initials
- **Export data** as JSON (your data, your device, always)
- Danger zone: clear all data

---

## 🎨 Design
- **Dark / Light mode** toggle — zero flicker, persists across sessions
- **Hevy-inspired** top navbar — 70px height, bold logo, clean links
- Premium card-based layout with subtle shadows and hover animations
- Fully **responsive** — desktop, tablet and mobile (bottom tab bar)
- Google Fonts: Inter

---

## 🛠️ Tech Stack

| Layer | Tech |
|---|---|
| Structure | HTML5 (Semantic) |
| Styling | Vanilla CSS (Custom Properties, Grid, Flexbox) |
| Logic | Vanilla JavaScript (ES6+, Modules pattern) |
| Data | `localStorage` (no backend, no database) |
| Charts | [Chart.js](https://www.chartjs.org/) |
| Fonts | [Google Fonts — Inter](https://fonts.google.com/specimen/Inter) |
| Hosting | GitHub Pages |

---

## 📁 Project Structure

```
ASP Fit/
├── index.html          # Dashboard
├── tracker.html        # Workout Tracker
├── exercises.html      # Exercise Library
├── progress.html       # Progress & Analytics
├── learn.html          # Knowledge Hub
├── profile.html        # Profile & Achievements
├── CSS/
│   ├── main.css        # Design tokens & global resets
│   ├── components.css  # Navbar, cards, buttons, inputs
│   ├── pages.css       # Page-specific + responsive styles
│   └── animations.css  # Micro-animations
└── JS/
    ├── app.js          # Storage, ThemeManager, Dashboard stats
    ├── tracker.js      # Workout logging, timers, PR tracking
    ├── exercises.js    # Library render, search, filter
    ├── progress.js     # Chart, heatmap, PR list
    ├── learn.js        # Articles, modal, filter
    └── profile.js      # Badges, goals form, export
```

---

## 🚀 Running Locally

No build step, no dependencies, no npm.

```bash
git clone https://github.com/Ayush4307/ASP-Fit.git
cd ASP-Fit
# Open index.html in your browser
start index.html       # Windows
open index.html        # Mac
```

Or use the **Live Server** extension in VS Code for auto-reload.

---

## 🤝 Contributing & Security

- **Contributing**: Please see our [CONTRIBUTING.md](CONTRIBUTING.md) for details on how to contribute.
- **Security**: Please see our [SECURITY.md](SECURITY.md) for details on our security policy and how to report vulnerabilities.

---

## 📄 License

Built by **Ayush Singh Pawar** for personal use and portfolio demonstration.
