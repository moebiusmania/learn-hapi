'use strict'
const Hapi = require('hapi');
const server = new Hapi.Server();
server.connection({ port: 8080 });

server.register(require('vision'), () => {

  server.views({
    engines: {
      hbs: require('handlebars')
    },
    relativeTo: __dirname,
    layout: true,
    path: './'
  });

  server.route({
    method: 'GET',
    path: '/{name?}',
    handler: function(request, reply) {
      reply.view('home', { name: request.params.name || 'raga' })
    }
  });

  server.start(() => console.log(`Started at: ${server.info.uri}`))
});
