import http from 'http';
import url from 'url';
import fetch from 'node-fetch';

const server = http.createServer((req, res) => {
  // Get the URL parameters
  const urlParams = new URLSearchParams(url.parse(req.url, true).query);
  const content = urlParams.get('content');
  const webhook = urlParams.get('webhook');

  // Check if content and webhook are present
  if (!content || !webhook) {
    const msg = "No webhook or content params. How to use (example): (endpoint)?content=Hello!&webhook=https://discord.com/api/webhooks/1234567890/abcdefghijklmnopqrstuvwxyz";
    res.writeHead(400, { 'Content-Type': 'text/plain' });
    res.end(msg);
    return;
  }

  // Create the request payload
  const payload = {
    content: content
  };

  // Send the message to the Discord webhook
  fetch(webhook, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
  .then(response => {
    if (response.ok) {
      const msg = "Sent";
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(msg);
    } else {
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.end("Failed");
    }
  })
  .catch(error => {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Error: ' + error);
  });
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});