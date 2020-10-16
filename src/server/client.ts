import WebSocket from "ws";
import Sock from "../lib/sock";

export default class Client {
  public id: number;
  public sock: Sock;

  public constructor(id: number, ws: WebSocket) {
    this.id = id;
    this.sock = new Sock(ws.url);
  }
}
