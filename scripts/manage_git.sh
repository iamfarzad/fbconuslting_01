#!/bin/bash

# Set colors for better readability
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== FB Consulting Git Management Script ===${NC}\n"

# Check current branch
CURRENT_BRANCH=$(git branch --show-current)
echo -e "${YELLOW}Current branch:${NC} $CURRENT_BRANCH"

# Function to pull latest changes
pull_changes() {
  echo -e "\n${YELLOW}Pulling latest changes from origin $CURRENT_BRANCH...${NC}"
  git pull --ff-only origin $CURRENT_BRANCH
  
  if [ $? -eq 0 ]; then
    echo -e "${GREEN}Successfully pulled latest changes.${NC}"
  else
    echo -e "${RED}Failed to pull latest changes. You may have local commits or conflicts.${NC}"
    echo -e "Options:"
    echo -e "1. Stash your changes: ${BLUE}git stash${NC}"
    echo -e "2. Pull with rebase: ${BLUE}git pull --rebase origin $CURRENT_BRANCH${NC}"
    echo -e "3. Fetch only: ${BLUE}git fetch origin${NC}"
    
    read -p "Do you want to stash changes and try again? (y/n) " choice
    if [[ $choice == "y" || $choice == "Y" ]]; then
      git stash
      git pull --ff-only origin $CURRENT_BRANCH
      echo -e "${YELLOW}Your stashed changes can be applied with:${NC} git stash pop"
    fi
  fi
}

# Function to categorize changes
categorize_changes() {
  echo -e "\n${YELLOW}Categorizing changes...${NC}"
  
  # Create temporary directory for categorized files
  TEMP_DIR=$(mktemp -d)
  
  # Get all changed files
  CHANGED_FILES=$(git status --porcelain | cut -c4-)
  
  # Categorize files by type/component
  echo "$CHANGED_FILES" | grep -E "components/hero|components/layout" > "$TEMP_DIR/core_ui.txt"
  echo "$CHANGED_FILES" | grep -E "components/courses|components/workshop|app/courses|app/workshop" > "$TEMP_DIR/courses.txt"
  echo "$CHANGED_FILES" | grep -E "components/chat|app/api/chat|hooks/chat" > "$TEMP_DIR/chat.txt"
  echo "$CHANGED_FILES" | grep -E "components/ui" > "$TEMP_DIR/shadcn.txt"
  echo "$CHANGED_FILES" | grep -E "styles|globals.css|tailwind" > "$TEMP_DIR/styles.txt"
  echo "$CHANGED_FILES" | grep -E "scripts|\.sh$" > "$TEMP_DIR/scripts.txt"
  echo "$CHANGED_FILES" | grep -E "\.json$|\.js$|\.babelrc|next.config" > "$TEMP_DIR/config.txt"
  
  # Display categorized files
  echo -e "\n${BLUE}Core UI Components:${NC} $(wc -l < "$TEMP_DIR/core_ui.txt") files"
  echo -e "${BLUE}Course & Workshop:${NC} $(wc -l < "$TEMP_DIR/courses.txt") files"
  echo -e "${BLUE}Chat Components:${NC} $(wc -l < "$TEMP_DIR/chat.txt") files"
  echo -e "${BLUE}UI Components:${NC} $(wc -l < "$TEMP_DIR/shadcn.txt") files"
  echo -e "${BLUE}Styles:${NC} $(wc -l < "$TEMP_DIR/styles.txt") files"
  echo -e "${BLUE}Scripts:${NC} $(wc -l < "$TEMP_DIR/scripts.txt") files"
  echo -e "${BLUE}Config Files:${NC} $(wc -l < "$TEMP_DIR/config.txt") files"
  
  # Cleanup
  rm -rf "$TEMP_DIR"
}

