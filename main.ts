// Leonida Trophy Guide — the hand-in step for make.fun's gta6-trophy-guide-01.
// The guide itself is plain static files under app/ (index.html + style.css +
// app.js + data/trophies.json, no build step, nothing fetched over the network).
// This file only packages it: it copies app/ and screenshots/ from beside this
// file into the output directory and writes dossier.json there, using the
// vendored make.fun library. The scorer re-runs that same library on what is
// handed in and requires dossier.json to match it byte for byte, so the caps
// below are the bounty's own gates (at most 4 screenshots, each at most
// 256 KiB; at most 993 entries / 48 MiB under app/). vendor/ stays untouched.
//
// Run it locally with:  mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
// (outside the grader, MAKEFUN_OUTPUT_DIR stands in for /output).
// Serve the guide while developing with:  node serve.ts  → http://localhost:8080

import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const here = fileURLToPath(new URL('.', import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// Fresh output directory, then the two trees the entry is made of.
mkdirSync(out, { recursive: true });
cpSync(join(here, 'app'), join(out, 'app'), { recursive: true });
mkdirSync(join(out, 'screenshots'), { recursive: true });
if (existsSync(join(here, 'screenshots'))) {
  cpSync(join(here, 'screenshots'), join(out, 'screenshots'), { recursive: true });
}

// The dossier is the judge's summary of the entry: screenshots, first-load
// files and bytes, and the source. It must be exactly what buildDossier
// writes from this same output tree, so write it last, after the copies.
writeFileSync(
  join(out, 'dossier.json'),
  buildDossier(out, {
    text_max_bytes: 163840,
    screenshots: { max: 4, max_bytes: 262144 },
    app_max_files: 993,
    app_max_bytes: 50331648,
  }),
);
