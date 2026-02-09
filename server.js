const express = require('express');
const fs = require('fs');
const path = require('path');
const UAParser = require('ua-parser-js');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  const ip =
    req.headers['x-forwarded-for']?.split(',')[0] ||
    req.socket.remoteAddress;

  const uaString = req.headers['user-agent'] || '';
  const parser = new UAParser(uaString);

  const deviceType = parser.getDevice().type || 'desktop';
  const browser = parser.getBrowser().name || 'UnknownBrowser';
  const os = parser.getOS().name || 'UnknownOS';

  const logLine =
    `${new Date().toISOString()} | ` +
    `IP: ${ip} | ` +
    `Device: ${deviceType} | ` +
    `Browser: ${browser} | ` +
    `OS: ${os}\n`;

  fs.appendFile('ip_logs.txt', logLine, (err) => {
    if (err) console.error('Failed to write log:', err);
  });

  console.log('[VISIT]', logLine.trim());

  res.send(`
    <h1>Welcum!</h1>
    <p>for learning purposes. (probably).</p>
    <p>Yummy IP.</p>
  `);
});

// Admin route
app.get('/admin/logs', (req, res) => {
  const key = req.query.key;
  const SECRET_KEY = 'YummyCum';

  if (key !== SECRET_KEY) {
    return res.status(403).send('Forbidden');
  }

  const filePath = path.join(__dirname, 'ip_logs.txt');
  if (!fs.existsSync(filePath)) return res.status(404).send('No logs yet.');

  res.sendFile(filePath);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// YEY, ME HAVE MORE IP TO EAT NOW >:)


//Dairy of the Unfortunated.
//2026-02-09 My Web service failed :(
