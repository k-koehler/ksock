import Event from "./event";

async function main() {
  const e = new Event("ws://localhost:1337");
  e.emit("hello");
}

main();
