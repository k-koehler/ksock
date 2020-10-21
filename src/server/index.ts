import WebSocket from "ws";
import ConnectionPool from "./connection-pool";
import ConnectionPoolManager from "./connection-pool-manager";

async function main() {
  const ws = new WebSocket.Server({ port: 1337 });
  const connectionPool = new ConnectionPool();
  const connectionPoolManager = new ConnectionPoolManager(connectionPool);
  ws.on("connection", (ws) => {
    connectionPool.acceptConnection(ws);
  });
  await connectionPoolManager.manage();
}

main();
