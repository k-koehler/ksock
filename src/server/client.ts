import WebSocket from "ws";
import Queue from "./queue";

export default class Client {
  public lastRenewed = Date.now();
  public id: number;
  public ws: WebSocket;
  public messages: Queue<string> = new Queue();

  private readMessages() {
    this.ws.on("message", (message) =>
      this.messages.enqueue(message.toString())
    );
  }

  public constructor(id: number, ws: WebSocket) {
    this.id = id;
    this.ws = ws;
    this.readMessages();
  }

  public terminate() {
    this.ws.close();
  }

  public async send(message: string) {
    this.ws.send(message);
  }
}
