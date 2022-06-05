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
const uri = 'mongodb+srv://tuliobretz:459878@transportefacil-cluster.18r1myx.mongodb.net/?retryWrites=true&w=majority';
//const uri = 'mongodb://localhost:27017/transportefacil_db'

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
