#!/bin/bash

echo "🚀 Starting Project Merge..."

# Paths
DEST="/Users/farzad/vscode/fbconsulting_01"
SRC_V1="/Users/farzad/windsurf_projects/fbconsulting"
SRC_V2="/Users/farzad/vscode/fbcounsulting_v2"
SRC_COURSE="/Users/farzad/vscode/personal-ai-builder-main"
SRC_RESEARCH="/Users/farzad/vscode/industry-ai-education"

# Validate source directories
for DIR in "$SRC_V1" "$SRC_V2" "$SRC_COURSE" "$SRC_RESEARCH"; do
  if [ ! -d "$DIR" ]; then
    echo "❌ Error: Source directory $DIR not found!"
    exit 1
  fi
done

# Statistics
copied=0
skipped=0
errors=0

# Function to copy if destination doesn't exist
smart_copy() {
  local src="$1"
  local dest="$2"
  
  # Skip if source doesn't exist
  if [ ! -e "$src" ]; then
    echo "⚠️ Source not found: $src"
    ((errors++))
    return
  fi
  
  # Skip if destination already exists
  if [ -e "$dest" ]; then
    echo "⏩ Skipping (already exists): $dest"
    ((skipped++))
    return
  fi
  
  # Create parent directory if it doesn't exist
  mkdir -p "$(dirname "$dest")"
  
  # Copy the file or directory
  if cp -R "$src" "$dest"; then
    echo "✅ Copied: $src → $dest"
    ((copied++))
  else
    echo "❌ Failed to copy: $src → $dest"
    ((errors++))
  fi
}

# Create missing directories for structure
echo "📁 Creating base directory structure..."
for DIR in \
  "$DEST/src/app/api/chat" \
  "$DEST/src/app/resources/literature" \
  "$DEST/src/app/courses/ai-builder" \
  "$DEST/src/app/blog" \
  "$DEST/src/components/hero" \
  "$DEST/src/components/ui" \
  "$DEST/src/components/layout" \
  "$DEST/src/components/testimonials" \
  "$DEST/src/components/chat" \
  "$DEST/src/components/icons" \
  "$DEST/src/components/courses" \
  "$DEST/src/components/resources" \
  "$DEST/src/data" \
  "$DEST/src/lib" \
  "$DEST/src/hooks" \
  "$DEST/src/types" \
  "$DEST/public"; do
  mkdir -p "$DIR"
done

