import WebSocket from "ws";

const pool = new Map<number, WebSocket>();

async function main() {
  let id = 0;
  const ws = new WebSocket.Server({ port: 1337 });
  ws.on("connection", (ws) => {
    pool.set(id++, ws);
    console.log(pool);
  });
}

main();
