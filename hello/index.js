'use strict';

const Hapi = require('hapi');
const Good = require('good');
const inert = require('inert');

// Create a server with a host and port
const server = new Hapi.Server();

server.connection({
    host: 'localhost',
    port: 8080
});

const goodSetup = {
  register: Good,
  options: {
    reporters: {
      console: [{
        module: 'good-squeeze',
        name: 'Squeeze',
        args: [{
          response: '*',
          log: '*'
        }]
      }, {
          module: 'good-console'
      }, 'stdout']
    }
  }
}


// Using inert plugin for static file serving
server.register([inert, goodSetup], (err) => {
  if (err) {
      throw err;
  }

  // Add the route
  server.route({
      method: 'GET',
      path:'/hello',
      handler: (request, reply) => {
        return reply('hello world');
      }
  });

  // Route with parameter
  server.route({
      method: 'GET',
      path: '/name/{name}',
      handler: (request, reply) => {
        server.log('info', request.params);
        reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
      }
  });

  server.route({
      method: 'GET',
      path: '/static',
      handler: (request, reply) => {
          reply.file('./hello/index.html');
      }
  });

  server.route({
      method: 'GET',
      path: '/dir/{name*}',
      handler: {
        directory: {
            path: './hello',
            listing: true
        }
      }
  });

  // Start the server
  server.start((err) => {
      if (err) {
          throw err;
      }
      server.log('info', `Server running at ${server.info.uri}`);
  });
});
