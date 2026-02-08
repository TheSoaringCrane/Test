const express = require('express');
const fs = require('fs');
const app = express();

app.get('/', (req, res) => {
  const ip =
    req.headers['x-forwarded-for']?.split(',')[0] ||
    req.socket.remoteAddress;

  const logLine = `${new Date().toISOString()} - ${ip}\n`;

  fs.appendFile('ip_logs.txt', logLine, (err) => {
    if (err) console.error('Failed to log IP:', err);
  });

  res.send(`
    <h1>Welcome 👋</h1>
    <p>Thanks for the IP</p>
    <p>You can close now, Cuz I already logged it <3</b></p>
  `);
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
