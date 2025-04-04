const fs = require('fs');
const path = require('path');

function findFilesWithRouterImports(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && !filePath.includes('node_modules') && !filePath.includes('.next')) {
      findFilesWithRouterImports(filePath, fileList);
    } else if (/\.(jsx|js|tsx|ts)$/.test(file)) {
      const content = fs.readFileSync(filePath, 'utf8');
      if (content.includes('react-router-dom')) {
        fileList.push(filePath);
      }
    }
  });
  
  return fileList;
}

const srcDir = path.join(__dirname, '..', 'src');
const routerFiles = findFilesWithRouterImports(srcDir);

console.log('Files with react-router-dom imports:');
routerFiles.forEach(file => {
  console.log(file);
});

console.log('\nTotal files:', routerFiles.length);
```
