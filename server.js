const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(`${__dirname}/public`));

app.get('/callback', ((req, res) => {
  res.redirect('/');
}));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

app.listen(1337, () => {
  console.log('Listening on port: 1337');
});
