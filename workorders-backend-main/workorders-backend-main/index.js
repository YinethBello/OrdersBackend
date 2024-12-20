// import app from "./app.js";

// import { config } from "dotenv";
// config()

// const PORT = process.env.PORT || 4000;

// async function main() {
//     await app.listen(PORT);
//     console.log(`Server on port ${PORT}`);
// }

// main()

import app from "./app.js";
import { createServer } from "http";
import { initializeSocket } from "./config/socket.js";
import { config } from "dotenv";

config();

const PORT = process.env.PORT || 4000;
const httpServer = createServer(app);

// Inicializar Socket.IO
await initializeSocket(httpServer);

async function main() {
    httpServer.listen(PORT, () => {
        console.log(`Server on port ${PORT}`);
    });
}

main();