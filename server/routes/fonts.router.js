const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

const fs = require('fs');
const path = require('path');

const fontsDir = path.join(__dirname, '../../public/fonts');
const webFontsDir = path.join(__dirname, '../../public/fonts/webFonts');

function generateFontFaceRule(fontPath, fontFamily, fontStyle = 'normal', fontWeight = 'normal') {
  return `
    @font-face {
      font-family: '${fontFamily}';
      src: url('${fontPath}') format('opentype');
      font-weight: ${fontWeight};
      font-style: ${fontStyle};
    }
  `;
}

function listFontsAndGenerateCSS(dir) {
  let cssContent = '';
  const fontFiles = fs.readdirSync(dir);

  fontFiles.forEach(file => {
    const fullPath = path.join(dir, file);
    const fontNameMatch = file.match(/^(.+?)(?:-(\w+))?(?:-(\w+))?\.otf$/i);
    if (fontNameMatch) {
      const [, fontFamily, fontWeight, fontStyle] = fontNameMatch;
      const webPath = fullPath.replace(__dirname, ''); // Convert to web path
      cssContent += generateFontFaceRule(webPath, fontFamily, fontStyle, fontWeight);
    }
  });

  return cssContent;
}

function generateFontsCSS() {
  let cssContent = listFontsAndGenerateCSS(fontsDir);
  cssContent += listFontsAndGenerateCSS(webFontsDir);

  // Write the CSS content to a file or use it directly in your project
  fs.writeFileSync(path.join(__dirname, '../../public/fonts/fonts.css'), cssContent);
}

generateFontsCSS();
