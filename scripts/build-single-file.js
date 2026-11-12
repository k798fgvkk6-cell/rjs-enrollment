import fs from 'fs';
import path from 'path';

const distDir = path.resolve('dist');
const indexPath = path.join(distDir, 'index.html');

if (!fs.existsSync(indexPath)) {
  console.error('dist/index.html not found! Run npm run build first.');
  process.exit(1);
}

let html = fs.readFileSync(indexPath, 'utf-8');

// Find CSS file in dist/assets
const assetsDir = path.join(distDir, 'assets');
const files = fs.readdirSync(assetsDir);

const cssFile = files.find(f => f.endsWith('.css'));
const jsFile = files.find(f => f.endsWith('.js'));

if (cssFile) {
  const cssContent = fs.readFileSync(path.join(assetsDir, cssFile), 'utf-8');
  html = html.replace(
    new RegExp(`<link rel="stylesheet"[^>]*href="[^"]*${cssFile}"[^>]*>`, 'g'),
    () => `<style>\n${cssContent}\n</style>`
  );
}

if (jsFile) {
  const jsContent = fs.readFileSync(path.join(assetsDir, jsFile), 'utf-8');
  html = html.replace(
    new RegExp(`<script type="module"[^>]*src="[^"]*${jsFile}"[^>]*></script>`, 'g'),
    () => `<script type="module">\n${jsContent}\n</script>`
  );
}

const standalonePath = path.join(distDir, 'standalone.html');
fs.writeFileSync(standalonePath, html, 'utf-8');
fs.writeFileSync(indexPath, html, 'utf-8');
console.log(`Single-file bundle created successfully at: ${standalonePath} and ${indexPath}`);
