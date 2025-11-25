import { Server, Socket } from "socket.io";

/**
 * Registers and handles chat events for a specific socket connection,
 * enabling real-time communication **by room** instead of globally.
 *
 * This module allows:
 * - Joining chat rooms
 * - Sending messages to a specific room
 * - Broadcasting messages only to users inside that room
 *
 * @param io - The Socket.IO server instance
 * @param socket - The current client connection
 *
 * @example
 * // Client → join a room
 * socket.emit("joinRoom", "room123");
 *
 * @example
 * // Client → send a message to a room
 * socket.emit("sendMessage", {
 *   message: "Hola!",
 *   roomId: "room123",
 *   userId: "abc123",
 *   username: "John Doe",
 *   timestamp: Date.now()
 * });
 *
 * @example
 * // Client → listen for messages in that room
 * socket.on("receiveMessage", (msg) => {
 *   console.log("Nuevo mensaje:", msg);
 * });
 */
export function chatEvents(io: Server, socket: Socket) {

  /**
   * Handles room joining.
   *
   * The client must emit:
   *    socket.emit("joinRoom", roomId)
   *
   * This ensures the socket is added to the room and can receive
   * messages that belong ONLY to that room.
   *
   * @event joinRoom
   * @param roomId - The unique identifier of the room
   */
  socket.on("joinRoom", (roomId: string) => {
    socket.join(roomId);
    console.log(`Socket ${socket.id} joined room ${roomId}`);
  });

  /**
   * Handles sending messages *to specific rooms*.
   *
   * Message structure must include:
   *   { message, roomId, userId, username, timestamp }
   *
   * If roomId is missing, the server rejects the message.
   *
   * @event sendMessage
   * @param messageData - Object containing message information
   */
  socket.on("sendMessage", (messageData) => {
    const { roomId } = messageData;

    if (!roomId) {
      console.error("Message received without roomId:", messageData);
      return;
    }

    console.log(`Message to room ${roomId}:`, messageData);

    /**
     * Emits the message ONLY to the users inside the room.
     * 
     * Important:
     *    io.to(roomId).emit(...)  --> broadcast to that room only
     *    io.emit(...)             --> broadcast to ALL (not desired)
     *
     * @event receiveMessage
     */
    io.to(roomId).emit("receiveMessage", messageData);
  });
}

