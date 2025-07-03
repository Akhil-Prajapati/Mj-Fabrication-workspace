#!/usr/bin/env node

import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import archiver from "archiver";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distPath = path.join(__dirname, "dist");
const zipPath = path.join(__dirname, "mjfabrication-dist.zip");

console.log("🚀 Starting build process...");

try {
  // Step 1: Optimize images first
  console.log("🖼️  Optimizing images...");
  execSync("npm run optimize-images", { stdio: "inherit" });

  // Step 2: Build the project
  console.log("📦 Building the project...");
  execSync("npm run build", { stdio: "inherit" });

  // Step 3: Check if dist folder exists
  if (!fs.existsSync(distPath)) {
    throw new Error("❌ Build failed: dist folder not found");
  }

  // Step 4: Remove old zip file if exists
  if (fs.existsSync(zipPath)) {
    fs.unlinkSync(zipPath);
    console.log("🗑️  Removed old zip file");
  }

  // Step 5: Create zip file
  console.log("📦 Creating zip file...");

  const output = fs.createWriteStream(zipPath);
  const archive = archiver("zip", {
    zlib: { level: 9 }, // Maximum compression
  });

  // Handle archive events
  output.on("close", () => {
    const sizeInMB = (archive.pointer() / 1024 / 1024).toFixed(2);
    console.log(`✅ Zip file created successfully!`);
    console.log(`📁 File: mjfabrication-dist.zip`);
    console.log(`📊 Size: ${sizeInMB} MB`);
    console.log(`🎉 Ready to upload to Hostinger!`);
  });

  archive.on("error", (err) => {
    throw err;
  });

  // Pipe archive data to file
  archive.pipe(output);

  // Add all files from dist folder to zip
  archive.directory(distPath, false);

  // Finalize the archive
  archive.finalize();
} catch (error) {
  console.error("❌ Build and zip failed:", error.message);
  process.exit(1);
}
