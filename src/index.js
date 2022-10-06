//nodemon forces the Node.js based apps restart when changes are detected

import express from 'express';
//sucrease allows the transformation from the code below to the code upwards
//const express = require('express');

import http from 'http';
import socketio from 'socket.io';

const app = express();
const server = http.Server(app);

//get directory /public to get html pages
app.use(express.static(__dirname + '/public'));

//connection on the server side
const io = socketio(server);
io.on('connect',(socket) => {

    io.to(socket.id).emit({
        status: true,
        message: "connection stablished with the server"
    });

    socket.on('test', (res) => {
        console.log('message received',res);

        socket.broadcast.emit('test',res);
    });
})

//routes
app.get('/',(req, res) => {
    res.render('index.html');
});

app.get('/test',(req,res) => {
    res.json({status: true});
});

//server
server.listen(3333, () => {
    console.log('Servidor iniciado na porta', 3333);
})
