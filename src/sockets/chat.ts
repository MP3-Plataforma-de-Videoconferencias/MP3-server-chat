import { Server, Socket } from "socket.io";

/**
 * Message data structure for chat communication.
 * 
 * @typedef {Object} MessageData
 * @property {string} message - The content of the message
 * @property {string} [userId] - Optional user identifier who sent the message
 * @property {string} [username] - Optional username of the sender
 * @property {number} [timestamp] - Optional timestamp when the message was sent
 * @property {string} [roomId] - Optional room identifier for targeted messages
 */

/**
 * Registers and handles chat-related Socket.IO events for real-time messaging.
 * 
 * This function sets up event listeners for a specific socket connection to handle
 * chat functionality. When a client sends a message through the "sendMessage" event,
 * the server logs it and broadcasts it to all connected clients via the "receiveMessage" event.
 * 
 * @param {Server} io - The Socket.IO server instance used to broadcast messages to all clients.
 * @param {Socket} socket - The individual socket connection representing a single client.
 * 
 * @returns {void} This function doesn't return a value.
 * 
 * @example
 * // Setup chat events for a new connection
 * io.on("connection", (socket) => {
 *   console.log("New client connected:", socket.id);
 *   chatEvents(io, socket);
 * });
 * 
 * @example
 * // Client-side usage (for reference)
 * // Sending a message
 * socket.emit("sendMessage", {
 *   message: "Hello, World!",
 *   userId: "user123",
 *   username: "JohnDoe",
 *   timestamp: Date.now()
 * });
 * 
 * // Receiving messages
 * socket.on("receiveMessage", (messageData) => {
 *   console.log("New message:", messageData);
 * });
 * 
 * @fires socket#sendMessage - Triggered when a client sends a message
 * @listens socket#sendMessage - Listens for incoming messages from clients
 * @emits io#receiveMessage - Broadcasts the message to all connected clients
 * 
 * @remarks
 * - Messages are broadcast to ALL connected clients, including the sender
 * - The messageData structure is flexible and can contain any properties
 * - Consider adding validation for messageData to ensure data integrity
 * - For production use, implement authentication and message sanitization
 * - Messages are logged to console for debugging purposes
 * 
 */
export function chatEvents(io: Server, socket: Socket) {
  // Messages handler
  socket.on("sendMessage", (messageData) => {
    console.log("Message received:", messageData);
    io.emit("receiveMessage", messageData);
  });
}
