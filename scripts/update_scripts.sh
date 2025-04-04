#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo "🔍 Running comprehensive integration verification..."
echo "Checking all components from merger_plan_01.md"

# Status tracking
TOTAL_CHECKS=0
PASSED_CHECKS=0
FAILED_COMPONENTS=()

# Function to check component existence
check_component() {
  local component_path=$1
  local source_project=$2
  TOTAL_CHECKS=$((TOTAL_CHECKS+1))
  
  if [ -e "$component_path" ]; then
    echo -e "${GREEN}✓ Found${NC} $component_path ${BLUE}(from $source_project)${NC}"
    PASSED_CHECKS=$((PASSED_CHECKS+1))
  else
    echo -e "${RED}✗ Missing${NC} $component_path ${BLUE}(from $source_project)${NC}"
    FAILED_COMPONENTS+=("$component_path from $source_project")
  fi
}

# 1. Check fbconsulting components (UI & Design Foundation)
echo -e "\n${YELLOW}Checking Design & UI Foundation (fbconsulting)...${NC}"

FB_DESIGN_COMPONENTS=(
  "src/styles/globals.css"
  "src/components/ui"
  "tailwind.config.js"
  "src/components/layout"
  "src/app/page.tsx"
  "src/components/hero"
  "src/components/testimonials"
  "src/components/pricing"
)

for component in "${FB_DESIGN_COMPONENTS[@]}"; do
  check_component "$component" "fbconsulting"
done

# 2. Check fbcounsulting_v2 components (Chat Backend)
echo -e "\n${YELLOW}Checking Chat Backend (fbcounsulting_v2)...${NC}"

CHAT_COMPONENTS=(
  "src/app/api/chat"
  "src/lib/chat"
  "src/types/chat"
  "src/hooks/useChat.ts"
  "src/components/chat"
)

for component in "${CHAT_COMPONENTS[@]}"; do
  check_component "$component" "fbcounsulting_v2"
done

# 3. Check personal-ai-builder-main components (Course System)
echo -e "\n${YELLOW}Checking Course System (personal-ai-builder-main)...${NC}"

COURSE_COMPONENTS=(
  "src/components/courses"
  "src/data/course"
  "src/app/courses"
  "src/components/courses/StepCard.tsx"
  "src/components/courses/LevelSection.tsx"
)

for component in "${COURSE_COMPONENTS[@]}"; do
  check_component "$component" "personal-ai-builder-main"
done

# 4. Check industry-ai-education components (Literature Explorer)
echo -e "\n${YELLOW}Checking Literature Explorer (industry-ai-education)...${NC}"

LITERATURE_COMPONENTS=(
  "src/app/resources/literature"
  "src/components/resources"
  "src/data/literature-data.ts"
  "src/types/literature.ts"
)

for component in "${LITERATURE_COMPONENTS[@]}"; do
  check_component "$component" "industry-ai-education"
done

# 5. Check localization system
echo -e "\n${YELLOW}Checking Localization System...${NC}"

LOCALIZATION_COMPONENTS=(
  "src/types/localization.ts"
  "src/contexts/LanguageContext.tsx"
  "src/hooks/useLocalization.ts"
  "src/utils/language.ts"
  "src/components/LanguageSwitcher.tsx"
  "src/app/examples/localization"
)

for component in "${LOCALIZATION_COMPONENTS[@]}"; do
  check_component "$component" "integrated system"
done

# 6. Check for duplicate components
echo -e "\n${YELLOW}Checking for potential duplicates...${NC}"

# Areas with potential duplicates
POTENTIAL_DUPLICATES=(
  "Hero components" "src/components/hero src/components/ui/hero src/components/courses/hero"
  "Navigation" "src/components/layout/Navbar.tsx src/components/navigation src/components/ui/Navbar.tsx"
  "Footer" "src/components/layout/Footer.tsx src/components/Footer.tsx"
  "Button" "src/components/ui/button.tsx src/components/ui/Button.tsx src/components/Button.tsx"
)

