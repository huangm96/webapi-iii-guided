const express = require('express'); // importing a CommonJS module
const helmet = require('helmet')
const hubsRouter = require('./hubs/hubs-router.js');
const gate = require('./auth/gate-middleware')
const server = express();

// middleware
function logger(req, res, next) {
  console.log(`${req.method} to ${req.path}`);

  next();
}



// setup global middleware
server.use(logger);
server.use(helmet());
server.use(express.json());



server.get('/free', (req, res) => {
  res.status(200),json({welcome:'web 22 Developser'})
})

server.get('/paid', gate, (req, res) => {
  res.status(200).json({welcome: 'to the mines of Moria'})
})

server.use('/api/hubs', gate, hubsRouter);

server.get('/', (req, res) => {
  const nameInsert = (req.name) ? ` ${req.name}` : '';

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});

server.use(errorhandler)

function errorhandler(error, req, res, next) {
  console.log(error)
  res.status(error).json({ you: "shall not pass!" })
}

module.exports = server;
