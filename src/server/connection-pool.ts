import Connection from "./connection";
import { Tickable } from "./types";

export default class ConnectionPool implements Tickable {
  private static nextId = 0;

  private static assignId() {
    return this.nextId++;
  }

  public connections: (Connection | undefined)[] = [];

  public acceptConnection(connection: Connection) {
    connection.id = ConnectionPool.assignId();
    this.connections.push(connection);
  }

  public removeConnection(connection: Connection) {
    if (connection.id === undefined) {
      throw new Error("connection was not assigned an id");
    }
    delete this.connections[connection.id];
  }

  /**
   * this function does the following work:
   * 1. makes internal array more compact
   * 2. peforms a unit of work for each connection
   */
  public performUnitOfWork() {
    const compactConnections: Connection[] = [];
    for (const connection of this.connections) {
      if (connection) {
        connection.performUnitOfWork();
      }
    }
    this.connections = compactConnections;
  }
}