for ((i=0; i<${#POTENTIAL_DUPLICATES[@]}; i+=2)); do
  component_name="${POTENTIAL_DUPLICATES[i]}"
  search_paths="${POTENTIAL_DUPLICATES[i+1]}"
  
  echo -e "\nChecking for duplicate ${BLUE}$component_name${NC}..."
  found_count=0
  found_paths=()
  
  for path in $search_paths; do
    if [ -e "$path" ]; then
      found_count=$((found_count+1))
      found_paths+=("$path")
    fi
  done
  
  if [ $found_count -gt 1 ]; then
    echo -e "${RED}⚠️ Potential duplicate:${NC} Found $found_count versions of $component_name"
    for path in "${found_paths[@]}"; do
      echo "  - $path"
    done
  else
    echo -e "${GREEN}✓ No duplicates${NC} found for $component_name"
  fi
done

# 7. Check import consistency for key components
echo -e "\n${YELLOW}Checking import consistency...${NC}"

# Check imports in key files
IMPORT_CHECKS=(
  "src/app/layout.tsx" "LanguageProvider"
  "src/app/page.tsx" "HeroSection"
  "src/components/courses/StepCard.tsx" "@/types"
  "src/components/resources" "@/data/literature-data"
)

for ((i=0; i<${#IMPORT_CHECKS[@]}; i+=2)); do
  file="${IMPORT_CHECKS[i]}"
  import_str="${IMPORT_CHECKS[i+1]}"
  
  if [ -f "$file" ]; then
    if grep -q "$import_str" "$file"; then
      echo -e "${GREEN}✓ Found import${NC} $import_str in $file"
    else
      echo -e "${RED}✗ Missing import${NC} $import_str in $file"
    fi
  else
    echo -e "${YELLOW}⚠️ Cannot check imports:${NC} File $file not found"
  fi
done

# Summary
echo -e "\n${YELLOW}============== SUMMARY ==============${NC}"
echo -e "Total checks: $TOTAL_CHECKS"
echo -e "Passed: ${GREEN}$PASSED_CHECKS${NC}"
echo -e "Failed: ${RED}$((TOTAL_CHECKS-PASSED_CHECKS))${NC}"

# Display failed components if any
if [ ${#FAILED_COMPONENTS[@]} -gt 0 ]; then
  echo -e "\n${RED}Failed Components:${NC}"
  for component in "${FAILED_COMPONENTS[@]}"; do
    echo "- $component"
  done
fi

# Success rate
success_rate=$(( (PASSED_CHECKS * 100) / TOTAL_CHECKS ))
echo -e "\nIntegration success rate: ${YELLOW}$success_rate%${NC}"

# Add entries to VERIFICATION.md
echo -e "\nUpdating verification status in VERIFICATION.md..."
timestamp=$(date)
echo -e "\n## Integration Verification - $timestamp" >> VERIFICATION.md
echo -e "- Components checked: $TOTAL_CHECKS" >> VERIFICATION.md
echo -e "- Success rate: $success_rate%" >> VERIFICATION.md

# Update LOCALIZATION_STATUS.md
echo -e "\nUpdating localization status in src/LOCALIZATION_STATUS.md..."
echo -e "\nLast verification: $timestamp" >> src/LOCALIZATION_STATUS.md

# Final recommendation
echo -e "\n${YELLOW}Recommendation:${NC}"
if [ $success_rate -ge 90 ]; then
  echo -e "${GREEN}✅ Integration looks good!${NC} Focus on any remaining missing components."
elif [ $success_rate -ge 70 ]; then
  echo -e "${YELLOW}⚠️ Some components still missing.${NC} Review the failed components list."
else
  echo -e "${RED}❌ Significant integration issues.${NC} Several components are missing."
fi

echo -e "\nVerification completed! Run this script again after addressing any issues."