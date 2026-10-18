#!/usr/bin/env node

import sharp from "sharp";
import fs from "fs";
import path from "path";

// Source folders are flattened into a single output folder, so two files with
// the same name (ignoring case) would silently overwrite each other on Windows.
// Order matters: later entries win. Keep Serviceimg last — the live site serves
// its Brackets/Window photos under the lowercase names below.
const inputDirs = [
  "public/img",
  "public/Projectimg",
  "public/Workshopimg",
  "public/Serviceimg",
];

const outputDir = "public/optimized";

// Outputs that are maintained by hand and have no source in inputDirs. These
// photos were dropped straight into public/optimized, so regenerating them
// from public/Serviceimg replaces what the live site actually shows with a
// different picture. Leave them alone; compress them in place if needed.
const skipOutputs = new Set(["brackets.png", "window.png"]);

const exts = new Set([".png", ".jpg", ".jpeg"]);

console.log("🖼️  Starting image optimization...");

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function optimizeImages() {
  // Resolve every source to its output name first, so collisions are reported
  // up front instead of being discovered as a mysterious wrong image later.
  const jobs = [];
  for (const dir of inputDirs) {
    if (!fs.existsSync(dir)) continue;
    for (const file of fs.readdirSync(dir)) {
      if (!exts.has(path.extname(file).toLowerCase())) continue;
      if (skipOutputs.has(file.toLowerCase())) {
        console.log(`⏭️  ${file}: hand-maintained output, skipping`);
        continue;
      }
      jobs.push({ sourcePath: path.join(dir, file), outName: file });
    }
  }

  const seen = new Map();
  for (const job of jobs) {
    const key = job.outName.toLowerCase();
    if (seen.has(key)) {
      console.warn(
        `⚠️  ${job.outName}: ${job.sourcePath} overwrites ${seen.get(key)}`
      );
    }
    seen.set(key, job.sourcePath);
  }

  let totalBefore = 0;
  let totalAfter = 0;

  for (const { sourcePath, outName } of jobs) {
    const destinationPath = path.join(outputDir, outName);
    const isPng = path.extname(outName).toLowerCase() === ".png";

    // Read to a buffer so a source and destination that resolve to the same
    // path can't truncate the file mid-write.
    const input = fs.readFileSync(sourcePath);
    const pipeline = sharp(input);
    const output = await (isPng
      ? pipeline.png({ palette: true, quality: 65, effort: 10, dither: 1 })
      : pipeline.jpeg({ quality: 75, mozjpeg: true })
    ).toBuffer();

    // The previous pngquant pipeline sometimes beat sharp on these photos, so
    // never replace an existing output with a bigger one. Without this the
    // folder grew ~6% the first time this script was swapped over.
    const existing = fs.existsSync(destinationPath)
      ? fs.statSync(destinationPath).size
      : Infinity;

    if (output.length >= existing) {
      totalBefore += existing;
      totalAfter += existing;
      console.log(
        `✋ ${outName}: kept existing ${(existing / 1024).toFixed(0)}kB (new ${(
          output.length / 1024
        ).toFixed(0)}kB was bigger)`
      );
      continue;
    }

    fs.writeFileSync(destinationPath, output);

    const before = Number.isFinite(existing) ? existing : input.length;
    const after = output.length;
    totalBefore += before;
    totalAfter += after;

    const savings = (((before - after) / before) * 100).toFixed(1);
    console.log(
      `📊 ${outName}: ${(before / 1024).toFixed(0)}kB → ${(
        after / 1024
      ).toFixed(0)}kB (${savings}% smaller)`
    );
  }

  console.log(`✅ Optimized ${jobs.length} images`);
  console.log(
    `🎉 Total: ${(totalBefore / 1024 / 1024).toFixed(2)}MB → ${(
      totalAfter /
      1024 /
      1024
    ).toFixed(2)}MB (${(
      ((totalBefore - totalAfter) / totalBefore) *
      100
    ).toFixed(1)}% smaller)`
  );
}

optimizeImages().catch((error) => {
  console.error("❌ Image optimization failed:", error);
  process.exit(1);
});
