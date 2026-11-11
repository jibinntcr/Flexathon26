const fs = require('fs');
const path = require('path');

const b64Tata = fs.readFileSync(path.join(__dirname, '../public/newAssets/tata-copper.png')).toString('base64');
const b64Smaaash = fs.readFileSync(path.join(__dirname, '../public/newAssets/smaaash.png')).toString('base64');
const b64Aksh = fs.readFileSync(path.join(__dirname, '../public/newAssets/akshayakalpa.png')).toString('base64');
const b64Esci = fs.readFileSync(path.join(__dirname, '../public/newAssets/esci-logo.png')).toString('base64');

const fileContent = `export const FALLBACK_LOGOS = {
  tataCopper: "data:image/png;base64,${b64Tata}",
  smaaash: "data:image/png;base64,${b64Smaaash}",
  akshayakalpa: "data:image/png;base64,${b64Aksh}",
  esci: "data:image/png;base64,${b64Esci}",
};
`;

fs.writeFileSync(path.join(__dirname, '../src/app/lib/partnerLogosData.ts'), fileContent);
console.log('Saved src/app/lib/partnerLogosData.ts');
