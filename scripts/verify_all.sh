#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🚀 Running complete verification...${NC}"

# Make all scripts executable
chmod +x scripts/*.sh

# 1. Run TypeScript fixes and checks
echo -e "\n${YELLOW}1. Running TypeScript fixes...${NC}"
./scripts/fix_typescript.sh
if [ $? -ne 0 ]; then
  echo -e "${RED}✗ TypeScript fixes failed${NC}"
  exit 1
else
  echo -e "${GREEN}✓ TypeScript fixes completed${NC}"
fi

# 2. Verify merge implementation
echo -e "\n${YELLOW}2. Verifying merge implementation...${NC}"
./scripts/verify_merge.sh
if [ $? -ne 0 ]; then
  echo -e "${RED}✗ Merge verification failed${NC}"
  exit 1
else
  echo -e "${GREEN}✓ Merge verification completed${NC}"
fi

# 3. Check localization implementation
echo -e "\n${YELLOW}3. Checking localization system...${NC}"
./scripts/verify_localization.sh
if [ $? -ne 0 ]; then
  echo -e "${RED}✗ Localization checks failed${NC}"
  exit 1
else
  echo -e "${GREEN}✓ Localization checks passed${NC}"
fi

# 4. Verify UI components
echo -e "\n${YELLOW}4. Verifying UI components...${NC}"
./scripts/verify_components.sh
if [ $? -ne 0 ]; then
  echo -e "${RED}✗ Component verification failed${NC}"
  exit 1
else
  echo -e "${GREEN}✓ Component verification completed${NC}"
fi

# 5. Run build check
echo -e "\n${YELLOW}5. Running build check...${NC}"
npm run build
if [ $? -ne 0 ]; then
  echo -e "${RED}✗ Build failed${NC}"
  exit 1
else
  echo -e "${GREEN}✓ Build succeeded${NC}"
fi

echo -e "\n${GREEN}✨ All verifications completed successfully!${NC}"
echo -e "Review the detailed logs in src/LOCALIZATION_STATUS.md"

# Update status file with timestamp
echo -e "\nLast verification: $(date)" >> src/LOCALIZATION_STATUS.md
