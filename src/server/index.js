require('dotenv').config();
var path = require('path');
var express = require('express');
const compression = require('compression');

var app = express();
// app.use('/', express.static(path.join(__dirname, 'dist')));
// app.use(compression());
app.use('/*', express.static(path.join(__dirname, 'dist')));
// app.get('/*', function (req, res) {
//   res.sendFile(path.join(__dirname, 'dist/index.html'), function (err) {
//     if (err) {
//       res.status(500).send(err);
//     }
//   });
// });

app.set('port', process.env.PORT || 8080);

var server = app.listen(app.get('port'), function () {
  console.log('listening on port ', server.address().port);
});
