const fs = require('fs'); 
const md = fs.readFileSync('C:/Users/asus/.gemini/antigravity/brain/e4a73599-53bb-4f25-8dba-45d5fe662b06/kodingan_web_jualan.md', 'utf8'); 
const html = md.match(/```html\n([\s\S]*?)```/)[1]; 
const js = md.match(/```javascript\n([\s\S]*?)```/)[1]; 
fs.writeFileSync('index.html', html); 
fs.writeFileSync('script.js', js);
