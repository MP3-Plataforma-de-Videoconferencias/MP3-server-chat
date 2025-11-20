import { Server, Socket } from "socket.io";
import { userEvents } from "./user";
import { chatEvents } from "./chat";

export function registerSocketEvents(io: Server) {
  io.on("connection", (socket: Socket) => {
    console.log(`User connected: ${socket.id}`);

    // Registrar eventos separados
    userEvents(io, socket);
    chatEvents(io, socket);

    // Desconexion
    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });
}
