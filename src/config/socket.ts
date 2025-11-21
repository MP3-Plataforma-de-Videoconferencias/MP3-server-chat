import { Server } from "socket.io";
import "dotenv/config";

export function createSocketServer() {
  // Conexión desde el frontend
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
