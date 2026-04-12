# The Earth Crew: Resource Run

A kid-friendly browser game about cooperation, sustainability, and shared problem-solving.

This project was designed as a simple educational mini-game for a tutoring or youth-learning website. Players try three different systems for building a future city and compare which one helps the city succeed:

1. **Solo Build**
2. **Trade & Negotiate**
3. **One Earth Crew**

The game is intentionally lightweight, visual, and easy for students to understand and modify.

---

## Project Goal

The goal of this game is to help kids think about:

- how communities depend on shared resources
- why cooperation improves outcomes
- how energy, water, food, and health are all connected
- how teamwork and fair systems can support a stronger future

The tone is meant to stay positive, educational, and age-appropriate.

---

## Main Features

- Single-page browser game
- No backend required
- Kid-friendly design and wording
- 3 gameplay phases
- Resource-based mission system
- Score tracking
- Reflection prompts for tutoring/class use
- Easy to embed in Wix or other websites

---

## Files

### React version
A React version was created first for easier component-based development.

### Wix-friendly HTML version
The recommended version for simple website embedding is the standalone HTML file.

This version uses:

- plain HTML
- plain CSS
- plain JavaScript
- no external libraries

That makes it easier to:

- paste into a custom code block
- embed in Wix
- host as a static file
- edit without a React build setup

---

## How the Game Works

Each mission requires a city to meet a combination of these resource needs:

- **Energy**
- **Water**
- **Food**
- **Health**

Players move through three phases:

### Phase 1: Solo Build
Each team can only use its own limited resource stash.

### Phase 2: Trade & Negotiate
Teams can make limited trades, but trading is less efficient than true collaboration.

### Phase 3: One Earth Crew
All resources are pooled together and shared across the entire group.

The game then compares results and encourages reflection.

---

## Educational Use

This game works well under:

- educational tutoring
- global awareness
- sustainability lessons
- problem-solving sessions
- teamwork workshops
- after-school enrichment

It is best framed as a lesson about:

- cooperation
- shared responsibility
- fairness
- innovation
- resource stewardship

---

## Recommended Public Website Framing

For a public-facing youth website, keep the messaging centered on:

- cooperation
- empathy
- sustainability
- future-ready thinking
- community problem solving

It is better to avoid heavy political framing and keep the experience welcoming for families, students, and educators.

---

## Wix Embedding

You can use the standalone HTML version in Wix in one of these ways:

### Option 1: Embed HTML
Paste the HTML into a Wix Embed or Custom Code block.

### Option 2: Host separately
Host the HTML file on a static site and embed it inside Wix with an iframe.

### Option 3: Custom page integration
Use the HTML/JS/CSS as the base for a more customized page inside your website workflow.

---

## Running Locally

Because the Wix-friendly version is a standalone HTML file, you can preview it locally by simply opening the file in a browser.

For a better local dev workflow, you can also run a tiny static server.

### Python
```bash
python3 -m http.server 8000
```

Then open:
```bash
http://localhost:8000
```

---

## Suggested Repo Structure

```text
project-root/
├── README.md
├── public/
│   └── earth-crew-resource-run.html
└── assets/
    └── screenshots/
```

If you are keeping both versions:

```text
project-root/
├── README.md
├── react-version/
├── wix-html-version/
│   └── earth-crew-resource-run.html
└── assets/
```

---

## Customization Ideas

Students can extend the game by adding:

- more missions
- more resource types
- sound effects
- animation
- certificates or badges
- a start screen with organization branding
- quiz questions between rounds
- a teacher dashboard or reflection form

---

## Good First Edits for Vaishu

If Vaishu wants to keep building this project, these are good first coding tasks:

1. Change colors and branding
2. Add a welcome screen
3. Add mission images or icons
4. Add a final score summary
5. Add a printable certificate
6. Add more cities or challenge levels
7. Save high scores in local storage

---

## Accessibility Notes

When improving this project, consider adding:

- stronger color contrast
- larger buttons for younger users
- keyboard navigation
- ARIA labels
- screen-reader friendly descriptions

---

## Deployment Notes

This project is static, so it can be hosted on:

- GitHub Pages
- Netlify
- Vercel
- Wix embed
- any static file host

No backend or database is required for the current version.

---

## Future Enhancements

Possible future versions could include:

- multiplayer mode
- classroom discussion mode
- teacher notes panel
- student reflection submission form
- AI-generated city visualization
- topic packs for food, climate, health, or energy

---

## License

Add the license that matches your repo.

Example:

```text
MIT License
```

or

```text
All rights reserved.
```

---

## Credits

Created as a student-friendly educational game concept for youth tutoring and community learning.

