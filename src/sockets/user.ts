import { Server, Socket } from "socket.io";

/**
 * Represents an online user in the system.
 * 
 * @typedef {Object} OnlineUser
 * @property {string} socketId - The unique Socket.IO connection identifier
 * @property {string} userId - The unique user identifier from the application
 */

/**
 * In-memory storage of currently connected users.
 * Maps socket connections to user identifiers for tracking online presence.
 * 
 * @type {OnlineUser[]}
 * @private
 */
let onlineUsers: { socketId: string; userId: string }[] = [];

/**
 * Registers and handles user-related Socket.IO events for online presence tracking.
 * 
 * This function manages user presence by tracking when users join and leave the application.
 * It maintains an in-memory list of online users, prevents duplicate registrations, and
 * broadcasts the updated online users list to all connected clients whenever changes occur.
 * 
 * @param {Server} io - The Socket.IO server instance used to broadcast user presence updates to all clients.
 * @param {Socket} socket - The individual socket connection representing a single client.
 * 
 * @returns {void} This function doesn't return a value.
 * 
 * @example
 * // Setup user events for a new connection
 * io.on("connection", (socket) => {
 *   userEvents(io, socket);
 * });
 * 
 * @example
 * // Client-side usage (for reference)
 * // Register a new user
 * socket.emit("newUser", "user123");
 * 
 * // Listen for online users updates
 * socket.on("usersOnline", (users) => {
 *   console.log("Currently online:", users);
 *   // users = [{ socketId: "abc123", userId: "user123" }, ...]
 * });
 * 
 * @fires socket#newUser - Triggered when a client registers as a new user
 * @fires socket#disconnect - Triggered when a client disconnects from the server
 * @listens socket#newUser - Listens for new user registration requests
 * @listens socket#disconnect - Listens for client disconnection events
 * @emits io#usersOnline - Broadcasts the updated list of online users to all clients
 * 
 * @remarks
 * - The onlineUsers array is stored in memory and will be reset if the server restarts
 * - Duplicate users (same userId) are automatically prevented from being added
 * - Empty userId strings are rejected to maintain data integrity
 * - User presence is automatically cleaned up on disconnection
 * - All connected clients receive real-time updates of the online users list
 * - For production environments, consider using Redis or a database for persistence
 * - The same user can have multiple socket connections if not properly managed
 */
export function userEvents(io: Server, socket: Socket) {
  // New user 
  socket.on("newUser", (userId: string) => {
    if (!onlineUsers.some(user => user.userId === userId) && userId !== "") {
      onlineUsers.push({ socketId: socket.id, userId });
      console.log(`New user: ${userId}`);
      io.emit("usersOnline", onlineUsers);
    }
  });

  // Update users list on disconnection
  socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
    io.emit("usersOnline", onlineUsers);
  });
}
