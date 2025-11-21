import { Server } from "socket.io";
import "dotenv/config";

/**
 * Creates and configures a Socket.IO server instance with CORS settings.
 * 
 * This function initializes a Socket.IO server with Cross-Origin Resource Sharing (CORS)
 * configuration based on environment variables. It reads allowed origins from the ORIGIN
 * environment variable, which can contain a comma-separated list of URLs.
 * 
 * @returns {Server} A configured Socket.IO server instance ready to handle WebSocket connections.
 * 
 * @example
 * // Create a socket server instance
 * const io = createSocketServer();
 * 
 * // Start listening on a specific port
 * io.listen(3000);
 * 
 * @example
 * // With environment variable: ORIGIN=http://localhost:5173,https://example.com
 * const io = createSocketServer();
 * // Server will accept connections from both localhost:5173 and example.com
 * 
 * @remarks
 * - The ORIGIN environment variable should contain comma-separated URLs
 * - If ORIGIN is not set, defaults to "http://localhost:5173"
 * - Empty strings and whitespace are automatically filtered out
 * - CORS methods are restricted to GET and POST
 * 
 */
export function createSocketServer() {
  // Frontend connection configuration
  const origins = (process.env.ORIGIN ?? "http://localhost:5173")
    .split(",")
    .map(s => s.trim())
    .filter(Boolean);

  const io = new Server({
    cors: {
      origin: origins,
      methods: ["GET", "POST"],
    },
  });

  return io;
}
