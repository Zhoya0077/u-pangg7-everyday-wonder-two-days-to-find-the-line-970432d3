// Everyday Wonder — one sentence, at most 200 characters.
// The program writes the entry to $MAKEFUN_OUTPUT_DIR/entry.txt
// (or ./output/entry.txt when the variable is unset).
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "My shoelace came undone on the escalator, and for three steps I was the only person in the station standing still while the world carried me.";

// Self-checking gate: the competition gate requires UTF-8 text of
// 1–200 characters, not only whitespace, in a single sentence.
// Fail loudly here rather than shipping an invalid entry.
if (ENTRY.length < 1 || ENTRY.length > 200) {
  throw new Error(`entry length ${ENTRY.length} outside 1..200`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry is only whitespace");
}
const sentenceCount = (ENTRY.match(/[.!?]/g) ?? []).length;
if (sentenceCount !== 1) {
  throw new Error(`entry must be one sentence, found ${sentenceCount} terminators`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "./output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
console.log(`wrote entry.txt (${ENTRY.length} chars)`);
