import { Server, Socket } from "socket.io";

let onlineUsers: { socketId: string; userId: string }[] = [];

export function userEvents(io: Server, socket: Socket) {
  // Nuevo usuario
  socket.on("newUser", (userId: string) => {
    if (!onlineUsers.some(user => user.userId === userId) && userId !== "") {
      onlineUsers.push({ socketId: socket.id, userId });
      console.log(`New user: ${userId}`);
      io.emit("usersOnline", onlineUsers);
    }
  });

  // Actualizar usuarios al desconectarse
  socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
    io.emit("usersOnline", onlineUsers);
  });
}
