import express from "express";
import http from "http";
import { Server } from "socket.io";
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';
const roomId = uuidv4();
console.log(roomId)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('public'))

const server = http.createServer(app);

const io = new Server(server);

app.get('/', (req, res) => {
  console.log(__dirname)
  res.send("helllo world")
});

app.get('/:roomId' , (req,res)=>{
  res.sendFile(__dirname + '/public/index.html');
  io.on('connection', (socket) => {
    socket.on('cursor tracking', (msg) => {
    //console.log(msg)
    socket.broadcast.emit('cursor tracking' , msg); //broadcast msg to all conected user expect sender
    //  io.emit('cursor tracking', msg); //broadcast msg to all users including sender
    });
  });
})

server.listen(3000, () => {
  console.log('listening on *:3000');
});