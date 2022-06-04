let express = require('express'),
  path = require('path'),
  mongoose = require('mongoose'),
  cors = require('cors'),
  bodyParser = require('body-parser'),
  dataBaseConfig = require('./database/db');

// Import the ws module as a variable called WebSocketServer.
var WebSocketServer = require('ws').Server;

//http = require('http');

const createError = require('http-errors');
// const uri = 'mongodb+srv://tuliobretz:459878@transportefacil-cluster.18r1myx.mongodb.net/?retryWrites=true&w=majority';
const uri = 'mongodb://localhost:27017/transportefacil_db'

// Connecting mongoDB
mongoose.Promise = global.Promise;
// mongoose.connect(dataBaseConfig.db, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useFindAndModify: true
// }).then(() => {
//       console.log('Database connected sucessfully ')
//     },
//     error => {
//       console.log('Could not connected to database : ' + error)
//     }
// )

mongoose
  .connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
  .then(() => console.log('Database Connected'))
  .catch(err => console.log(err));

const songRoute = require('./routes/routes');
const usuariosRoute = require('./routes/usuarios.routes');
const motoristasRoute = require('./routes/motoristas.routes');
const chatRoute = require('./routes/chat.routes');
const gastosRoute = require('./routes/gastos.routes');

const app = express();

app.use(bodyParser.json({
  limit: '50mb'
}));

app.use(bodyParser.urlencoded({
  limit: '50mb',
  parameterLimit: 100000,
  extended: true
}));

app.use(cors());

// RESTful API root
app.use('/api', songRoute);
app.use('/api/motoristas', motoristasRoute);
app.use('/api/usuarios', usuariosRoute);
app.use('/api/chat', chatRoute);
app.use('/api/gastos', gastosRoute);

// PORT
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('PORT Connected on: ' + port)
})

// // Create a new WebSocketServer running on port 7007.
// var wss = new WebSocketServer({port: 7007});

// Find 404 and hand over to error handler
app.use((req, res, next) => {
  next(createError('Falha interna. Por favor, tente novamente.'));
});

// error handler
app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.error);
});


// // Create a "broadcast" function on our WebSocketServer object.
// // The function will take a "msg" paramter. When called, it will
// // loop through all the connected clients and send them the msg.
// wss.broadcast = function broadcastMsg(msg) {
//     wss.clients.forEach(function each(client) {
//         client.send(msg);
//     });
// };


// // Create a listener function for the "connection" event.
// // Each time we get a connection, the following function
// // is called.
// wss.on('connection', function connection(ws) {

//   // Store the remote systems IP address as "remoteIp".
//   var remoteIp = ws.upgradeReq.connection.remoteAddress;

//   // Print a log with the IP of the client that connected.
//   console.log('Connection received: ', remoteIp);

//   // Add a listener which listens for the "message" event.
//   // When a "message" event is received, take the contents
//   // of the message and pass it to the broadcast() function.
//   ws.on('message', wss.broadcast);
// });
