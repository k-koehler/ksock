import WebSocket from "ws";
import Lease from "./lease";
import Queue from "./queue";
import { Tickable } from "./types";

export default class Connection implements Tickable {
  public messages = new Queue<string>();
  public lease = new Lease();
  public ws: WebSocket;
  public id?: number;
  public terminated = false;

  public constructor(ws: WebSocket) {
    this.ws = ws;
    ws.on("close", () => (this.terminated = true));
  }

  public performUnitOfWork() {}
}
