import express from "express";
import http from "http";
import { Server } from "socket.io";
import bodyParser from 'body-parser'

const app = express();

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('public'))

const server = http.createServer(app);

const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
     //console.log(msg)
     //socket.broadcast.emit(msg);
     io.emit('chat message', msg);
    });
  });

server.listen(3000, () => {
  console.log('listening on *:3000');
});