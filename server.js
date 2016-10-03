var express = require('express');
var passport = require('passport');
var Strategy = require('passport-http').DigestStrategy;
var db = require('./db');

// Configure the Digest strategy for use by Passport.
//
// The Digest strategy requires a `secret`function, which is used to look up
// user.  The function must invoke `cb` with the user object as well as the
// user's password as known by the server.  The password is used to compute a
// hash, and authentication will fail if the computed value does not match that
// of the request.  The user object will be set at `req.user` in route handlers
// after authentication.

/*
passport.use(new Strategy({ qop: 'auth' },
  function(username, callback) {
    db.users.findByUsername(username, function(err, user) {
      if (err) { return callback(err); }
      if (!user) { return callback(null, false); }
      return callback(null, user, user.password);
    })
  }));
*/

// Create a new Express application.
var app = express();

// Configure Express application.
//app.configure(function() {
//  app.use(express.logger());
//});
// http://stackoverflow.com/questions/25083239/openshift-socket-io-express-deprecated-app-configure-check-app-getenv

//<<
// Convert Express 3 to Express 4
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cookieSession = require('cookie-session');
var path = require('path');
var fs = require('fs');
// var marked = require('marked');

//<<
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieSession({secret: 'app_1'}));
//>>


app.use(express.static(path.join(__dirname, 'views')));
// app.use(express.static(path.join(__dirname, 'images')));
app.use(express.static(path.join(__dirname, '.')));

//app.use('/out/remark.js', express.static(__dirname + '/out/remark.js'));
app.use('/images', express.static(__dirname + '/images'));
// app.use(express.static(path.join(__dirname, 'views')));

//app.use(express.static(__dirname + '/out/remark.js'));
// app.use(express.static(__dirname + '/.'));
// app.use(express.static(__dirname + '/images'));

// app.use(express.static('public'));
// app.use(express.static('images'));
//app.use(express.static('out/remark.js'));


///////////////////////////////////
/*
app.get('/',
  passport.authenticate('digest', { session: false }),
  function(req, res) {
    res.redirect(302, "/login")
});
*/
////////////////////////////////////

//<<
app.get('/', function(req, res) {
// app.get('/', function(req, res) {
  res.sendfile(__dirname + '/index.html');
});

app.get('/next_step_communications_3', function(req, res) {
  res.sendfile(__dirname + '/views/next_step_communications_3.html');
});

app.get('/next_step_communications_4', function(req, res) {
  res.sendfile(__dirname + '/views/next_step_communications_4.html');
});
//>>
//
/*
<<
app.get('/login', function(req, res) {
  var path = __dirname + '/next_step_communications_3.md';
  var file = fs.readFileSync(path, 'utf8');
  res.send(marked(file.toString()));
});
>>
*/
/*
app.get ('/docs', function (req, res) {

   // Allow the docs.html template to 'include' markdown files
   var marked = require ('marked');

   var md = function (filename) {
      var path = __dirname + filename;
      var include = fs.readFileSync (path, 'utf8');
      var html = marked (include);

      return html;
   };

   res.render ('docs', {"md": md});
});
*/

/*
app.get('/hello',
  passport.authenticate('digest', { session: false }),
  function(req, res) {
    res.json({ message: 'Hello, ' + req.query.name, from: req.user.username });
  });

// curl -v -d "name=World" --user jack:secret --digest http://127.0.0.1:3000/hello
app.post('/hello',
  passport.authenticate('digest', { session: false }),
  // express.bodyParser(),
  function(req, res) {
    res.json({ message: 'Hello, ' + req.body.name, from: req.user.username });
  });
*/

var LISTEN_IP = '0.0.0.0';

//Web サーバーが Listen する ポート
//var LISTEN_PORT = 80;
// var LISTEN_PORT = 3000;
var LISTEN_PORT =  Number(process.env.PORT || 80);
//app.listen(80);
app.listen(LISTEN_PORT);

console.log("Heroku Internal Listen Port:   ", LISTEN_PORT);
console.log("Internet External Listen Port: 443");
