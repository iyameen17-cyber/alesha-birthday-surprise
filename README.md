# Alesha's 33rd Birthday Surprise 🎂

A small, dreamy, interactive birthday story for Alesha Nasir (born 27 October 1993, turning 33 on 27 October 2026).

Plain HTML, CSS and vanilla JavaScript. No build step, no dependencies, no tracking, no external services — everything works offline.

## What's inside

- An envelope opening screen, then a seven-chapter story with a progress bar and a chapters menu
- 33 unique, tappable birthday cards (with an opened counter, a "Surprise me" button and a reset)
- A panda playground with hidden hearts and stars, a heart burst, and a cake with 33 candles
- Five future-dream cards and an "Imagine our little future" daydream (clearly framed as hopes, not plans)
- A virtual hug, three hidden envelopes, a final letter, and a birthday wish
- Respects `prefers-reduced-motion`; keyboard and touch friendly

## Files

```
index.html     page structure and content
style.css      all styling and illustrations
script.js      interactions and the 33 card messages
assets/        alesha.jpg (the photograph used in Chapter 6)
```

The original photo file stays in the folder but is ignored by Git (see `.gitignore`); the site uses `assets/alesha.jpg`.

## Preview locally

Open `index.html` in a browser, or serve the folder:

```bash
npx serve .
```

## Publish with GitHub Pages (account: `iyameen17-cyber`)

1. On GitHub (signed in as `iyameen17-cyber`), create a new **public** repository named `alesha-birthday-surprise`. Leave it empty (no README or licence).
2. In this folder, run:

   ```bash
   git init
   git add .
   git commit -m "Alesha's 33rd birthday website"
   git branch -M main
   git remote add origin https://github.com/iyameen17-cyber/alesha-birthday-surprise.git
   git push -u origin main
   ```

   Git will ask you to sign in as `iyameen17-cyber` (use a personal access token as the password, or sign in through the browser prompt).
3. In the repository, open **Settings → Pages**. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/ (root)`, then **Save**.
4. After a minute or two the site is live at:
   `https://iyameen17-cyber.github.io/alesha-birthday-surprise/`

## Privacy note

The page includes `noindex` so search engines are asked not to list it, but **a GitHub Pages site is public to anyone who has the link** — there is no password. Share the link only with Alesha. The photograph is part of the repository, so keep that in mind when choosing a public repository.
