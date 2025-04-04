#!/bin/bash

echo "🔍 Verifying merged components against merger_plan_01.md..."

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Check required directories and files from fbconsulting
echo -e "\n${YELLOW}Checking fbconsulting components...${NC}"
FB_CONSULTING=(
  "src/styles/globals.css"
  "src/components/ui"
  "tailwind.config.js"
  "src/components/layout"
  "src/app/page.tsx"
)

for item in "${FB_CONSULTING[@]}"; do
  if [ -e "$item" ]; then
    echo -e "${GREEN}✓ Found${NC} $item"
  else
    echo -e "${RED}✗ Missing${NC} $item"
  fi
done

# Check Gemini chat backend from fbcounsulting_v2
echo -e "\n${YELLOW}Checking chat backend components...${NC}"
CHAT_BACKEND=(
  "src/app/api/chat"
  "src/lib/gemini"
  "src/types/chat.d.ts"
)

for item in "${CHAT_BACKEND[@]}"; do
  if [ -e "$item" ]; then
    echo -e "${GREEN}✓ Found${NC} $item"
  else
    echo -e "${RED}✗ Missing${NC} $item"
  fi
done

# Check course content from personal-ai-builder-main
echo -e "\n${YELLOW}Checking course components...${NC}"
COURSE_COMPONENTS=(
  "src/components/courses"
  "src/data/course"
  "src/app/courses"
)

for item in "${COURSE_COMPONENTS[@]}"; do
  if [ -e "$item" ]; then
    echo -e "${GREEN}✓ Found${NC} $item"
  else
    echo -e "${RED}✗ Missing${NC} $item"
  fi
done

# Check literature explorer from industry-ai-education
echo -e "\n${YELLOW}Checking literature components...${NC}"
LITERATURE_COMPONENTS=(
  "src/app/resources/literature"
  "src/components/resources"
  "src/data/literature-data.ts"
)

for item in "${LITERATURE_COMPONENTS[@]}"; do
  if [ -e "$item" ]; then
    echo -e "${GREEN}✓ Found${NC} $item"
  else
    echo -e "${RED}✗ Missing${NC} $item"
  fi
done

# Check localization implementation
echo -e "\n${YELLOW}Checking localization system...${NC}"
LOCALIZATION=(
  "src/types/localization.ts"
  "src/hooks/useLocalization.ts"
  "src/components/LanguageSwitcher.tsx"
  "src/app/examples/localization"
)

for item in "${LOCALIZATION[@]}"; do
  if [ -e "$item" ]; then
    echo -e "${GREEN}✓ Found${NC} $item"
  else
    echo -e "${RED}✗ Missing${NC} $item"
  fi
done

echo -e "\n✨ Merge verification complete!"
