var hapi = require('hapi');
var path = require('path');

var serverOptions = {
	views: {
		engines: {
			html: require('handlebars')
		},
		path: path.join(__dirname, '/templates')
	}
};

var server = hapi.createServer('localhost', Number(process.argv[2] || 8080), serverOptions);

server.route({
	path: '/',
	method: 'GET',
	handler: {
		view: {
			template: 'index.html',
			context: {
				title: "Home",
				header: "Home Page",
				content: "This is the content of the home page",
				list: "test1, test2"
			}
		}
	}
});

server.route({
	path:'/Adam',
	method: 'GET',
	handler: {
		view: {
			template: 'index.html',
			context: {
				title: "Adam",
				header: "Adam header test",
				content: "Adam content test",
				list: "Adam list test"
			}
		}
	}
});

server.start(function(){
	console.log("server started on port 8080");
});