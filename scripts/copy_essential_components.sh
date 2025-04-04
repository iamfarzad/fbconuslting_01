#!/bin/bash

SOURCE_DIR="/Users/farzad/windsurf_projects/fbconsulting"
TARGET_DIR="/Users/farzad/vscode/fbconsulting_01"

# Create necessary directories
mkdir -p "${TARGET_DIR}/src/components/hero"
mkdir -p "${TARGET_DIR}/src/components/layout"
mkdir -p "${TARGET_DIR}/src/components/testimonials"
mkdir -p "${TARGET_DIR}/src/components/ui"
mkdir -p "${TARGET_DIR}/src/components/sections"

# Copy hero components
echo "Copying hero components..."
cp -r "${SOURCE_DIR}/src/components/hero/"* "${TARGET_DIR}/src/components/hero/"

# Copy layout components
echo "Copying layout components..."
cp -r "${SOURCE_DIR}/src/components/layout/"* "${TARGET_DIR}/src/components/layout/"

# Copy testimonial components
echo "Copying testimonials components..."
cp -r "${SOURCE_DIR}/src/components/testimonials/"* "${TARGET_DIR}/src/components/testimonials/"

# Copy UI components
echo "Copying UI components..."
cp -r "${SOURCE_DIR}/src/components/ui/"* "${TARGET_DIR}/src/components/ui/"

# Copy section components
echo "Copying section components..."
cp -r "${SOURCE_DIR}/src/components/sections/"* "${TARGET_DIR}/src/components/sections/"

# Copy styles
echo "Copying styles..."
mkdir -p "${TARGET_DIR}/src/styles"
cp -r "${SOURCE_DIR}/src/styles/"* "${TARGET_DIR}/src/styles/"

echo "Essential components copied successfully!"
