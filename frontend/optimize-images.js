#!/usr/bin/env node

import imagemin from "imagemin";
import imageminPngquant from "imagemin-pngquant";
import imageminMozjpeg from "imagemin-mozjpeg";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputPaths = [
  "public/img/*.png",
  "public/Projectimg/*.png",
  "public/Serviceimg/*.png",
  "public/Workshopimg/*.png",
];

const outputDir = "public/optimized";

console.log("🖼️  Starting image optimization...");

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function optimizeImages() {
  try {
    const files = await imagemin(inputPaths, {
      destination: outputDir,
      plugins: [
        imageminPngquant({
          quality: [0.6, 0.8], // Compress to 60-80% quality
        }),
        imageminMozjpeg({
          quality: 75, // JPEG quality
        }),
      ],
    });

    console.log("✅ Images optimized successfully!");
    console.log(`📁 Optimized ${files.length} images`);

    // Show file size comparison
    for (const file of files) {
      const originalPath = file.sourcePath;
      const optimizedPath = file.destinationPath;

      if (fs.existsSync(originalPath)) {
        const originalSize = fs.statSync(originalPath).size;
        const optimizedSize = fs.statSync(optimizedPath).size;
        const savings = (
          ((originalSize - optimizedSize) / originalSize) *
          100
        ).toFixed(1);

        console.log(
          `📊 ${path.basename(originalPath)}: ${(
            originalSize /
            1024 /
            1024
          ).toFixed(2)}MB → ${(optimizedSize / 1024 / 1024).toFixed(
            2
          )}MB (${savings}% smaller)`
        );
      }
    }

    console.log("🎉 Image optimization complete!");
    console.log("📝 Replace your image paths with optimized versions");
  } catch (error) {
    console.error("❌ Image optimization failed:", error);
  }
}

optimizeImages();
