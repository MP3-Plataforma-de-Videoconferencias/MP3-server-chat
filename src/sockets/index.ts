import { Server, Socket } from "socket.io";
import { userEvents } from "./user";
import { chatEvents } from "./chat";

/**
 * Registers all Socket.IO event handlers and manages client connections.
 * 
 * This function serves as the main event registration hub for the Socket.IO server.
 * It sets up connection handlers, registers modular event handlers (user and chat events),
 * and manages disconnection cleanup. Each time a client connects, all necessary event
 * listeners are attached to their socket instance.
 * 
 * @param {Server} io - The Socket.IO server instance that will handle all client connections.
 * 
 * @returns {void} This function doesn't return a value.
 * 
 * @example
 * // Basic usage with Socket.IO server
 * import { createSocketServer } from "./socket-config";
 * import { registerSocketEvents } from "./events";
 * 
 * const io = createSocketServer();
 * registerSocketEvents(io);
 * 
 * io.listen(3000);
 * console.log("Socket.IO server running on port 3000");
 * 
 * @example
 * // Integration with Express server
 * import express from "express";
 * import { createServer } from "http";
 * import { Server } from "socket.io";
 * import { registerSocketEvents } from "./events";
 * 
 * const app = express();
 * const httpServer = createServer(app);
 * const io = new Server(httpServer);
 * 
 * registerSocketEvents(io);
 * 
 * httpServer.listen(3000);
 * 
 * @fires io#connection - Triggered when a new client connects to the server
 * @listens socket#disconnect - Listens for client disconnection events
 * 
 * @remarks
 * - Each client connection receives a unique socket.id identifier
 * - Connection and disconnection events are logged to console for monitoring
 * - Event handlers are organized modularly (userEvents, chatEvents)
 * - All registered events are automatically cleaned up on disconnection
 * - The function sets up listeners for every new connection independently
 * 
 * @see {@link userEvents} - User-related event handlers
 * @see {@link chatEvents} - Chat/messaging event handlers 
 * @throws {Error} May throw if the Socket.IO server is not properly configured
 */

export function registerSocketEvents(io: Server) {
  io.on("connection", (socket: Socket) => {
    console.log(`User connected: ${socket.id}`);

    // Register separate event handlers
    userEvents(io, socket);
    chatEvents(io, socket);

    // Disconnection
    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });
}
