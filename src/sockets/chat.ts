import { Server, Socket } from "socket.io";

export function chatEvents(io: Server, socket: Socket) {
  // Mensajes
  socket.on("sendMessage", (messageData) => {
    console.log("Message received:", messageData);
    io.emit("receiveMessage", messageData);
  });
}