echo "📦 Copying from fbconsulting (v1 design system)..."
# Copy UI components only if not already present
if [ -d "$SRC_V1/src/components" ]; then
  find "$SRC_V1/src/components" -type f -name "*.tsx" -o -name "*.ts" | while read file; do
    rel_path=${file#"$SRC_V1/src/components/"}
    dest_path="$DEST/src/components/$rel_path"
    smart_copy "$file" "$dest_path"
  done
fi

# Copy styles
smart_copy "$SRC_V1/src/styles" "$DEST/src/styles"
smart_copy "$SRC_V1/tailwind.config.js" "$DEST/tailwind.config.js"
smart_copy "$SRC_V1/postcss.config.js" "$DEST/postcss.config.js"

# Copy App Router pages
smart_copy "$SRC_V1/src/app/page.tsx" "$DEST/src/app/page.tsx"
if [ -d "$SRC_V1/src/app/about" ]; then
  find "$SRC_V1/src/app/about" -type f | while read file; do
    rel_path=${file#"$SRC_V1/src/app/about/"}
    dest_path="$DEST/src/app/about/$rel_path"
    smart_copy "$file" "$dest_path"
  done
fi

# Similarly for other pages
for page in "contact" "services" "pricing" "testimonials" "faq"; do
  if [ -d "$SRC_V1/src/app/$page" ]; then
    find "$SRC_V1/src/app/$page" -type f | while read file; do
      rel_path=${file#"$SRC_V1/src/app/$page/"}
      dest_path="$DEST/src/app/$page/$rel_path"
      smart_copy "$file" "$dest_path"
    done
  fi
done

# Copy public assets
if [ -d "$SRC_V1/public" ]; then
  find "$SRC_V1/public" -type f | while read file; do
    rel_path=${file#"$SRC_V1/public/"}
    dest_path="$DEST/public/$rel_path"
    smart_copy "$file" "$dest_path"
  done
fi

echo "🔁 Copying backend chat API from fbcounsulting_v2..."
# Copy chat API
if [ -d "$SRC_V2/app/api/chat" ]; then
  find "$SRC_V2/app/api/chat" -type f | while read file; do
    rel_path=${file#"$SRC_V2/app/api/chat/"}
    dest_path="$DEST/src/app/api/chat/$rel_path"
    smart_copy "$file" "$dest_path"
  done
fi

# Copy lib files
if [ -d "$SRC_V2/lib" ]; then
  find "$SRC_V2/lib" -type f | while read file; do
    rel_path=${file#"$SRC_V2/lib/"}
    dest_path="$DEST/src/lib/$rel_path"
    smart_copy "$file" "$dest_path"
  done
fi

# Copy types
if [ -d "$SRC_V2/types" ]; then
  find "$SRC_V2/types" -type f | while read file; do
    rel_path=${file#"$SRC_V2/types/"}
    dest_path="$DEST/src/types/chat/$rel_path"
    smart_copy "$file" "$dest_path"
  done
fi

# Copy hooks
if [ -d "$SRC_V2/hooks" ]; then
  find "$SRC_V2/hooks" -type f | while read file; do
    rel_path=${file#"$SRC_V2/hooks/"}
    dest_path="$DEST/src/hooks/$rel_path"
    smart_copy "$file" "$dest_path"
  done
fi

echo "📘 Copying AI course content..."
# Individual components to courses directory
for comp in "Hero.tsx" "Footer.tsx" "Header.tsx" "StepCard.tsx"; do
  if [ -f "$SRC_COURSE/src/components/$comp" ]; then
    smart_copy "$SRC_COURSE/src/components/$comp" "$DEST/src/components/courses/$comp"
  fi
done

# Course component folders
for folder in "advanced" "intermediate" "basic"; do
  if [ -d "$SRC_COURSE/src/components/$folder" ]; then
    find "$SRC_COURSE/src/components/$folder" -type f | while read file; do
      rel_path=${file#"$SRC_COURSE/src/components/$folder/"}
      dest_path="$DEST/src/components/courses/$folder/$rel_path"
      smart_copy "$file" "$dest_path"
    done
  fi
done

# Course data
if [ -d "$SRC_COURSE/src/data" ]; then
  find "$SRC_COURSE/src/data" -type f | while read file; do
    rel_path=${file#"$SRC_COURSE/src/data/"}
    dest_path="$DEST/src/data/course/$rel_path"
    smart_copy "$file" "$dest_path"
  done
fi

# Course types
if [ -d "$SRC_COURSE/src/types" ]; then
  find "$SRC_COURSE/src/types" -type f | while read file; do
    rel_path=${file#"$SRC_COURSE/src/types/"}
    dest_path="$DEST/src/types/course/$rel_path"
    smart_copy "$file" "$dest_path"
  done
fi

echo "📚 Copying Research Explorer content..."
# Literature pages
if [ -d "$SRC_RESEARCH/app/resources/literature" ]; then
  find "$SRC_RESEARCH/app/resources/literature" -type f | while read file; do
    rel_path=${file#"$SRC_RESEARCH/app/resources/literature/"}
    dest_path="$DEST/src/app/resources/literature/$rel_path"
    smart_copy "$file" "$dest_path"
  done
fi

# Literature components
if [ -d "$SRC_RESEARCH/components/literature" ]; then
  find "$SRC_RESEARCH/components/literature" -type f | while read file; do
    rel_path=${file#"$SRC_RESEARCH/components/literature/"}
    dest_path="$DEST/src/components/resources/literature/$rel_path"
    smart_copy "$file" "$dest_path"
  done
fi

# Literature data
smart_copy "$SRC_RESEARCH/data/literature-data.ts" "$DEST/src/data/literature-data.ts"
smart_copy "$SRC_RESEARCH/lib/utils.ts" "$DEST/src/lib/research-utils.ts"

# Literature types
if [ -d "$SRC_RESEARCH/types" ]; then
  find "$SRC_RESEARCH/types" -type f | while read file; do
    rel_path=${file#"$SRC_RESEARCH/types/"}
    dest_path="$DEST/src/types/resources/$rel_path"
    smart_copy "$file" "$dest_path"
  done
fi

echo "📊 Merge Summary:"
echo "✅ Files copied: $copied"
echo "⏩ Files skipped (already exist): $skipped"
echo "❌ Errors: $errors"

echo "🧶 Package.json dependencies:"
echo "⚠️ Manual step required: You need to merge dependencies from each project's package.json"
echo "   Key packages to check for: @google/generative-ai, openai, tailwindcss, etc."

echo "🚀 Next steps:"
echo "  1. Fix imports in components to match new directory structure"
echo "  2. Update package.json with required dependencies"
echo "  3. Test each section individually"
echo "  4. Merge tailwind configurations"