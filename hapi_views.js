var hapi = require('hapi');
var path = require('path');

var serverOptions = {
	views: {
		engines: {
			html: require('handlebars')
		},
		path: path.join(__dirname, 'templates')
	}
};

var server = hapi.createServer('localhost', Number(process.argv[2] || 8080), serverOptions);

server.route({
	path: '/{name}',
	method: 'GET',
	handler: function(req, res){
		var content = req.params.name;
		res.view('index');
	}
});

server.route({
	path: '/',
	method: 'GET',
	handler: function(req, res){
		res("hello");
	}
})




server.start();