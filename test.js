var http = require('http');
var url = require('url');
var qs = require('querystring');
var fs = require('fs');


var ftp = require('ftp');
var c = new ftp();




http.createServer(function(req, res){
	var ourl = qs.parse(url.parse(req.url).query);
	var name = ourl.name;
	var pass = ourl.pass;
	var action = ourl.action;

	var config = {
	  'host':'localhost',
	  'port':21,
	  'user':name,
	  'password':pass
	};

	switch(action)
	{
		case 'list':
			listdir();
			break;
		case 'download':
			download();
			break;
		case 'upload':
			upload();
			break;
	}


	function listdir()
	{
		c.connect(config);
		c.on('ready', function() {
		  c.list(function(err, list) {
		    if (err) throw err;
		    var names= '';
		    for(var i in list)
		    {
		    	if(i==0) continue;
		    	var str = list[i].name;
		    	if(str.substr(0,1) == '.') continue;
		    	names += str + "\n";
		    }
		    res.writeHead(200,{'Content-Type':'text/plain'});
		    res.end(names);
		    c.end();
		  });
		});
	}

	function download()
	{
		c.connect(config);
		c.on('ready', function() {
		  	var local_file = ourl.local_file;
		    var remote_file = ourl.remote_file;
			c.get(remote_file, function(err, stream) {
				if (err) throw err;
				console.log(stream);
				stream.once('close', function() { c.end(); });
				stream.pipe(fs.createWriteStream(local_file));
			});
		});
		res.end();
	}

	function upload()
	{
		c.connect(config);
		c.on('ready', function() {
		  var local_file = ourl.local_file;
		  var remote_file = ourl.remote_file;
		  c.put(local_file, remote_file, function(err) {
		    if (err) throw err;
		    c.end();
		  });
		});
		res.end();
	}
}).listen(3000, function(){
	console.log('listen on 3000');
});