import fs from "fs";
import path from "path";
import sharp from "sharp";

function createIconSvg(size: number = 512): string {
  return `<svg width="${size}" height="${size}" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="bgGlow" cx="40%" cy="30%" r="75%">
      <stop offset="0%" stop-color="#3730a3" />
      <stop offset="50%" stop-color="#1e1b4b" />
      <stop offset="100%" stop-color="#090d16" />
    </radialGradient>
    <linearGradient id="starGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="30%" stop-color="#a5b4fc" />
      <stop offset="70%" stop-color="#818cf8" />
      <stop offset="100%" stop-color="#c084fc" />
    </linearGradient>
    <linearGradient id="miniStarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="100%" stop-color="#818cf8" />
    </linearGradient>
    <filter id="starGlow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="16" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- Squircle Base Container -->
  <rect x="24" y="24" width="464" height="464" rx="116" fill="url(#bgGlow)" stroke="#4338ca" stroke-width="12" />

  <!-- Inner border highlight -->
  <rect x="36" y="36" width="440" height="440" rx="104" fill="none" stroke="#6366f1" stroke-width="2" stroke-opacity="0.35" />

  <!-- Center Primary AI Sparkle Star -->
  <!-- Center at (256, 260) with bezier curved star rays -->
  <path
    d="M 256 100
       Q 256 210, 390 260
       Q 256 310, 256 420
       Q 256 310, 122 260
       Q 256 210, 256 100 Z"
    fill="url(#starGrad)"
    filter="url(#starGlow)"
  />

  <!-- High-contrast core sparkle -->
  <path
    d="M 256 140
       Q 256 225, 345 260
       Q 256 295, 256 380
       Q 256 295, 167 260
       Q 256 225, 256 140 Z"
    fill="#ffffff"
    opacity="0.9"
  />

  <!-- Top-right satellite sparkle -->
  <path
    d="M 380 95
       Q 380 135, 415 145
       Q 380 155, 380 195
       Q 380 155, 345 145
       Q 380 135, 380 95 Z"
    fill="url(#miniStarGrad)"
    opacity="0.95"
  />

  <!-- Bottom-left miniature sparkle dot -->
  <circle cx="150" cy="370" r="14" fill="#a5b4fc" opacity="0.85" />
</svg>`;
}

/**
 * Builds a multi-resolution ICO file buffer from multiple PNG buffers.
 */
function createIco(pngBuffers: { size: number; buffer: Buffer }[]): Buffer {
  const count = pngBuffers.length;
  // Header: 6 bytes
  // Directory entries: 16 bytes each
  const headerSize = 6;
  const dirEntrySize = 16;
  let offset = headerSize + count * dirEntrySize;

  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0); // Reserved
  header.writeUInt16LE(1, 2); // 1 = ICO type
  header.writeUInt16LE(count, 4); // Number of images

  const dirEntries: Buffer[] = [];
  const imageBuffers: Buffer[] = [];

  for (const item of pngBuffers) {
    const entry = Buffer.alloc(dirEntrySize);
    const size = item.size >= 256 ? 0 : item.size;
    entry.writeUInt8(size, 0); // Width
    entry.writeUInt8(size, 1); // Height
    entry.writeUInt8(0, 2); // Color palette
    entry.writeUInt8(0, 3); // Reserved
    entry.writeUInt16LE(1, 4); // Color planes
    entry.writeUInt16LE(32, 6); // Bits per pixel
    entry.writeUInt32LE(item.buffer.length, 8); // Image size in bytes
    entry.writeUInt32LE(offset, 12); // Image offset

    dirEntries.push(entry);
    imageBuffers.push(item.buffer);

    offset += item.buffer.length;
  }

  return Buffer.concat([header, ...dirEntries, ...imageBuffers]);
}

async function main() {
  console.log("Generating custom Beautiful AI Prompt favicon & icons...");

  const svg512 = Buffer.from(createIconSvg(512));

  // Generate PNGs at required sizes
  const png16 = await sharp(svg512).resize(16, 16).png().toBuffer();
  const png32 = await sharp(svg512).resize(32, 32).png().toBuffer();
  const png48 = await sharp(svg512).resize(48, 48).png().toBuffer();
  const png64 = await sharp(svg512).resize(64, 64).png().toBuffer();
  const png180 = await sharp(svg512).resize(180, 180).png().toBuffer();
  const png512 = await sharp(svg512).resize(512, 512).png().toBuffer();

  // Create multi-layer ICO containing 16x16, 32x32, 48x48, 64x64
  const icoBuffer = createIco([
    { size: 16, buffer: png16 },
    { size: 32, buffer: png32 },
    { size: 48, buffer: png48 },
    { size: 64, buffer: png64 },
  ]);

  // Target paths
  const appFavicon = path.join(process.cwd(), "src", "app", "favicon.ico");
  const publicFavicon = path.join(process.cwd(), "public", "favicon.ico");
  const appIcon32 = path.join(process.cwd(), "src", "app", "icon.png");
  const publicIcon32 = path.join(process.cwd(), "public", "icon.png");
  const appAppleIcon = path.join(process.cwd(), "src", "app", "apple-icon.png");
  const publicAppleIcon = path.join(process.cwd(), "public", "apple-icon.png");
  const publicIcon512 = path.join(process.cwd(), "public", "icon-512.png");

  fs.writeFileSync(appFavicon, icoBuffer);
  fs.writeFileSync(publicFavicon, icoBuffer);
  fs.writeFileSync(appIcon32, png32);
  fs.writeFileSync(publicIcon32, png32);
  fs.writeFileSync(appAppleIcon, png180);
  fs.writeFileSync(publicAppleIcon, png180);
  fs.writeFileSync(publicIcon512, png512);

  console.log(`  ✔ Generated ${appFavicon} (${icoBuffer.length} bytes, multi-resolution 16/32/48/64)`);
  console.log(`  ✔ Generated ${publicFavicon} (mirror for root queries)`);
  console.log(`  ✔ Generated ${appIcon32} (32x32 standard browser tab icon)`);
  console.log(`  ✔ Generated ${appAppleIcon} (180x180 iOS / Apple Touch icon)`);
  console.log(`  ✔ Generated ${publicIcon512} (512x512 PWA manifest icon)`);

  console.log("Favicon and app icon assets successfully generated!");
}

main().catch((err) => {
  console.error("Error generating favicon:", err);
  process.exit(1);
});
