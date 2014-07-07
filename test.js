var http = require('http');
var url = require('url');
var qs = require('querystring');


var ftp = require('ftp');
var c = new ftp();

http.createServer(function(req, res){
	var ourl = qs.parse(url.parse(req.url).query);
	var name = ourl.name;
	var pass = ourl.pass;
	var action = ourl.action;

	switch(action)
	{
		case ''
	}

}).listen(3000, function(){
	console.log('listen on 3000');
});