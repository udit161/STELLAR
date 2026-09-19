const fs = require('fs');
const filePath = 'c:/SIH/SatQueryAI/client/src/components/ScatterAndReassembleText.jsx';
let content = fs.readFileSync(filePath, 'utf8');
// Fix the truncated Kannada text
content = content.replace(
  /\{ text: "ವೇ", lang: "Kannada"/,
  '{ text: "ಸ್ಯಾಟ್\u200Cಕ್ವೆರಿ \u0C8F\u0C90", lang: "Kannada"'
);
fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixed! Verifying...');
const verify = fs.readFileSync(filePath, 'utf8');
const idx = verify.indexOf('Kannada');
console.log(verify.substring(idx - 20, idx + 40));
