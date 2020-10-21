import WebSocket from "ws";
import Client from "./client";

export default class ConnectionPool {
  public clients: Client[] = [];
  private static nextId = 0;

  public deletedEntries = 0;

  public acceptConnection(ws: WebSocket) {
    const id = ConnectionPool.nextId++;
    this.clients.push(new Client(id, ws));
  }

  public removeConnection(id: number) {
    for (let i = 0; this.clients.length; ++i) {
      if (this.clients[i].id === id) {
        delete this.clients[i];
        ++this.deletedEntries;
      }
    }
  }

  public makeCompact() {
    const newArr = [];
    for (let i = 0; i < this.clients.length; ++i) {
      newArr.push(this.clients[i]);
    }
    this.deletedEntries = 0;
  }
}
