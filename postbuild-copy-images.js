const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, 'src', 'assets', 'images');
const outputDir = path.join(__dirname, 'dist', 'assets', 'images');

function ensureDirectoryExistence(fileDir) {
  if (!fs.existsSync(fileDir)) {
    fs.mkdirSync(fileDir, { recursive: true });
  }
}

function copyFile(source, destination) {
  ensureDirectoryExistence(path.dirname(destination));
  fs.copyFileSync(source, destination);
}

async function copyImages() {
  try {
    if (!fs.existsSync(sourceDir)) {
      console.log('Source directory does not exist:', sourceDir);
      return;
    }
    
    const files = fs.readdirSync(sourceDir);
    console.log('Copying', files.length, 'image files...');
    
    files.forEach(file => {
      const sourceFile = path.join(sourceDir, file);
      const destFile = path.join(outputDir, file);
      copyFile(sourceFile, destFile);
      console.log('✓', file);
    });
    
    console.log('Image copy completed successfully');
  } catch (error) {
    console.error('Error copying images:', error.message);
    process.exit(1);
  }
}

copyImages();
