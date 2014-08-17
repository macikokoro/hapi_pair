var Hapi = require('hapi');
var Joi = require('joi');



var helloConfig = {
  handler:function(request, reply) {
    var names = request.params.name.split("/");
    server.methods.getColour(request.params.name, function(err, colour) {
        reply.view('hello', {
            first: names[0],
            last: names[1],
            mood: request.query.mood,
            age: request.query.age,
            colour: colour
      });
    });
  },
  validate: {
    params: {
      name: Joi.string().min(8).max(20)
    },
    query: {
      mood:
      Joi.string().valid(['neutral', 'happy', 'sad']).default('neutral'),
      age: Joi.number().integer().min(13).max(100)
    }
  }
};
//Hapi server object
var server = new Hapi.Server(8888, "localhost", {
  views: {
    engines: {
        jade: require("jade")
    },
    path: "./views"
}
});

//route
server.route({
  path: '/hello/{name*2}',
  method: 'GET',
  config: helloConfig
});

server.route({
    path: "/static/{path*}",
    method: "GET",
    handler: {
        directory: {
            path: "./public",
            listing: false,
            index: false
        }
    }
});

server.method("getColour", function(name, next) {
    var colours = ["red", "blue", "indigo", "violet", "green"];
    var colour = colours[Math.floor(Math.random() * colours.length)];
    next(null, colour);
}, {
    cache: {
        expiresIn: 30000,
    }
});


//start method
server.start(function() {
  console.log('Hapi server started at:', server.info.uri);
});
