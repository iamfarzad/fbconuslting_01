// convert-imports.js
const fs = require("fs");
const path = require("path");

const BASE_DIR = path.resolve(__dirname, "src");
const ALIAS = "@/";

function walk(dir, list = []) {
  for (const file of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) walk(fullPath, list);
    else if (/\.(ts|tsx)$/.test(file)) list.push(fullPath);
  }
  return list;
}

function toAliasPath(rel, currentFile) {
  const absPath = path.resolve(path.dirname(currentFile), rel);
  const relToSrc = path.relative(BASE_DIR, absPath);
  return relToSrc.startsWith("..") ? null : ALIAS + relToSrc.replace(/\\/g, "/");
}

function processFile(file) {
  const content = fs.readFileSync(file, "utf-8");
  let updated = false;

  const result = content.replace(/from ['"](\.{1,2}\/[^'"]+)['"]/g, (full, relImport) => {
    const alias = toAliasPath(relImport, file);
    if (alias) {
      updated = true;
      return `from '${alias}'`;
    }
    return full;
  });

  if (updated) {
    fs.writeFileSync(file, result, "utf-8");
    console.log("🔁 Updated:", path.relative(BASE_DIR, file));
  }
}

console.log("📁 Converting relative imports in /src to alias @/...");
walk(BASE_DIR).forEach(processFile);
console.log("✅ Done.");