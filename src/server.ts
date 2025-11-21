import { createSocketServer } from "./config/socket";
import { registerSocketEvents } from "./sockets/index";
import "dotenv/config";

/**
 * The main Socket.IO server instance.
 * 
 * Created with CORS configuration from environment variables and ready to handle
 * WebSocket connections from allowed origins.
 * 
 * @type {Server}
 * @constant
 */
const io = createSocketServer();

/**
 * Registers all Socket.IO event handlers for the application.
 * 
 * Sets up event listeners for user management (user.ts) and chat functionality (chat.ts).
 * This includes connection handling, message broadcasting, user presence tracking,
 * and disconnection cleanup.
 */
registerSocketEvents(io);

/**
 * The port number on which the server will listen for connections.
 * 
 * Reads from the PORT environment variable. If not set or invalid, defaults to 3000.
 * 
 * @type {number}
 * @constant
 * @default 3000
 * 
 * @example
 * // Using environment variable
 * // PORT=8080 node server.js
 * // Server will run on port 8080
 * 
 * @example
 * // Without environment variable
 * // node server.js
 * // Server will run on port 3000 (default)
 */
const port = Number(process.env.PORT) || 3000;

/**
 * Starts the Socket.IO server and begins listening for incoming connections.
 * 
 * @fires io#connection - Server starts accepting client connections on the specified port
 * 
 */
io.listen(port);

console.log(`Server running on port ${port}`);
