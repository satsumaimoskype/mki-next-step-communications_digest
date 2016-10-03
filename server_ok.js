/*
 * Deploying Node.js App to Heroku
 * https://www.youtube.com/watch?v=uLF_hmtxAsY
*/
var http = require('http');
var server = http.createServer(function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end('<h1>Hello Wold</h1>');
});
var port = Number(process.env.PORT || 3000);
server.listen(port);
