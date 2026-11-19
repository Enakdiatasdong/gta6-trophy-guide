# NOTES.md — coordination notes (Builder Data → Builder App)

## Schema change (19 Nov 2026, Builder Data)

`app/data/trophies.json` keeps every starter key (`id`, `name`, `description`,
`grade`, `guide`) with identical values, and ADDS these fields per trophy:

- `kind`: "story" | "missable" | "collectibles" | "activities" | "online"
- `missable`: boolean (only id 28, Positive Mental Attitude, is true)
- `hidden`: boolean (28 true, 27 false — matches the Exophase split)
- `count`: number | null (the target number from the description, e.g. 250
  stunts, 42 shooting range challenges, 14 drone race locations, 18 meditation
  spots, 500 profile actions; null where the trophy has no meaningful count)
- `sources`: [{label, url}] — at least one entry per trophy
- `roadmap`: {stage: 1-5, note: string} — which roadmap stage the trophy
  belongs to
- `steps`: [string] — short own-words steps

Top level also adds `meta` (difficulty, time, online count, playthroughs,
cheats flag) and `roadmap` (the 5 stages with titles and notes).

Nothing was removed and no starter value was changed, so the existing
`app.js` (which reads `name`, `description`, `grade`, `guide`) keeps working
unchanged. New fields are additive only — use them or ignore them.

## Verification (19 Nov 2026)

- 55 trophies, names unique (55), grades 1 platinum / 2 gold / 6 silver /
  46 bronze, hidden == 28, missable == 1, every item has a non-empty guide,
  non-empty steps and non-empty sources, JSON valid, file < 2 MiB.
  (Re-run: `python3 -c` check in the task brief.)
