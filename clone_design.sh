#!/bin/bash

SRC="/Users/farzad/windsurf_projects/fbconsulting"
DEST="/Users/farzad/vscode/fbconsulting_01"

echo ">>> Copying public assets..."
[ -d "$SRC/public" ] && cp -R "$SRC/public/." "$DEST/public/"

echo ">>> Copying styles..."
mkdir -p "$DEST/src/styles"
cp -v "$SRC/src/styles/"*.css "$DEST/src/styles/" 2>/dev/null

echo ">>> Copying Tailwind & PostCSS config..."
[ -f "$SRC/tailwind.config.js" ] && cp "$SRC/tailwind.config.js" "$DEST/"
[ -f "$SRC/postcss.config.js" ] && cp "$SRC/postcss.config.js" "$DEST/"

echo ">>> Copying components..."
mkdir -p "$DEST/src/components"
for comp in layout ui hero testimonials chat sections brands icons; do
  if [ -d "$SRC/src/components/$comp" ]; then
    cp -R "$SRC/src/components/$comp" "$DEST/src/components/"
  fi
done

# Clone content pages if available
echo ">>> Copying app/page content (optional)..."

for route in about faq pricing testimonials contact; do
  if [ -f "$SRC/src/pages/$route.tsx" ]; then
    mkdir -p "$DEST/src/app/$route"
    cp "$SRC/src/pages/$route.tsx" "$DEST/src/app/$route/page.tsx"
  fi
done

echo ">>> Copying support libs and logic..."

for dir in lib hooks types services; do
  if [ -d "$SRC/src/$dir" ]; then
    cp -R "$SRC/src/$dir" "$DEST/src/"
  fi
done

echo ">>> Copying extra components..."

for comp in 3d copilot; do
  if [ -d "$SRC/src/components/$comp" ]; then
    cp -R "$SRC/src/components/$comp" "$DEST/src/components/"
  fi
done

echo "✅ All required source directories now copied."