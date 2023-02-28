const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');
const { userJoin, getCurrentUser, userLeave, getRoomUsers } = require('./utils/users');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Set static folder
app.use(express.static(path.join(__dirname, 'Public')));

const botName = 'Sus Bot';

// Run when client connects
io.on('connection', socket => {
    socket.on('joinRoom', ({ username, room }) => {
        const user = userJoin(socket.id, username, room);

        socket.join(user.room);

        // Welcome current user
        //socket.emit('message', formatMessage(botName, 'Welcome to Red Discord!'));

        // Broadcast when a user connnects
        //socket.broadcast.to(user.room).emit('message', formatMessage(botName, ` ${user.username} has joined the chat`));

        // Send users and room info
        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
        });
    });

    // Listen for chatmessage
    socket.on('chatMessage', (msg) => {
        const user = getCurrentUser(socket.id)
        if (getRoomUsers(user.room).length == 2)
        {
            console.log("hehe")
            io.to(user.room).emit('message', formatMessage(user.username, msg));
        }

        console.log(user)

        console.log(getRoomUsers(user.room))
        var usersTotal = getRoomUsers(user.room)
        //usersTotal[1].
    });

    // Runs when client disconnects
    socket.on('disconnect', () => {
        const user = userLeave(socket.id);

        if (user) {
            //io.to(user.room).emit('message', formatMessage(botName, `${user.username} has left the chat`));

            // Send users and room info
            io.to(user.room).emit('roomUsers', {
                room: user.room,
                users: getRoomUsers(user.room)
            });
        }
    });
});

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
