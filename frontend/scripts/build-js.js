const esbuild = require('esbuild');
const path = require('path');

async function buildJS() {
  try {
    console.log('📦 Building JavaScript files...');
    
    // Build individual JS files
    const jsFiles = [
      'api.js',
      'auth.js', 
      'dashboard.js',
      'home.js',
      'products.js',
      'services.js'
    ];

    for (const file of jsFiles) {
      const srcPath = path.join('src', 'js', file);
      const outPath = path.join('dist', 'js', file);
      
      try {
        await esbuild.build({
          entryPoints: [srcPath],
          bundle: false,
          minify: true,
          outfile: outPath,
          target: 'es2020',
          format: 'iife'
        });
        console.log(`  ✅ ${file} -> dist/js/${file}`);
      } catch (err) {
        if (err.message.includes('ENOENT')) {
          console.log(`  ⚠️  ${file} not found, skipping...`);
        } else {
          throw err;
        }
      }
    }

    console.log('🎉 JavaScript build completed!');
  } catch (error) {
    console.error('❌ JavaScript build failed:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  buildJS();
}

module.exports = { buildJS };