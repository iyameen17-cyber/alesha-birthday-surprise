# Alesha's 33rd Birthday Universe 🐼💗

An animated, interactive birthday surprise for Alesha Nasir (27 October 2026).

Plain HTML, CSS and vanilla JavaScript, with no build step and no tracking. Live at
`https://iyameen17-cyber.github.io/alesha-birthday-surprise/`

## What's inside

- **The gate**: a starry night with shooting stars, a panda asleep on the moon, and a beating heart to tap. Tapping it bursts into heart fireworks and starts the music.
- **Hero**: a "Happy Birthday" title whose letters bounce in, her name in shimmering gold, swinging bunting, two waving pandas, fireworks in the sky, and balloons that pop into little words.
- **Her song**: "Alesha (Bis bald, mein Schatz)", an original love song played live on a real grand piano (Web Audio). Karaoke-style lyrics are synced to the music, and a spinning record has her photo on the label. A floating mini player shows the current lyric everywhere.
- **Our little story**: an animated chat and a timeline (Snapchat hello → the night without an ending → 15-hour talks).
- **That smile**: a polaroid with orbiting hearts and compliments on tap, plus a spinning gold medal.
- **Panda Love Land**: Hug, Kiss and Cuddle buttons animate two pandas (hers has the pink bow). Cuddling turns day into night, with a moon and a blanket.
- **Teddy Hug Delivery**: squeeze the big teddy, or air-drop teddies on balloons.
- **The Love-o-Meter**: a heart fills up past 100%, overheats, explodes and turns into ∞.
- **Deutsch für zwei**: 16 flip cards of love phrases with spoken pronunciation (🔊), a quiz, a certificate, and a little train to "Zusammen".
- **Bis bald**: a boarding pass (flight LV 2710 to "my arms"). Boarding sends a plane across the screen and two pandas run into each other's arms. There's also a "first hug loading… 99%" bar and a "When we finally meet" promise list.
- **33 surprises**: gift boxes that shake open into love notes.
- **The cake**: 33 flickering candles. "Sing Happy Birthday" plays it on the piano, and she can blow the candles out into her phone's microphone (or tap the cake).
- **Love letter**: a wax-sealed envelope that opens into a handwritten letter.
- **Finale**: glowing particle words (Happy Birthday → Alesha → ♥ → Ich liebe dich → Bis bald) that scatter when touched, and a "make a wish" fireworks show.

## Files

```
index.html   page structure and all the words
style.css    every scene, character and animation
script.js    interactions, cartoon characters (SVG), gift notes, German cards, quiz
music.js     the love song (melody, chords, lyrics) and the piano engine
fx.js        canvas effects: stars, fireworks, confetti, particle words
assets/      alesha.jpg
```

## Preview locally

Serve the folder (the music needs http, not file://):

```bash
py -3 -m http.server 8765
```

Then open http://localhost:8765

## Credits

- Piano: [Salamander Grand Piano](https://archive.org/details/SalamanderGrandPianoV3) by Alexander Holm, CC BY 3.0. The samples are loaded from tonejs.github.io. If they can't load, a soft synth piano plays instead.
- Fonts: Fredoka, Great Vibes and Caveat from Google Fonts.

## Privacy note

The page includes `noindex`, but a GitHub Pages site is public to anyone who has the link. Share it only with Alesha.
