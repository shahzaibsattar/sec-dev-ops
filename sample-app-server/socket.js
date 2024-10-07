module.exports = {

    connect: function( io,PORT){
      let rooms=["room1","room2","room3","room4"]; // List of available rooms
      // the users object will hold computed keys (socket.id) with values (rooms)
      //We will add new keys for each new user.
      const users= {};
      
      const chat = io.of('/chat');

        chat.on('connect',(socket) => {
            console.log('user connection on port '+ PORT + ' : '+ socket.id);

            //Event to send back a list of current rooms
            socket.on('roomlist',
            ()=>{
              chat.emit('roomlist',JSON.stringify(rooms));
              });
            

            // respond to general messages
            socket.on('message',(message)=>{
              //grab the rooms that this person is connected to.
              const user = users[socket.id];
              if (user) {
                chat.to(user.room).emit('message', message);
             
              }
            });
            
            //join a room
          socket.on("joinRoom",(room)=>{
            //check that the room exists
            if(rooms.includes(room)){

              //add a computed property name (socket.id) with the value of the room name.
              //we could alternatively create an array and then search for the object in the array.
              users[socket.id] = {room};
              socket.join(room);
              socket.to(room).emit('message', " A new user has joined the room");
              socket.emit('message', 'Welcome to the chat room');
            }
                
        });
        socket.on("leaveRoom",(room)=>{
          socket.leave(room);
          delete users[socket.id];
          //emit to all users in the room
          socket.to(room).emit('message', " A user has left the room");
          
        });

        //disconnect and clean up
        socket.on('disconnect',()=>{
          const user = users[socket.id];
          if (user) {
            delete users[socket.id];
          }
         
          console.log ("Client disconnected");

        });
      });
      }


      
    }
 