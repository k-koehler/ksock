import WebSocket from "ws";
import Connection from "./connection";
import ConnectionPool from "./connection-pool";
import { Tickable } from "./types";

export default class Server implements Tickable {
  private connectionPool = new ConnectionPool();

  public constructor() {
    new WebSocket.Server().on("connection", (sock) =>
      this.connectionPool.acceptConnection(new Connection(sock))
    );
  }

  public performUnitOfWork(): void {
    throw new Error("Method not implemented.");
  }
}
