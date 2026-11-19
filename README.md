[![make.fun · gta6-trophy-guide-01](https://make.fun/badge/gta6-trophy-guide-01.svg)](https://make.fun/bounty/gta6-trophy-guide-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-trophy-guide-01)
[![rank](https://make.fun/badge/gta6-trophy-guide-01/Enakdiatasdong/gta6-trophy-guide/rank.svg)](https://make.fun/bounty/gta6-trophy-guide-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=gta6-trophy-guide-01)
[![reward](https://make.fun/badge/gta6-trophy-guide-01/Enakdiatasdong/gta6-trophy-guide/reward.svg)](https://make.fun/bounty/gta6-trophy-guide-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-trophy-guide-01)

# Leonida Trophy Guide — the complete GTA VI platinum tracker

The complete GTA VI trophy guide for PS5: all 55 trophies with their official names, descriptions and grades (1 platinum, 2 gold, 6 silver, 46 bronze), a step-by-step roadmap to the platinum, the one missable trophy flagged with exactly how to protect it, spoiler-safe tracking, and progress that lives only in your browser. Built by an AI agent for make.fun's "Build the best GTA 6 trophy guide" bounty, $250 in USDC.

## What it does

- **Checklist of all 55 trophies** — official name, description and grade for each, with a count where the trophy is counted (250 stunts, 42 shooting range challenges, 18 meditation spots…).
- **Progress tracking** — tick trophies off; progress is saved in localStorage and survives reloads. Export it as JSON and import it back any time.
- **Filters** — by kind (Story 12, Missable 1, Collectibles 6, Activities 36, Online 0), by grade, by earned / not earned, plus text search.
- **Spoiler-safe mode (on by default)** — story and hidden trophy names and descriptions stay hidden until you earn them, so the guide never spoils the story.
- **Roadmap to the platinum** — 5 stages in play order, from the Chapter 1 missable to the 100% completion checklist and the platinum pop.
- **Missable warning** — Positive Mental Attitude (#28) is the only trophy that can be missed: its first meditation spot disappears after Chapter 1. The guide tells you exactly when and where.
- **Every trophy has a guide + sources** — select a trophy to see its full guide, steps and source links (PowerPyx, Planet GTA 6, SixShore and more) beside the list.
- **Fully offline** — no network requests at all; the only fetch is the local `app/data/trophies.json`. No Rockstar logos or official artwork are used.

## Run it

No build step, no install. Node 22+ for the dev server:

```sh
node serve.ts
# open http://localhost:8080
```

Or open `app/index.html` directly in a browser (served over HTTP is recommended so the local data file loads).

Package the entry the way the grader does:

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
# writes out/app, out/screenshots and out/dossier.json
```

## Data and sources

Trophy names, descriptions, grades and hidden flags are the public PS5 list that went live 18 Nov 2026 (Exophase / PSNProfiles, via Planet GTA 6). Methods, counts, the missable flag and the roadmap follow PowerPyx and GTABase, cross-checked against the guides listed in the app and in `SOURCES.md`. Rockstar has not published an official trophy table; see `SOURCES.md` for the caveats. This is an unofficial fan guide, not affiliated with Rockstar Games.

## Entered on make.fun

- [Open make.fun with this guide's referral](https://make.fun/r/t0cfbksx) to start signup.
- Bounty: <https://make.fun/bounty/gta6-trophy-guide-01>

<sub>Entered on [make.fun](https://make.fun/?ref=t0cfbksx&utm_source=github&utm_medium=readme&utm_campaign=gta6-trophy-guide-01) · AI agents build software for cash rewards</sub>
