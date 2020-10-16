import WebSocket from "ws";
import Client from "./client";

export default class ConnectionPool {
  public clients: Map<number, Client> = new Map();
  private static nextId = 0;

  public acceptConnection(ws: WebSocket) {
    const id = ConnectionPool.nextId++;
    this.clients.set(id, new Client(id, ws));
  }

  public removeConnection(id: number) {}
}
