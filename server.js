var https = require('http');
var app = require('./app');
var port = '3000';
 
var server = https.createServer(app);
 
server.listen(port, function() {
  console.log('Server listening on port ' + port);
});