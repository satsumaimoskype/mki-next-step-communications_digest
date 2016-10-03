#!/usr/bin/env node

/*
  eb コンテンツを開発するための Node.js 簡易 Web サーバー
  http://blogs.msdn.com/b/osamum/archive/2015/05/29/web-node-js-web.aspx
*/
/*
  Start:
  nomdemon node_simple_webser.js
  Access to:
  localhost:3031/examples/index.html
*/

var PROGRAM_NAME = "node simple HTTP server"
var PROGRAM_VERSION = "0.1.1"

/*Web コンテンツを開発するための Node.js 簡易 Web サーバー サンプル*/
//Web サーバーが Listen する IP アドレス
// var LISTEN_IP = '127.0.0.1';
// var LISTEN_IP = 'localhost';
// var LISTEN_IP = 'next-step-communications-3.herokuapp.com';
var LISTEN_IP = '0.0.0.0';

//Web サーバーが Listen する ポート
//var LISTEN_PORT = 80;
// var LISTEN_PORT = 3000;
var LISTEN_PORT =  Number(process.env.PORT || 80);
//ファイル名が指定されない場合に返す既定のファイル名
// var DEFAULT_FILE = "index.html";
var DEFAULT_FILE = "index.html";
// var DEFAULT_FILE = "boilerplate-local.html";

var http = require('http'),
  fs = require('fs');

//拡張子を抽出
function getExtension(fileName) {
  var fileNameLength = fileName.length;
  var dotPoint = fileName.indexOf('.', fileNameLength - 5);
  var extn = fileName.substring(dotPoint + 1, fileNameLength);
  return extn;
}

//content-type を指定
function getContentType(fileName) {
  var extentsion = getExtension(fileName).toLowerCase();
  var contentType = {
    'html': 'text/html',
    'htm': 'text/htm',
    'css': 'text/css',
    'js': 'text/javaScript; charset=utf-8',
    'json': 'application/json; charset=utf-8',
    'xml': 'application/xml; charset=utf-8',
    'jpeg': 'image/jpeg',
    'jpg': 'image/jpg',
    'gif': 'image/gif',
    'png': 'image/png',
    'mp3': 'audio/mp3',
  };
  var contentType_value = contentType[extentsion];
  if (contentType_value === undefined) {
    contentType_value = 'text/plain';
  };
  return contentType_value;
}

//Web サーバーのロジック
var server = http.createServer();
server.on('request',
  function(request, response) {
    console.log("\nAccess to " + PROGRAM_NAME + " v" + PROGRAM_VERSION + " port:" + LISTEN_PORT + " ==>");
    console.log("Current directory:", __dirname);
    console.log('Requested Url:' + request.url);
    //console.log('Requested:',request);
    var requestedFile = request.url;
    requestedFile = (requestedFile.substring(requestedFile.length - 1, 1) === '/') ? requestedFile + DEFAULT_FILE : requestedFile;

    // Add  the default Page
    var add_index;
    switch (true) {
      case /^.*\/$/.test(requestedFile):
        add_index = DEFAULT_FILE;
        break;
      default:
        // add_index = "";
        add_index = "";
    }
    requestedFile = requestedFile + add_index;

    console.log('Handle Url (Modified Reuest Url):' + requestedFile);
    console.log('File Extention:' + getExtension(requestedFile));
    console.log('Content-Type:' + getContentType(requestedFile));
    fs.readFile('.' + requestedFile, 'binary', function(err, data) {
      if (err) {
        response.writeHead(404, {
          'Content-Type': 'text/plain'
        });
        response.write('not found\n');
        response.end();
      } else {
        response.writeHead(200, {
          'Content-Type': getContentType(requestedFile)
        });
        response.write(data, "binary");
        response.end();
      }
    });
  }
);

//server.listen(LISTEN_PORT,LISTEN_IP);
server.listen(LISTEN_PORT);
// console.log(PROGRAM_NAME + ' v' + PROGRAM_VERSION + ' is running at http://' + LISTEN_IP + ':' + LISTEN_PORT);
//
