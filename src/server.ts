import { createSocketServer } from "./config/socket";
import { registerSocketEvents } from "./sockets/index";
import "dotenv/config";

// Crear servidor con la configuración de Socket.IO
const io = createSocketServer();

// Registrar todos los eventos (user.ts, chat.ts)
registerSocketEvents(io);

// Levantar el servidor
const port = Number(process.env.PORT) || 3000;
io.listen(port);

console.log(`Server running on port ${port}`);
