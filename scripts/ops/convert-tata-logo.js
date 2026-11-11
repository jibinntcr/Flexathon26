const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const lines = fs.readFileSync(path.join(__dirname, '../newlogos/extracted_pdf_code.txt'), 'utf8').split('\n');

let paths = [];
let matrix = [1, 0, 0, 1, 0, 0];
let currentPath = '';

for (let i = 210; i < lines.length; i++) {
  const line = lines[i].trim();
  if (line.endsWith(' cm')) {
    const p = line.split(/\s+/);
    matrix = p.slice(p.length - 7, p.length - 1).map(Number);
  } else if (line.endsWith(' m')) {
    const p = line.split(/\s+/);
    currentPath += `M ${p[0]} ${p[1]} `;
  } else if (line.endsWith(' l')) {
    const p = line.split(/\s+/);
    currentPath += `L ${p[0]} ${p[1]} `;
  } else if (line.endsWith(' c')) {
    const p = line.split(/\s+/);
    currentPath += `C ${p[0]} ${p[1]}, ${p[2]} ${p[3]}, ${p[4]} ${p[5]} `;
  } else if (line === 'h') {
    currentPath += 'Z ';
  } else if (line === 'f' || line === 'f*') {
    if (currentPath) {
      const fillRule = line === 'f*' ? 'evenodd' : 'nonzero';
      paths.push(`<path transform="matrix(${matrix.join(' ')})" d="${currentPath.trim()}" fill="#FFFFFF" fill-rule="${fillRule}" />`);
      currentPath = '';
    }
  } else if (line === 'Q') {
    matrix = [1, 0, 0, 1, 0, 0];
  }
}

// 1. Full badge
const fullSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 216" width="720" height="216">
  <rect width="720" height="216" fill="#7A141A" rx="14" />
  <g transform="scale(1, -1) translate(0, -216)">
    ${paths.join('\n    ')}
  </g>
</svg>`;

// 2. Proportionally cropped badge (bounds: x from 149.78 to 570.22, y from 28.56 to 187.44)
// Let's add 18px padding around it: x: 132, y: 11, width: 456, height: 194
const croppedSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="132 11 456 194" width="456" height="194">
  <rect x="132" y="11" width="456" height="194" fill="#7A141A" rx="14" />
  <g transform="scale(1, -1) translate(0, -216)">
    ${paths.join('\n    ')}
  </g>
</svg>`;

fs.writeFileSync(path.join(__dirname, '../public/newAssets/tata-copper.svg'), croppedSvg);

sharp(Buffer.from(croppedSvg))
  .png()
  .toFile(path.join(__dirname, '../public/newAssets/tata-copper.png'))
  .then(info => console.log('Generated tata-copper.png (cropped):', info))
  .catch(err => console.error(err));
