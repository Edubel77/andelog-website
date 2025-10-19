const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { buildJS } = require('./build-js');

async function build() {
  const startTime = Date.now();
  
  try {
    console.log('🚀 Starting AndeLog build process...\n');

    // 1. Clean dist directory
    console.log('🧹 Cleaning dist directory...');
    execSync('npm run clean', { stdio: 'inherit' });

    // 2. Create directories
    console.log('📁 Creating directories...');
    const dirs = ['dist/css', 'dist/js', 'dist/assets'];
    dirs.forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    });

    // 3. Copy assets (parallel)
    console.log('📋 Copying assets...');
    try {
      execSync('npm run build:copy', { stdio: 'pipe' });
      console.log('  ✅ Assets copied');
    } catch (error) {
      console.log('  ⚠️  No assets to copy');
    }

    // 4. Build CSS
    console.log('🎨 Building CSS...');
    try {
      execSync('npm run build:css', { stdio: 'pipe' });
      console.log('  ✅ CSS built successfully');
    } catch (error) {
      console.log('  ⚠️  CSS build skipped (file not found)');
    }

    // 5. Build JavaScript
    await buildJS();

    // 6. Build HTML
    console.log('📄 Building HTML files...');
    execSync('npm run build:html', { stdio: 'inherit' });

    const endTime = Date.now();
    const duration = ((endTime - startTime) / 1000).toFixed(2);
    
    console.log(`\n🎉 Build completed successfully in ${duration}s!`);
    console.log('📦 Files ready in dist/ directory');
    
  } catch (error) {
    console.error('\n❌ Build failed:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  build();
}

module.exports = { build };