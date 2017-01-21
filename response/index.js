'use strict'
const Hapi = require('hapi');
const Boom = require('boom');
const server = new Hapi.Server();
server.connection({ port: 8080 });

server.route({
  method: 'GET',
  path: '/obj',
  handler: (request, reply) => {
    // reply()
    // reply(null, 'hello world')
    // reply('hello world')
    reply({ hello: 'world' });
    // reply(Promise.resolve('hello world'))
    // reply(require('fs').createReadStream(__filename))
    // reply(new Error('oops'))
    // reply(Boom.notFound())
  }
});

server.route({
  method: 'GET',
  path: '/str',
  handler: (request, reply) => {
    reply('hello world');
  }
});

server.route({
  method: 'GET',
  path: '/error',
  handler: (request, reply) => {
    reply(new Error('not the page you are looking for'));
  }
});

server.route({
  method: 'GET',
  path: '/boom',
  handler: (request, reply) => {
    reply(Boom.notFound());
  }
});

server.start(() => {})
