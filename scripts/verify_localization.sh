#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color
YELLOW='\033[1;33m'

echo "🌍 Verifying localization system components..."

# Check core files existence
CORE_FILES=(
  "src/types/localization.ts"
  "src/contexts/LanguageContext.tsx"
  "src/hooks/useLocalization.ts"
  "src/hooks/useLocalizedUtils.ts"
  "src/utils/language.ts"
  "src/utils/languageDetection.ts"
  "src/components/LanguageSwitcher.tsx"
  "src/components/hoc/withLocalization.tsx"
)

echo -e "\n${YELLOW}Checking core files...${NC}"
for file in "${CORE_FILES[@]}"; do
  if [ -f "$file" ]; then
    echo -e "${GREEN}✓ Found${NC} $file"
  else
    echo -e "${RED}✗ Missing${NC} $file"
    exit 1
  fi
done

# Check example implementation
EXAMPLE_FILES=(
  "src/app/examples/localization/page.tsx"
  "src/app/examples/localization/client-page.tsx"
  "src/app/examples/localization/loading.tsx"
  "src/app/examples/localization/error.tsx"
)

echo -e "\n${YELLOW}Checking example implementation...${NC}"
for file in "${EXAMPLE_FILES[@]}"; do
  if [ -f "$file" ]; then
    echo -e "${GREEN}✓ Found${NC} $file"
  else
    echo -e "${RED}✗ Missing${NC} $file"
    exit 1
  fi
done

# Verify imports in key files
echo -e "\n${YELLOW}Verifying imports in layout...${NC}"
if grep -q "LanguageProvider" "src/app/layout.tsx"; then
  echo -e "${GREEN}✓ Found${NC} LanguageProvider in layout"
else
  echo -e "${RED}✗ Missing${NC} LanguageProvider in layout"
  exit 1
fi

# Run TypeScript check
echo -e "\n${YELLOW}Running TypeScript checks...${NC}"
if npx tsc --noEmit; then
  echo -e "${GREEN}✓ TypeScript checks passed${NC}"
else
  echo -e "${RED}✗ TypeScript checks failed${NC}"
  exit 1
fi

echo -e "\n${GREEN}✓ Localization system verification complete!${NC}"
echo "The following components are properly integrated:"
echo "- Core types and interfaces"
echo "- Context providers"
echo "- Utility hooks and functions"
echo "- Example implementation"
echo "- Type safety checks"
