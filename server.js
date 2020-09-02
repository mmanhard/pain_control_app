const path = require('path');

const express = require('express');
const app = express();

const publicPath = path.join(__dirname, "public");
const port = process.env.PORT || 3000;

// If app not in development, redirect not 'https' requests to https.
// If in development, allow non-'https' requests.
function requireHTTPS(req, res, next) {
  if (!req.secure && req.get('x-forwarded-proto') !== 'https' && process.env.NODE_ENV !== "development") {
    return res.redirect('https://' + req.get('host') + req.url);
  }
  next();
}

app.use(requireHTTPS);
app.use(express.static(publicPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'))
});

app.listen(port, () => {
  console.log(`Express server is up and running on port ${port}!`);
});