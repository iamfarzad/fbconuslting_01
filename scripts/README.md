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
