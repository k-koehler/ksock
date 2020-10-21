import Event from "./event";

async function main() {
  const e = new Event("ws://localhost:1337", "hello");
  e.subscribe(() => console.log("sent me a new message"));
  e.emit();
}

main();
