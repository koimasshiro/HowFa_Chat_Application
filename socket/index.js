const io = require('socket.io')(8800, {
    cors: {
        origin: "http://localhost:3000"
    }
});

let activeUsers = [];

io.on("connection", (socket) => {
    //add new user
    socket.on('new-user-add', (newUserId) => {
        //if user was not added previously
        if (!activeUsers.some((user) => user.userId === newUserId)) {
            activeUsers.push({
                userId: newUserId,
                socketId: socket.id
            })
        }
        console.log("Connected Users", activeUsers)
        io.emit('get-users', activeUsers)
    })

    //send message
    socket.on("send-message", (data) => {
        const { receiverId } = data;
        const user = activeUsers.find((user) => user.userId === receiverId);
        console.log("sending from socket to: ", receiverId);
        console.log("Data", data);

        //checking if user is in the active user
        if(user){
            io.to(user.socketId).emit("receive-message", data)
        }
    })

    //when a user is disconnected from the server
    socket.on("disconnect", () => {
        activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
        console.log("User disconnected", activeUsers)
        io.emit('get-users', activeUsers)
    })
})