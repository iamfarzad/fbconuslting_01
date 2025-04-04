#!/bin/bash

echo "🗂️ Organizing project files..."

# Create scripts directory if it doesn't exist
mkdir -p scripts

# Move script files to scripts directory
echo "📁 Moving script files to scripts directory..."

# Installation & dependency scripts
mv fix_dependencies.sh scripts/deps_install.sh
mv fix_3d_dependencies.sh scripts/deps_3d_install.sh
mv fix_3d_dependencies_v2.sh scripts/deps_3d_install_v2.sh
mv fix_final_dependencies.sh scripts/deps_final_install.sh
mv fix_remaining_deps.sh scripts/deps_remaining_install.sh
mv fix_critical_security.sh scripts/security_fix.sh
mv fix_security_issues.sh scripts/security_issues_fix.sh
mv fix_security_final.sh scripts/security_final_fix.sh
mv fix_next_security.sh scripts/next_security_fix.sh

# TypeScript fix scripts
mv fix_typescript_issues.sh scripts/ts_fix.sh
mv fix_typescript_errors.sh scripts/ts_errors_fix.sh
mv fix_typescript_errors_v2.sh scripts/ts_errors_fix_v2.sh
mv fix_typescript_errors_final.sh scripts/ts_errors_fix_final.sh
mv fix_typescript_final.sh scripts/ts_final_fix.sh
mv fix_literature_errors.sh scripts/literature_fix.sh
mv fix_advanced_errors.sh scripts/advanced_errors_fix.sh
mv fix_final_errors.sh scripts/final_errors_fix.sh
mv fix_remaining_errors.sh scripts/remaining_errors_fix.sh
mv fix_*_Issues.sh scripts/remaining_issues_fix.sh 2>/dev/null

# Config scripts
mv fix_next_config.sh scripts/next_config_fix.sh
mv fix_next_version.sh scripts/next_version_fix.sh
mv fix_config_extensions.sh scripts/config_extensions_fix.sh
mv fix_card_components.sh scripts/card_components_fix.sh
mv fix_test_and_env.sh scripts/test_env_fix.sh
mv fix_jest_setup.sh scripts/jest_setup.sh

# Merge scripts
mv merge_assets.sh scripts/merge_assets.sh
mv merge_chat_backend.sh scripts/merge_chat_backend.sh
mv clone_design.sh scripts/clone_design.sh

# Design scripts
mv fix_design_issues.sh scripts/design_fix.sh
mv fix_design_issues_v2.sh scripts/design_fix_v2.sh

# Project scripts
mv fix_project.sh scripts/project_fix.sh
mv fix_project_v2.sh scripts/project_fix_v2.sh
mv fix_final_v2.sh scripts/project_final_v2.sh
mv fix_final_v3.sh scripts/project_final_v3.sh
mv fix_final_v4.sh scripts/project_final_v4.sh
mv clean_and_rebuild.sh scripts/clean_rebuild.sh
mv setup_env.sh scripts/setup_env.sh
mv convert-imports.js scripts/convert_imports.js

# Make all scripts executable
chmod +x scripts/*.sh

echo "✅ Script files organized!"
echo "📋 Creating README for scripts..."

# Create README for scripts directory
cat > scripts/README.md << 'EOL'
# Project Scripts

This directory contains scripts for maintaining and fixing the project.

## Core Setup Scripts

- `clean_rebuild.sh` - Clean the project and rebuild from scratch
- `project_fix.sh` - Fix common project issues (recommended first step)
- `project_final_v4.sh` - Latest comprehensive project fix (use this if other scripts fail)

## Dependency Management

- `deps_install.sh` - Install basic dependencies
- `deps_3d_install_v2.sh` - Install 3D dependencies (latest version)
- `deps_final_install.sh` - Install all dependencies with proper versions
- `security_fix.sh` - Fix critical security vulnerabilities

## TypeScript Fixes

- `ts_fix.sh` - Fix TypeScript issues
- `ts_errors_fix_final.sh` - Fix TypeScript errors (final version)
- `literature_fix.sh` - Fix literature data structure issues
- `remaining_issues_fix.sh` - Fix remaining TypeScript issues

## Configuration Fixes

- `next_config_fix.sh` - Fix Next.js configuration
- `next_version_fix.sh` - Fix Next.js version
- `jest_setup.sh` - Set up Jest testing framework

## Design and Component Fixes

- `design_fix_v2.sh` - Fix design and UI issues (latest version)
- `card_components_fix.sh` - Fix issues with card components

## Merge and Integration

- `merge_assets.sh` - Merge assets from other projects
- `merge_chat_backend.sh` - Merge chat backend from other projects
- `clone_design.sh` - Clone design components from the source project

## Usage

To run a script:

```bash
cd /Users/farzad/vscode/fbconsulting_01
./scripts/script_name.sh
```

For a complete project setup, run these in order:

1. `./scripts/project_final_v4.sh`
2. `./scripts/next_config_fix.sh`
3. `./scripts/jest_setup.sh`
4. `./scripts/design_fix_v2.sh`
5. `./scripts/remaining_issues_fix.sh`
EOL

echo "✅ Scripts README created!"
