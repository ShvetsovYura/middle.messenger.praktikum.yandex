const express = require('express');
const path = require('path');

const app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static('dist'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(app.get('port'), () => {
  console.log('App is running, server is listening on port ', app.get('port'));
});
