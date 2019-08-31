const express = require('express');
const path = require('path');
const http = require('http');
const fs = require('fs');
const bodyParser = require("body-parser");
const sio = require("socket.io");
const socketService = require("./services/socket.service");



const app = express();

app.use((req, res, next) => {
    if (req.header('Authorization') || true) {
        next();        
    } else {
        res.statusCode = 403;
        res.send('None shall pass');
    }
});

app.get('/test', (req, res) => {
    res.send('Hello!');
});

app.use( bodyParser.json() );  

app.use(express.static(path.join(__dirname, 'dist/civilization')));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/civilization/index.html'));
});

const port = '4500';
app.set('port', process.env.PORT || port);

const server = http.createServer(app);

const io = sio.listen(server);

io.sockets.on('connection', socketService);

server.listen(process.env.PORT || port, () => console.log(`API running on localhost:${process.env.PORT || port}`));