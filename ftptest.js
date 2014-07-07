var fs = require('fs');
var http = require('http');
var Client = require('ftp');
var c = new Client();

//ready close(< boolean >hadErr) end error(< Error >err)

/*

//list files
c.on('ready', function() {
  c.list(function(err, list) {
    if (err) throw err;
    console.log(list);
    c.end();
  });
});
*/

/*
//download
c.on('ready', function() {
  c.get('develop/info.txt', function(err, stream) {
    if (err) throw err;
    stream.once('close', function() { c.end(); });
    stream.pipe(fs.createWriteStream('foo.local-copy.txt'));
  });
});
*/

/*
//upload
c.on('ready', function() {
  c.put('foo.txt', 'foo.remote-copy.txt', function(err) {
    if (err) throw err;
    c.end();
  });
});
*/


// connect to localhost:21 as anonymous
var config = {
  'host':'localhost',
  'port':21,
  'user':'alusa',
  'password':'chenhong13'
}
//(constructor)() connect(< object >config) 
c.connect(config);



