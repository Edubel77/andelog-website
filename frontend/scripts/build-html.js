const fs = require('fs');
const path = require('path');
const { minify } = require('html-minifier-terser');

const srcDir = path.join(__dirname, '..', 'src');
const distDir = path.join(__dirname, '..', 'dist');

const minifyOptions = {
  collapseWhitespace: true,
  removeComments: true,
  minifyCSS: true,
  minifyJS: true,
  removeAttributeQuotes: true,
  removeRedundantAttributes: true,
  useShortDoctype: true,
  removeEmptyAttributes: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true
};

async function buildHTML() {
  try {
    // Buscar todos los archivos HTML en src
    const htmlFiles = fs.readdirSync(srcDir)
      .filter(file => file.endsWith('.html'));

    console.log(`📦 Building ${htmlFiles.length} HTML files...`);

    for (const htmlFile of htmlFiles) {
      const srcPath = path.join(srcDir, htmlFile);
      const distPath = path.join(distDir, htmlFile);
      
      console.log(`  ⚡ Processing ${htmlFile}...`);
      
      const htmlContent = fs.readFileSync(srcPath, 'utf8');
      const minifiedHTML = await minify(htmlContent, minifyOptions);
      
      fs.writeFileSync(distPath, minifiedHTML);
      console.log(`  ✅ ${htmlFile} -> dist/${htmlFile}`);
    }

    console.log('🎉 HTML build completed successfully!');
  } catch (error) {
    console.error('❌ HTML build failed:', error.message);
    process.exit(1);
  }
}

buildHTML();