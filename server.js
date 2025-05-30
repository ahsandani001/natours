// Importing
const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! Shuttıng down...');
  console.log(err.name, err.message);
  process.exit(1);
});

// Middlswares
dotenv.config({ path: './config.env' });
const app = require('./app.js');

// DB Config
const DB = process.env.DB_STRING.replace('<password>', process.env.DB_PASS);
//const DB = process.env.DB_LOCAL;

mongoose
  .connect(DB, {
    useCreateIndex: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('DB connected');
  });

/* const conn = mongoose.connection;
conn.once('open', () => {
  console.log('DB connected');
}); */

// Server Listening
const port = process.env.PORT || 8000;
const server = app.listen(port, () =>
  console.log(`App running on port: ${port}`)
);

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLER REJECTION! Shuttıng down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on('SIGTERM', () => {
  console.log('SIGTERM RECEIVED. Shutting down gracefully');
  server.close(() => {
    console.log('Process terminated!');
  });
});
