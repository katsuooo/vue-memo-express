import express from 'express';
// import socketIO from "socket.io";
import socketManager from './socketManager'

export default (app, http) => {
  // app.use(express.json());
  //
  // app.get('/foo', (req, res) => {
  //   res.json({msg: 'foo'});
  // });
  //
  // app.post('/bar', (req, res) => {
  //   res.json(req.body);
  // });
  // 
  // optional support for socket.io
  // 
  // let io = socketIO(http);
  // io.on("connection", client => {
  //   client.on("message", function(data) {
  //     // do something
  //   });
  //   client.emit("message", "Welcome");
  // });
  socketManager(http)
  /*
  app.get('/', function(req, res){
    res.send('<h1>mongodb interface by socketio</h1>')
  });
  */
}
