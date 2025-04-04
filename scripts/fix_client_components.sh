#!/bin/bash

# Set colors for better readability
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== Adding 'use client' directives to client components ===${NC}\n"

# List of React hooks and browser APIs to search for
PATTERNS=(
  "useState"
  "useEffect"
  "useContext"
  "useRef"
  "useCallback"
  "useMemo"
  "useReducer"
  "useLayoutEffect"
  "useImperativeHandle"
  "useDebugValue"
  "createContext"
  "useRouter"
  "usePathname"
  "useSearchParams"
  "document\\."
  "window\\."
  "navigator\\."
  "localStorage"
  "sessionStorage"
  "onClick"
  "onChange"
  "onSubmit"
  "onKeyDown"
  "onFocus"
  "onBlur"
)

# Directories to check
DIRECTORIES=(
  "src/components"
  "src/app"
  "src/contexts"
  "src/hooks"
)

# Create a grep pattern for hooks and browser APIs
PATTERN=$(IFS="|"; echo "${PATTERNS[*]}")

# Function to process a directory
process_directory() {
  local dir=$1
  echo -e "${YELLOW}Processing directory: ${dir}${NC}"
  
  # Find files that use client-side features but don't have 'use client'
  if [ -d "$dir" ]; then
    FILES=$(grep -l -E "$PATTERN" --include="*.tsx" --include="*.jsx" "$dir" 2>/dev/null | xargs grep -L "use client" 2>/dev/null || echo "")
    
    if [ -z "$FILES" ]; then
      echo -e "  ${GREEN}✓ No files need 'use client' directive in ${dir}${NC}"
      return
    fi
    
    # Count of files to modify
    COUNT=$(echo "$FILES" | grep -v "^$" | wc -l)
    echo -e "  Found ${RED}$COUNT${NC} files that need 'use client' directive"
    
    # Add 'use client' to each file
    echo "$FILES" | while read -r file; do
      if [ -n "$file" ]; then
        echo -e "  Adding 'use client' to ${BLUE}$file${NC}"
        sed -i '' '1s/^/"use client";\n\n/' "$file"
      fi
    done
  else
    echo -e "  ${RED}Directory $dir does not exist${NC}"
  fi
}

# Process each directory
for dir in "${DIRECTORIES[@]}"; do
  process_directory "$dir"
done

echo -e "\n${GREEN}Completed adding 'use client' directives to client components.${NC}"
echo -e "Restart your Next.js server to see the changes."