# Function to commit changes by category
commit_by_category() {
  echo -e "\n${YELLOW}Preparing to commit changes by category...${NC}"
  echo -e "${RED}Note:${NC} This will stage and commit all changes! Make sure you've reviewed them."
  read -p "Continue with committing by category? (y/n) " choice
  
  if [[ $choice != "y" && $choice != "Y" ]]; then
    echo -e "${YELLOW}Commit canceled.${NC}"
    return
  fi
  
  # Commit configuration changes
  CONFIG_FILES=$(git status --porcelain | grep -E "\.json$|\.js$|\.babelrc|next.config" | cut -c4-)
  if [ ! -z "$CONFIG_FILES" ]; then
    echo -e "\n${BLUE}Committing configuration files...${NC}"
    git add $(echo "$CONFIG_FILES" | tr '\n' ' ')
    git commit -m "Config: Update project configuration files"
  fi
  
  # Commit script changes
  SCRIPT_FILES=$(git status --porcelain | grep -E "scripts|\.sh$" | cut -c4-)
  if [ ! -z "$SCRIPT_FILES" ]; then
    echo -e "\n${BLUE}Committing script files...${NC}"
    git add $(echo "$SCRIPT_FILES" | tr '\n' ' ')
    git commit -m "Scripts: Update automation and utility scripts"
  fi
  
  # Commit style changes
  STYLE_FILES=$(git status --porcelain | grep -E "styles|globals.css|tailwind" | cut -c4-)
  if [ ! -z "$STYLE_FILES" ]; then
    echo -e "\n${BLUE}Committing style files...${NC}"
    git add $(echo "$STYLE_FILES" | tr '\n' ' ')
    git commit -m "Styles: Update global styles and design system"
  fi
  
  # Commit UI component changes
  UI_FILES=$(git status --porcelain | grep -E "components/ui" | cut -c4-)
  if [ ! -z "$UI_FILES" ]; then
    echo -e "\n${BLUE}Committing UI component files...${NC}"
    git add $(echo "$UI_FILES" | tr '\n' ' ')
    git commit -m "UI: Update shadcn/ui components"
  fi
  
  # Commit core UI components
  CORE_UI_FILES=$(git status --porcelain | grep -E "components/hero|components/layout" | cut -c4-)
  if [ ! -z "$CORE_UI_FILES" ]; then
    echo -e "\n${BLUE}Committing core UI files...${NC}"
    git add $(echo "$CORE_UI_FILES" | tr '\n' ' ')
    git commit -m "Core: Update hero and layout components"
  fi
  
  # Commit course/workshop components
  COURSE_FILES=$(git status --porcelain | grep -E "components/courses|components/workshop|app/courses|app/workshop" | cut -c4-)
  if [ ! -z "$COURSE_FILES" ]; then
    echo -e "\n${BLUE}Committing course and workshop files...${NC}"
    git add $(echo "$COURSE_FILES" | tr '\n' ' ')
    git commit -m "Courses: Update course and workshop components"
  fi
  
  # Commit chat components
  CHAT_FILES=$(git status --porcelain | grep -E "components/chat|app/api/chat|hooks/chat" | cut -c4-)
  if [ ! -z "$CHAT_FILES" ]; then
    echo -e "\n${BLUE}Committing chat files...${NC}"
    git add $(echo "$CHAT_FILES" | tr '\n' ' ')
    git commit -m "Chat: Update chat components and API"
  fi
  
  # Commit remaining files
  REMAINING=$(git status --porcelain | grep "^?? \|^M " | cut -c4-)
  if [ ! -z "$REMAINING" ]; then
    echo -e "\n${BLUE}Committing remaining files...${NC}"
    git add .
    git commit -m "Misc: Update miscellaneous files"
  fi
  
  echo -e "\n${GREEN}All changes have been committed by category.${NC}"
}

# Function to create a feature branch
create_feature_branch() {
  echo -e "\n${YELLOW}Creating a feature branch...${NC}"
  read -p "Enter feature branch name (e.g. feature/workshop-page): " branch_name
  
  if [ -z "$branch_name" ]; then
    echo -e "${RED}Branch name cannot be empty.${NC}"
    return
  fi
  
  git checkout -b "$branch_name"
  echo -e "${GREEN}Created and switched to branch:${NC} $branch_name"
}

# Function to push changes
push_changes() {
  echo -e "\n${YELLOW}Pushing changes to origin $CURRENT_BRANCH...${NC}"
  git push origin "$CURRENT_BRANCH"
  
  if [ $? -eq 0 ]; then
    echo -e "${GREEN}Successfully pushed changes to origin $CURRENT_BRANCH.${NC}"
  else
    echo -e "${RED}Failed to push changes. The remote branch might have new commits.${NC}"
    echo -e "Try pulling first with: ${BLUE}git pull --rebase origin $CURRENT_BRANCH${NC}"
  fi
}

# Display menu
echo -e "\n${YELLOW}Available actions:${NC}"
echo "1. Pull latest changes"
echo "2. Categorize changes"
echo "3. Commit changes by category"
echo "4. Create feature branch"
echo "5. Push changes"
echo "6. Exit"

read -p "Enter your choice (1-6): " choice

case $choice in
  1) pull_changes ;;
  2) categorize_changes ;;
  3) commit_by_category ;;
  4) create_feature_branch ;;
  5) push_changes ;;
  6) echo -e "${GREEN}Exiting.${NC}" ;;
  *) echo -e "${RED}Invalid choice.${NC}" ;;
esac

echo -e "\n${BLUE}=== Script completed ===${NC}"