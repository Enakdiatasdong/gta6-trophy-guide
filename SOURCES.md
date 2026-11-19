# Sources — GTA VI Trophy Guide (PS5, 55 trophies)

All names, descriptions, grades and hidden/visible flags were checked against the
public trophy list that went live on 18 November 2026. How-to steps in
`app/data/trophies.json` are written in our own words, based on the guides below —
no guide text was copied.

## The list itself (names, descriptions, grades, hidden flags)

- **Exophase — Grand Theft Auto VI trophies (PS5).** The tracker that first
  published the list; Push Square reported the list from Exophase on 18 Nov 2026.
  What we took: the 55 names and descriptions, the grade split (1 platinum,
  2 gold, 6 silver, 46 bronze) and which trophies are hidden. (Direct trophy
  page reached via the tracker; the full list as printed is cited through
  Planet GTA 6 below.)
  https://www.exophase.com
- **PSNProfiles — Grand Theft Auto VI trophies (PS5).** Cross-check for the same
  list: names, descriptions, grades, hidden flags and PSN points (1,350 total).
  https://psnprofiles.com
- **Planet GTA 6 — GTA 6 Trophies: All 55 trophies and Xbox achievements.**
  The page we actually read, because it prints the Exophase list in full and
  states it was cross-checked with PSNProfiles and TrueAchievements. It splits
  the list into the 27 visible trophies and the 28 hidden ones, which is the
  split used for the `hidden` field in `trophies.json`. It also confirms the
  Xbox list is the same 55, worth 1,000 Gamerscore, and that there are no
  online trophies.
  https://www.planetgta6.com/en/gta-6-trophies/

## How-to guides (methods, counts, roadmap, missables)

- **PowerPyx — GTA 6 Trophy Guide & Roadmap (18 Nov 2026).** The main method
  source for almost every trophy: roadmap (3 steps, ~200 hours, difficulty
  4/10, 1 playthrough, 15 manual saves, cheats disable trophies), the
  100% checklist thresholds (70 of 80 challenges, 300 stunts, 200 of 277
  vehicles, 100 of 255 animals, all robberies / shooting ranges / drone races /
  Bret's quests), per-trophy counts (397 stunts, 42 shooting range challenges,
  14 drone race locations, 18 meditation spots, 8 bank vaults, 39 gang
  operations, 15 target decks) and the only possibly missable trophy,
  Positive Mental Attitude (Chapter 1 balcony meditation). PowerPyx marks
  In The Beginning…, Bad Luck, I Guess and Ten Pin as currently unknown.
  https://www.powerpyx.com/gta-6-grand-theft-auto-vi-trophy-guide-roadmap/
- **SixShore — GTA 6 Trophy and Achievement List: All 55, Missables and
  Roadmap.** Second source for the grade split, the missable warning, the
  roadmap shape, the 100% checklist notes and the side-strand details
  (Andy's 5 quests, Kenton's 7 shipwrecks, Randy's 16 cars, Tyrone's labs,
  Bret's target decks, Kingpin Bowling's 3 valuables).
  https://sixshore.com/gta-6/guides/trophies-and-achievements/
- **GGRecon — GTA 6's trophy list is out, and the Platinum needs 100%.**
  Confirms the 55 count, the grade split, the platinum name, A Long Road
  (100%), the no-online-trophies point and the Positive Mental Attitude
  missable flag.
  https://www.ggrecon.com/articles/gta-6-trophies-achievements-list-platinum/
- **GTA Vice City Hub — GTA 6 Achievements.** Confirms the 55 count, the
  platinum, the ~28 hidden trophies and the 35-task 100% checklist.
  https://www.gtavicecityhub.com/achievements
- **Of Zen and Computing — GTA 6 Trophy List (November 2026).** Confirms the
  grade split, 28 hidden / 27 visible, the Xbox Gamerscore math and the
  per-trophy descriptions.
  https://www.ofzenandcomputing.com/gta-6-trophy-list-trophies-achievements/
- **All.gg — Every GTA 6 PSN Trophy.** Independent copy of the full list,
  used to double-check names and descriptions.
  https://all.gg/news/every-gta-6-psn-trophy/
- **Leonida Unlocked — GTA 6 Trophy List: 55 Trophies and the Platinum.**
  Confirms the Push Square / Exophase report and the no-online-trophies point.
  https://leonidaunlocked.com/trophies/

## Notes and caveats

- **Hidden count:** the starter data and the task brief say 28 hidden; the
  Planet GTA 6 split (27 visible + 28 hidden) matches exactly, and the 28
  hidden ids in `trophies.json` are the 12 story trophies plus the 16 hidden
  side trophies. (SixShore notes Push Square marks 27 — one trophy, Personal
  Best, is listed as visible by Push Square; we follow the Exophase split.)
- **Missable:** only Positive Mental Attitude is flagged, and only as
  *potentially* missable — PowerPyx and GTABase both say it is unconfirmed
  whether the Chapter 1 meditation is required. The guide says to do it
  anyway; `missable` is true for that trophy only.
- **Unconfirmed methods:** In The Beginning…, Bad Luck, I Guess and Ten Pin
  have no confirmed method at launch (PowerPyx: "currently unknown"). Their
  guides say so openly and give the best current lead instead of inventing
  one. Fair Game's exact trigger animal is likewise unconfirmed.
- **The 100% checklist** (`count: 35` on A Long Road) is the 35-task
  checklist reported by GTA Vice City Hub; the full checklist opens only
  after the story.
- **No official list:** Rockstar, Sony and Microsoft have not published an
  official trophy table; the list above is the public PSN list as mirrored by
  the trackers. If the trackers revise a name or grade, the file should be
  re-checked against Exophase / PSNProfiles.
